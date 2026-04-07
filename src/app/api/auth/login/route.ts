import { NextResponse } from 'next/server';

import { CookieStorage } from '@/shared/lib/cookie-storage';
import { LoginRequest, LoginResponse } from '@/shared/types/generated-client/models';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] POST /api/auth/login
 * 일반 로그인: 백엔드 API 프록시 → 토큰 쿠키 저장 후 user 반환
 * 소셜 로그인은 /api/auth/social-callback 참고
 */
export async function POST(request: Request) {
  try {
    const body: LoginRequest = await request.json();

    // 일반 로그인 (백엔드 API 호출)
    const response = await fetch(`${BASE_URL}/${TEAM_ID}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(errorData, { status: response.status });
    }

    const data: LoginResponse = await response.json();

    // 쿠키 저장 (user 포함)
    await CookieStorage.setSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
    });

    // 보안을 위해 accessToken, refreshToken은 제외하고 user만 클라이언트에 반환
    return NextResponse.json({ user: data.user });
  } catch (error) {
    console.error('[AuthLoginBFF] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
