import { CookieStorage } from '@/lib/auth/cookie-storage';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [Server-only] apiServer
 * - 서버 컴포넌트, Route Handler, Server Action에서 사용합니다.
 * - httpOnly 쿠키에서 accessToken을 읽어 Authorization 헤더에 삽입합니다.
 * - 토큰 갱신은 middleware에서 처리합니다.
 */
const request = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const accessToken = await CookieStorage.getAccessToken();

  const fullUrl =
    url.startsWith('http') || url.startsWith('/api/') ? url : `${BASE_URL}/${TEAM_ID}${url}`;

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(fullUrl, { ...options, headers });
};

/**
 * apiServer 인터페이스
 */
export const apiServer = Object.assign(request, {
  get: (url: string, options?: RequestInit) => request(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: (url: string, options?: RequestInit) => request(url, { ...options, method: 'DELETE' }),
});
