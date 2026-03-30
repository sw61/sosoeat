import { NextResponse } from 'next/server';

import { CookieStorage } from '@/lib/auth/cookie-storage';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] POST /api/auth/logout
 * 1. 외부 인증 서버에 로그아웃 요청을 보냅니다.
 * 2. 서버 세션(쿠키)을 파기하여 로그아웃 처리합니다.
 *
 * apiServer 대신 fetch를 직접 사용합니다.
 * 백엔드가 401을 반환해도(토큰 만료 등) silentRefresh 없이 그냥 세션을 파기합니다.
 */
export async function POST() {
  try {
    const accessToken = await CookieStorage.getAccessToken();

    // 1. 외부 API 로그아웃 호출 — 실패해도 세션 파기는 진행
    await fetch(`${BASE_URL}/${TEAM_ID}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
  } catch (error) {
    console.error('[AuthLogoutBFF] Error:', error);
  } finally {
    // 2. 서버 세션(쿠키) 파기 — 백엔드 로그아웃 성공 여부와 무관하게 항상 실행
    await CookieStorage.clearSession();
  }

  return NextResponse.json({ success: true });
}
