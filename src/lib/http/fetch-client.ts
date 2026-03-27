import { TokenProviderRegistry } from '@/lib/auth/token-registry';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID;

let refreshPromise: Promise<string | null> | null = null;

/**
 * [Client-only] silentRefresh
 * - 용도: 엑세스 토큰이 만료되었을 때 BFF(/api/auth/refresh)에 갱신 요청을 보냅니다.
 */
async function silentRefresh(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const res = await fetch(`/api/auth/refresh`, { method: 'POST' });
      if (!res.ok) throw new Error('Refresh failed');
      const data = await res.json();
      TokenProviderRegistry.client.setAccessToken(data.accessToken);
      return data.accessToken;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * [Client-only] fetchClient
 * - 기반 함수: 모든 요청의 공통 로직(URL 결합, 토큰 주입, 401 재시도)을 처리합니다.
 */
const request = async (
  url: string,
  options: RequestInit = {},
  _retryCount = 0
): Promise<Response> => {
  const accessToken = await TokenProviderRegistry.client.getAccessToken();

  /**
   * URL 처리 전략:
   * 1. http:// 또는 https://로 시작하는 완전한 URL은 그대로 사용합니다. (하드코딩 지원)
   * 2. /api/로 시작하는 내부 경로는 그대로 사용합니다. (BFF 호출 지원)
   * 3. 그 외의 상대 경로는 기본 BASE_URL + TEAM_ID 환경 변수를 조합합니다.
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

  const response = await fetch(fullUrl, { ...options, headers });

  // 401 발생 시 최대 1회 재시도
  if (response.status === 401 && _retryCount < 1) {
    const newToken = await silentRefresh();
    if (newToken) {
      return request(url, options, _retryCount + 1);
    }
  }

  return response;
};

/**
 * fetchClient 인터페이스 (Axios-like)
 */
export const fetchClient = Object.assign(request, {
  get: (url: string, options?: RequestInit) => request(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: (url: string, options?: RequestInit) => request(url, { ...options, method: 'DELETE' }),
});
