import { NextRequest, NextResponse } from 'next/server';

import { CookieStorage } from '@/lib/auth/cookie-storage';
import { silentRefresh } from '@/lib/auth/silent-refresh';

const COMMENT_SERVER_URL = process.env.COMMENT_SERVER_URL;

/**
 * [BFF] /api/comment-proxy/[...path]
 * comment server(Railway Express)로 요청을 프록시합니다.
 * httpOnly 쿠키의 accessToken을 Authorization 헤더에 삽입합니다.
 * 401 응답 시 refreshToken으로 토큰을 갱신하고 원래 요청을 1회 재시도합니다.
 */
async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetUrl = `${COMMENT_SERVER_URL}/${path.join('/')}${request.nextUrl.search}`;

  const body =
    request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined;

  return proxyRequest(request, targetUrl, body);
}

async function proxyRequest(
  request: NextRequest,
  targetUrl: string,
  body: Blob | undefined,
  retry = false
): Promise<NextResponse> {
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

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  if (response.status === 401 && !retry) {
    const refreshed = await silentRefresh();
    if (refreshed) {
      return proxyRequest(request, targetUrl, body, true);
    }
  }

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
