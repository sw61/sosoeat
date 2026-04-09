import { NextResponse } from 'next/server';

import { createBffErrorResponse } from '@/shared/lib/error-handler';
import { silentRefresh } from '@/shared/lib/silent-refresh';

/**
 * [BFF] POST /api/auth/refresh
 * 쿠키에 저장된 refreshToken을 사용하여 새로운 accessToken을 발급받습니다.
 * user 정보도 함께 업데이트됩니다.
 */
export async function POST() {
  try {
    const refreshed = await silentRefresh();

    if (!refreshed) {
      return createBffErrorResponse('Refresh token expired', '/api/auth/refresh', 401);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return createBffErrorResponse(error, '/api/auth/refresh');
  }
}
