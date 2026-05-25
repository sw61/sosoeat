import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/shared/api/supabase/index.server';
import { CookieStorage } from '@/shared/lib/cookie-storage';

import { verifyMember } from '../../../_lib/verify-member';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ meetingId: string }> }
) {
  const { meetingId } = await params;
  const id = Number(meetingId);

  const currentUser = await CookieStorage.getUser();
  const currentUserId = currentUser?.id ?? null;

  const [{ data: meeting }, { data: allComments, error }] = await Promise.all([
    supabaseAdmin.from('Meeting').select('hostId').eq('id', id).maybeSingle(),
    supabaseAdmin
      .from('Comment')
      .select('id, parentId, content, isDeleted, createdAt, userId')
      .eq('meetingId', id)
      .order('createdAt'),
  ]);

  if (error) return Response.json({ message: error.message }, { status: 500 });
  if (!allComments?.length) return Response.json([]);

  const commentIds = allComments.map((c) => c.id);
  const userIds = [...new Set(allComments.map((c) => c.userId))];

  const [{ data: users }, { data: likes }] = await Promise.all([
    supabaseAdmin.from('User').select('id, nickname, profileUrl').in('id', userIds),
    supabaseAdmin.from('CommentLike').select('commentId, userId').in('commentId', commentIds),
  ]);

  const userMap = new Map((users ?? []).map((u) => [u.id, u]));
  const likeMap = new Map<number, Set<number>>();
  for (const like of likes ?? []) {
    if (!likeMap.has(like.commentId)) likeMap.set(like.commentId, new Set());
    likeMap.get(like.commentId)!.add(like.userId);
  }

  type CommentDto = {
    id: number;
    parentId: number | null;
    content: string;
    isDeleted: boolean;
    createdAt: string;
    author: { nickname: string; profileUrl: string | null };
    likeCount: number;
    isLiked: boolean;
    isHostComment: boolean;
    isMine: boolean;
    replies: CommentDto[];
  };

  type CommentRow = (typeof allComments)[0];
  const toDto = (c: CommentRow): CommentDto => ({
    id: c.id,
    parentId: c.parentId,
    content: c.content,
    isDeleted: c.isDeleted,
    createdAt: c.createdAt,
    author: {
      nickname: userMap.get(c.userId)?.nickname ?? '',
      profileUrl: userMap.get(c.userId)?.profileUrl ?? null,
    },
    likeCount: likeMap.get(c.id)?.size ?? 0,
    isLiked: currentUserId !== null ? (likeMap.get(c.id)?.has(currentUserId) ?? false) : false,
    isHostComment: meeting ? c.userId === meeting.hostId : false,
    isMine: currentUserId !== null ? c.userId === currentUserId : false,
    replies: [],
  });

  const topLevel = allComments.filter((c) => c.parentId === null);
  const replies = allComments.filter((c) => c.parentId !== null);

  const result = topLevel.map((c) => ({
    ...toDto(c),
    replies: replies.filter((r) => r.parentId === c.id).map(toDto),
  }));

  return Response.json(result);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ meetingId: string }> }
) {
  const { meetingId } = await params;
  const id = Number(meetingId);

  const { user, errorResponse } = await verifyMember();
  if (errorResponse) return errorResponse;

  await supabaseAdmin.from('User').upsert({
    id: user.id,
    nickname: user.name,
    profileUrl: user.image ?? null,
  });

  await supabaseAdmin.from('Meeting').upsert({
    id,
    teamId: user.teamId ?? (process.env.NEXT_PUBLIC_TEAM_ID as string),
    hostId: user.id,
  });

  const { content, parentId } = await request.json();

  const { data: comment, error } = await supabaseAdmin
    .from('Comment')
    .insert({ meetingId: id, userId: user.id, content, parentId: parentId ?? null })
    .select()
    .single();

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json(comment, { status: 201 });
}
