import { NextResponse } from 'next/server';

import { CookieStorage } from '@/lib/auth/cookie-storage';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] POST /api/auth/login
 * 일반 로그인: 백엔드 API 프록시 → 토큰 쿠키 저장 후 accessToken + user 반환
 * 소셜 로그인은 /api/auth/social-callback 참고
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 일반 로그인 (백엔드 API 호출)
    const response = await fetch(`${BASE_URL}/${TEAM_ID}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    // 쿠키 저장 (user 포함)
    await CookieStorage.setSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
    });

    // 보안을 위해 refreshToken은 제외하고 클라이언트에 반환
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { refreshToken: _, ...clientData } = data;

    return NextResponse.json(clientData);
  } catch (error) {
    console.error('[AuthLoginBFF] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
