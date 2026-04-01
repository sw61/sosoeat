import { NextResponse } from 'next/server';

import { CookieStorage } from '@/lib/auth/cookie-storage';
import { silentRefresh } from '@/lib/auth/silent-refresh';

/**
 * [BFF] GET /api/auth/me
 * 쿠키에 저장된 user를 반환합니다. (백엔드 요청 없음)
 * - accessToken 유효: 쿠키의 user 바로 반환
 * - accessToken 없음: silentRefresh 후 user 반환
 * - refresh 실패: 401 반환
 */
export async function GET() {
  try {
    const accessToken = await CookieStorage.getAccessToken();

    if (!accessToken) {
      const refreshed = await silentRefresh();
      if (!refreshed) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    }

    const user = await CookieStorage.getUser();

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('[AuthMeBFF] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
