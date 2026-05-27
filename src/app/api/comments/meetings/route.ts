import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/shared/api/supabase/index.server';

import { verifyMember } from '../_lib/verify-member';

export async function POST(request: NextRequest) {
  const { user, errorResponse } = await verifyMember();
  if (errorResponse) return errorResponse;

  const { id, hostId, teamId } = await request.json();

  if (user.id !== Number(hostId)) {
    return Response.json({ message: '권한이 없습니다.' }, { status: 403 });
  }

  const { data: meeting, error } = await supabaseAdmin
    .from('Meeting')
    .upsert({ id: Number(id), hostId: Number(hostId), teamId })
    .select()
    .single();

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json(meeting, { status: 201 });
}
