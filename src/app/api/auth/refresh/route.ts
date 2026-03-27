import { NextResponse } from 'next/server';

import { CookieStorage } from '@/lib/auth/cookie-storage';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] POST /api/auth/refresh
 * 쿠키에 저장된 refreshToken을 사용하여 새로운 accessToken을 발급받습니다.
 */
export async function POST() {
  try {
    const refreshToken = await CookieStorage.getRefreshToken();
    const user = await CookieStorage.getUser();

    if (!refreshToken) {
      return NextResponse.json({ message: 'No refresh token found' }, { status: 401 });
    }

    // 외부 API 호출 (Refresh)
    const response = await fetch(`${BASE_URL}/${TEAM_ID}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      // 리프레시 토큰 자체가 만료된 경우 쿠키 파기
      await CookieStorage.clearSession();
      return NextResponse.json({ message: 'Refresh token expired' }, { status: 401 });
    }

    const data = await response.json(); // { accessToken, refreshToken }

    // 새로운 토큰으로 쿠키 업데이트 (user는 기존 쿠키 유지)
    await CookieStorage.setSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken || refreshToken,
    });

    return NextResponse.json({
      accessToken: data.accessToken,
      user, // 쿠키에 저장된 user 정보를 함께 반환하여 하이드레이션 지원
    });
  } catch (error) {
    console.error('[AuthRefreshBFF] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
