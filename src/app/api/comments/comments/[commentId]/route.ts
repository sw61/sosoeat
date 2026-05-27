import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/shared/api/supabase/index.server';

import { verifyMember } from '../../_lib/verify-member';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  const id = Number(commentId);

  const { user, errorResponse } = await verifyMember();
  if (errorResponse) return errorResponse;

  const { data: comment } = await supabaseAdmin
    .from('Comment')
    .select('userId')
    .eq('id', id)
    .maybeSingle();

  if (!comment) return Response.json({ message: '댓글을 찾을 수 없습니다.' }, { status: 404 });
  if (comment.userId !== user.id)
    return Response.json({ message: '본인 댓글만 수정할 수 있습니다.' }, { status: 403 });

  const { content } = await request.json();

  if (!content || typeof content !== 'string' || content.trim() === '') {
    return Response.json({ message: '댓글 내용을 입력해주세요.' }, { status: 400 });
  }

  const { data: updated, error } = await supabaseAdmin
    .from('Comment')
    .update({ content })
    .eq('id', id)
    .select()
    .single();

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const { commentId } = await params;
  const id = Number(commentId);

  const { user, errorResponse } = await verifyMember();
  if (errorResponse) return errorResponse;

  const { data: comment } = await supabaseAdmin
    .from('Comment')
    .select('userId')
    .eq('id', id)
    .maybeSingle();

  if (!comment) return Response.json({ message: '댓글을 찾을 수 없습니다.' }, { status: 404 });
  if (comment.userId !== user.id)
    return Response.json({ message: '본인 댓글만 삭제할 수 있습니다.' }, { status: 403 });

  const { error } = await supabaseAdmin.from('Comment').update({ isDeleted: true }).eq('id', id);

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json({ message: '삭제 완료' });
}
