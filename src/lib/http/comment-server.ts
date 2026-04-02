import { redirect } from 'next/navigation';

import { CookieStorage } from '@/lib/auth/cookie-storage';
import { silentRefresh } from '@/lib/auth/silent-refresh';

const COMMENT_SERVER_URL = process.env.COMMENT_SERVER_URL;

/**
 * [Server-only] commentServer
 * 서버 컴포넌트, Route Handler, Server Action에서 사용합니다.
 * comment server(Railway Express)에 직접 요청합니다.
 * httpOnly 쿠키에서 accessToken을 읽어 Authorization 헤더에 삽입합니다.
 * 401 응답 시 refreshToken으로 토큰을 갱신하고 원래 요청을 1회 재시도합니다.
 */
const request = async (
  url: string,
  options: RequestInit = {},
  retry = false
): Promise<Response> => {
  const accessToken = await CookieStorage.getAccessToken();
  const fullUrl = `${COMMENT_SERVER_URL}${url}`;

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(fullUrl, { ...options, headers });

  if (response.status === 401 && !retry) {
    const refreshed = await silentRefresh();
    if (refreshed) {
      return request(url, options, true);
    }
    redirect('/login');
  }

  return response;
};

export const commentServer = Object.assign(request, {
  get: (url: string, options?: RequestInit) => request(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  delete: (url: string, options?: RequestInit) => request(url, { ...options, method: 'DELETE' }),
});
