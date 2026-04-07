import { NextResponse } from 'next/server';

import { silentRefresh } from '@/shared/lib/silent-refresh';

/**
 * [BFF] POST /api/auth/refresh
 * 쿠키에 저장된 refreshToken을 사용하여 새로운 accessToken을 발급받습니다.
 * user 정보는 /api/auth/me에서 별도로 조회합니다.
 */
export async function POST() {
  try {
    const refreshed = await silentRefresh();

    if (!refreshed) {
      return NextResponse.json({ message: 'Refresh token expired' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[AuthRefreshBFF] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
