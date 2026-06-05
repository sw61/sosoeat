import { NextRequest } from 'next/server';

import { supabaseAdmin } from '@/shared/api/supabase/index.server';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ meetingId: string }> }
) {
  const { meetingId } = await params;

  const { count, error } = await supabaseAdmin
    .from('Comment')
    .select('*', { count: 'exact', head: true })
    .eq('meetingId', Number(meetingId))
    .eq('isDeleted', false);

  if (error) return Response.json({ message: error.message }, { status: 500 });

  return Response.json({ count: count ?? 0 });
}
