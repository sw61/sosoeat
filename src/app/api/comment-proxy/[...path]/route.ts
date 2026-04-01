import { NextRequest, NextResponse } from 'next/server';

import { CookieStorage } from '@/lib/auth/cookie-storage';

const COMMENT_SERVER_URL = process.env.COMMENT_SERVER_URL;

/**
 * [BFF] /api/comment-proxy/[...path]
 * comment server(Railway Express)로 요청을 프록시합니다.
 * httpOnly 쿠키의 accessToken을 Authorization 헤더에 삽입합니다.
 * (인증이 필요없는 요청은 토큰 없이 그대로 전달됩니다.)
 */
async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetUrl = `${COMMENT_SERVER_URL}/${path.join('/')}${request.nextUrl.search}`;

  const accessToken = await CookieStorage.getAccessToken();

  const headers = new Headers();
  request.headers.forEach((value, key) => {
    if (key !== 'host' && key !== 'content-length') {
      headers.set(key, value);
    }
  });

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const body =
    request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (key !== 'content-encoding' && key !== 'transfer-encoding') {
      responseHeaders.set(key, value);
    }
  });

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT };
