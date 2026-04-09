import { NextRequest, NextResponse } from 'next/server';

import { CookieStorage } from './cookie-storage';
import { silentRefresh } from './silent-refresh';

/**
 * 공통 프록시 요청 핸들러
 * Authorization 헤더 설정과 401 응답 시 토큰 갱신 후 재시도를 담당합니다.
 */
export async function createProxyRequest(
  request: NextRequest,
  targetUrl: string,
  body: Blob | undefined,
  retry = false
): Promise<NextResponse> {
  const accessToken = await CookieStorage.getAccessToken();

  const headers = new Headers();

  // httpOnly 쿠키의 accessToken이 있으면 Authorization 헤더에 담아 전달
  // 없으면 헤더 미설정 (백엔드에서 필요시 401 반환)
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  // Content-Type이 명시되어 있으면 유지
  const contentType = request.headers.get('content-type');
  if (contentType) {
    headers.set('Content-Type', contentType);
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
      return createProxyRequest(request, targetUrl, body, true);
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
