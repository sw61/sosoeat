import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/shared/api/supabase/index.server';

import { verifyMember } from '../../../_lib/verify-member';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  const cid = Number(commentId);

  const { user, errorResponse } = await verifyMember();
  if (errorResponse) return errorResponse;

  const { data: existing } = await supabaseAdmin
    .from('CommentLike')
    .select('commentId')
    .eq('commentId', cid)
    .eq('userId', user.id)
    .maybeSingle();

  if (existing) return Response.json({ message: '이미 좋아요한 댓글입니다.' });

  const { data: like, error } = await supabaseAdmin
    .from('CommentLike')
    .insert({ commentId: cid, userId: user.id })
    .select()
    .single();

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json(like, { status: 201 });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  const cid = Number(commentId);

  const { user, errorResponse } = await verifyMember();
  if (errorResponse) return errorResponse;

  const { error } = await supabaseAdmin
    .from('CommentLike')
    .delete()
    .eq('commentId', cid)
    .eq('userId', user.id);

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json({ message: '좋아요 취소 완료' });
}
