/**
 * [Client-only] fetchClient
 * - 모든 API 요청을 /api/proxy/[...path]를 통해 백엔드로 전달합니다.
 * - Authorization 헤더 삽입 및 토큰 갱신은 프록시 Route Handler에서 처리합니다.
 */
const request = async (url: string, options: RequestInit = {}): Promise<Response> => {
  /**
   * URL 처리 전략:
   * 1. /api/로 시작하는 내부 경로(BFF)는 그대로 사용합니다.
   * 2. 그 외의 상대 경로는 /api/proxy/ 를 앞에 붙여 프록시를 경유합니다.
   */
  const fullUrl = url.startsWith('/api/') ? url : `/api/proxy${url}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(fullUrl, { ...options, headers });

  // proxy를 경유한 요청에서 silentRefresh까지 실패한 401 → 세션 만료 → 로그인 페이지로
  // /api/auth/* 등 BFF 직접 호출은 제외 (로그인 실패 등 정상적인 401 포함)
  if (response.status === 401 && fullUrl.startsWith('/api/proxy/')) {
    window.location.href = '/login';
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
