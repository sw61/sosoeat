import { NextRequest, NextResponse } from 'next/server';

import { CookieStorage } from './cookie-storage';
import { createErrorResponse, forwardBackendError, type RequestContext } from './error-handler';
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

  const context: RequestContext = {
    method: request.method,
    path: request.nextUrl.pathname,
  };

  let response: globalThis.Response;
  try {
    response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
    });
  } catch (error) {
    // 네트워크 오류 (백엔드 서버 다운, 연결 실패 등)
    return createErrorResponse(error, 'Service Unavailable', 503, context);
  }

  // 401 발생 시 토큰 갱신 후 1회 재시도
  if (response.status === 401 && !retry) {
    const refreshed = await silentRefresh();
    if (refreshed) {
      return createProxyRequest(request, targetUrl, body, true);
    }
  }

  // ⚠️ 중요: response.json()을 소비하는 작업은 정상 응답 처리 전에 수행되어야 함
  // forwardBackendError()는 response.json()을 호출하므로,
  // 이후 response.body로 접근할 수 없습니다.
  // 따라서 !response.ok 체크는 정상 응답 스트리밍 전에 반드시 먼저 처리되어야 합니다.
  if (!response.ok) {
    return forwardBackendError(response, context);
  }

  // 정상 응답 스트리밍
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
