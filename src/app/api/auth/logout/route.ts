import { NextResponse } from 'next/server';

import { CookieStorage } from '@/lib/auth/cookie-storage';
import { apiServer } from '@/lib/http/api-server';

/**
 * [BFF] POST /api/auth/logout
 * 1. 외부 인증 서버에 로그아웃 요청을 보냅니다.
 * 2. 서버 세션(쿠키)을 파기하여 로그아웃 처리합니다.
 */
export async function POST() {
  try {
    // 1. 외부 API 로그아웃 호출
    await apiServer('/auth/logout', { method: 'POST' });

    // 2. 서버 세션(쿠키) 파기
    await CookieStorage.clearSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[AuthLogoutBFF] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
