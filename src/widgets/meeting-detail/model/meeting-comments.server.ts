import { supabaseAdmin } from '@/shared/api/supabase/index.server';
import { CookieStorage } from '@/shared/lib/cookie-storage';

import type { MeetingComment } from '../ui/meeting-comment-section/meeting-comment-section.types';

export async function fetchMeetingCommentsForPage(meetingId: number): Promise<MeetingComment[]> {
  const currentUser = await CookieStorage.getUser();
  const currentUserId = currentUser?.id ?? null;

  const [{ data: meeting }, { data: allComments }] = await Promise.all([
    supabaseAdmin.from('Meeting').select('hostId').eq('id', meetingId).maybeSingle(),
    supabaseAdmin
      .from('Comment')
      .select('id, parentId, content, isDeleted, createdAt, userId')
      .eq('meetingId', meetingId)
      .order('createdAt'),
  ]);

  if (!allComments?.length) return [];

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

  type CommentRow = (typeof allComments)[0];
  const toDto = (c: CommentRow): MeetingComment => ({
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
  const replyRows = allComments.filter((c) => c.parentId !== null);

  return topLevel.map((c) => ({
    ...toDto(c),
    replies: replyRows.filter((r) => r.parentId === c.id).map(toDto),
  }));
}

export async function fetchMeetingCommentCountForPage(meetingId: number): Promise<number> {
  const { count } = await supabaseAdmin
    .from('Comment')
    .select('*', { count: 'exact', head: true })
    .eq('meetingId', meetingId)
    .eq('isDeleted', false);

  return count ?? 0;
}
