import { NextResponse } from 'next/server';

import { fetchUserInfo } from '@/shared/lib/auth-utils';
import { CookieStorage } from '@/shared/lib/cookie-storage';
import { createBffErrorResponse } from '@/shared/lib/error-handler';
import { kakaoRedirectUri } from '@/shared/lib/oauth-config';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;
const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
const KAKAO_REDIRECT_URI = kakaoRedirectUri;

/**
 * [BFF] POST /api/oauth/kakao
 * Kakao 인가코드를 서버에서 access_token으로 교환한 뒤 백엔드로 전달하여 JWT를 발급받습니다.
 * client_secret은 서버 환경에서만 접근 가능합니다.
 */
export async function POST(request: Request) {
  try {
    if (!KAKAO_CLIENT_ID || !KAKAO_CLIENT_SECRET || !KAKAO_REDIRECT_URI) {
      return createBffErrorResponse(
        'Missing Kakao OAuth environment variables',
        '/api/oauth/kakao',
        500
      );
    }

    const { code } = await request.json();

    if (!code) {
      return createBffErrorResponse('Missing code', '/api/oauth/kakao', 400);
    }

    // 인가코드 → Kakao access_token 교환
    const tokenRes = await fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: KAKAO_CLIENT_ID,
        client_secret: KAKAO_CLIENT_SECRET,
        code,
        redirect_uri: KAKAO_REDIRECT_URI,
      }),
    });

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      return createBffErrorResponse(errorText, '/api/oauth/kakao', tokenRes.status);
    }

    const { access_token } = await tokenRes.json();

    // Kakao access_token → 백엔드 JWT 발급
    const backendRes = await fetch(`${BASE_URL}/${TEAM_ID}/oauth/kakao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: access_token }),
    });

    if (!backendRes.ok) {
      const errorText = await backendRes.text();
      return createBffErrorResponse(errorText, '/api/oauth/kakao', backendRes.status);
    }

    const { accessToken, refreshToken } = await backendRes.json();

    const user = await fetchUserInfo(accessToken);
    await CookieStorage.setSession({ accessToken, refreshToken, user });

    return NextResponse.json({ user });
  } catch (error) {
    return createBffErrorResponse(error, '/api/oauth/kakao');
  }
}
