import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/shared/api/supabase/index.server';

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ meetingId: string }> }
) {
  const { meetingId } = await params;

  const { error } = await supabaseAdmin.from('Meeting').delete().eq('id', Number(meetingId));

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json({ message: '삭제 완료' });
}
