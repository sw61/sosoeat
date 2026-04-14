import { NextResponse } from 'next/server';

import { fetchUserInfo } from '@/shared/lib/auth-utils';
import { CookieStorage } from '@/shared/lib/cookie-storage';
import { createBffErrorResponse } from '@/shared/lib/error-handler';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] POST /api/oauth/google
 * 프론트에서 획득한 Google access_token을 백엔드로 전달하여 JWT를 발급받습니다.
 */
export async function POST(request: Request) {
  try {
    if (!BASE_URL || !TEAM_ID) {
      return createBffErrorResponse('Missing API config', '/api/oauth/google', 500);
    }

    const { token } = await request.json();

    if (!token) {
      return createBffErrorResponse('Missing token', '/api/oauth/google', 400);
    }

    const response = await fetch(`${BASE_URL}/${TEAM_ID}/oauth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return createBffErrorResponse(errorText, '/api/oauth/google', response.status);
    }

    const { accessToken, refreshToken } = await response.json();

    const user = await fetchUserInfo(accessToken);
    await CookieStorage.setSession({ accessToken, refreshToken, user });

    return NextResponse.json({ user });
  } catch (error) {
    return createBffErrorResponse(error, '/api/oauth/google');
  }
}
