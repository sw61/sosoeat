import { NextResponse } from 'next/server';

import { fetchUserInfo } from '@/shared/lib/auth-utils';
import { CookieStorage } from '@/shared/lib/cookie-storage';
import { createBffErrorResponse } from '@/shared/lib/error-handler';

/**
 * [BFF] POST /api/auth/social-callback
 * 소셜 로그인 완료 후 전달받은 토큰으로 서버 세션을 설정합니다.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accessToken, refreshToken } = body;

    if (!accessToken || !refreshToken) {
      return createBffErrorResponse('Missing tokens', '/api/auth/social-callback', 400);
    }

    const user = await fetchUserInfo(accessToken);

    await CookieStorage.setSession({ accessToken, refreshToken, user });

    return NextResponse.json({ user });
  } catch (error) {
    return createBffErrorResponse(error, '/api/auth/social-callback');
  }
}
