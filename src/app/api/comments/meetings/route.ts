import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/shared/api/supabase/index.server';

export async function POST(request: NextRequest) {
  const { id, hostId, teamId } = await request.json();

  const { data: meeting, error } = await supabaseAdmin
    .from('Meeting')
    .upsert({ id: Number(id), hostId: Number(hostId), teamId })
    .select()
    .single();

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json(meeting, { status: 201 });
}
