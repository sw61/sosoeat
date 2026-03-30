import { NextRequest, NextResponse } from 'next/server';

import { CookieStorage } from '@/lib/auth/cookie-storage';
import { silentRefresh } from '@/lib/auth/silent-refresh';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [BFF] /api/proxy/[...path]
 * 모든 API 요청을 백엔드로 프록시하며, httpOnly 쿠키의 accessToken을 Authorization 헤더에 삽입합니다.
 * 401 응답 시 refreshToken으로 토큰을 갱신하고 원래 요청을 1회 재시도합니다.
 */
async function handler(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const targetUrl = `${BASE_URL}/${TEAM_ID}/${path.join('/')}${request.nextUrl.search}`;

  // body를 handler에서 미리 읽어두어 재시도 시 재사용
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
    // host, content-length는 fetch가 자동으로 처리
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

  // 401 발생 시 토큰 갱신 후 1회 재시도
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
