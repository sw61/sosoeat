import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/shared/api/supabase/index.server';

import { verifyMember } from '../../_lib/verify-member';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ meetingId: string }> }
) {
  const { meetingId } = await params;
  const id = Number(meetingId);

  const { user, errorResponse } = await verifyMember();
  if (errorResponse) return errorResponse;

  const { data: meeting, error: fetchError } = await supabaseAdmin
    .from('Meeting')
    .select('hostId')
    .eq('id', id)
    .maybeSingle();

  if (fetchError) return Response.json({ message: fetchError.message }, { status: 500 });
  if (!meeting) return Response.json({ message: '모임을 찾을 수 없습니다.' }, { status: 404 });
  if (meeting.hostId !== user.id)
    return Response.json({ message: '모임 삭제 권한이 없습니다.' }, { status: 403 });

  const { error } = await supabaseAdmin.from('Meeting').delete().eq('id', id);

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json({ message: '삭제 완료' });
}
