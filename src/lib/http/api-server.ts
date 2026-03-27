import { CookieStorage } from '@/lib/auth/cookie-storage';
import { TokenProviderRegistry } from '@/lib/auth/token-registry';

const BASE_URL = process.env.API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

/**
 * [의존성 주입] TokenProviderRegistry (Server-side)
 */
TokenProviderRegistry.setServerProvider({
  getAccessToken: () => CookieStorage.getAccessToken(),
  setAccessToken: (token: string) => CookieStorage.setSession({ accessToken: token }),
});
/**
 * [Server-only] apiServer
 * - 기반 함수: 세션 토큰 자동 주입 및 서버 사이드 Fetch 처리
 */
const request = async (url: string, options: RequestInit = {}) => {
  const accessToken = await TokenProviderRegistry.server.getAccessToken();

  /**
   * URL 처리 전략: http로 시작하거나 /api/로 시작하는 경우 그대로 사용, 그 외에는 BASE_URL 조합
   */
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
