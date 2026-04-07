import { NextResponse } from 'next/server';

import { CookieStorage } from '@/shared/lib/cookie-storage';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] POST /api/auth/social-callback
 * 소셜 로그인 완료 후 전달받은 토큰으로 서버 세션을 설정합니다.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken } = body;

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ message: 'Missing tokens' }, { status: 400 });
    }

    const userResponse = await fetch(`${BASE_URL}/${TEAM_ID}/users/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ message: 'Failed to fetch user info' }, { status: 401 });
    }

    const user = await userResponse.json();

    await CookieStorage.setSession({ accessToken, refreshToken, user });

    return NextResponse.json({ user });
  } catch (error) {
    console.error('[SocialCallbackBFF] Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
