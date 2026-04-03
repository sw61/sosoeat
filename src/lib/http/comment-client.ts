/**
 * 세션 만료 시 실행할 콜백입니다.
 * commentClient는 store를 직접 참조하지 않고, 앱 초기화 시점에 외부에서 주입받습니다.
 * (의존성 역전 방지)
 */
let onSessionExpired: (() => void) | null = null;

export const setCommentSessionExpiredHandler = (handler: () => void) => {
  onSessionExpired = handler;
};

/**
 * [Client-only] commentClient
 * 클라이언트 컴포넌트에서 사용합니다.
 * /api/comment-proxy를 통해 comment server(Railway Express)로 요청을 전달합니다.
 * Authorization 헤더 삽입 및 토큰 갱신은 프록시 Route Handler에서 처리합니다.
 */
const request = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const fullUrl = `/api/comment-proxy${url}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(fullUrl, { ...options, headers });

  if (response.status === 401 && fullUrl.startsWith('/api/comment-proxy/')) {
    onSessionExpired?.();
  }

  return response;
};

export const commentClient = Object.assign(request, {
  get: (url: string, options?: RequestInit) => request(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(url: string, body?: T, options?: RequestInit) =>
    request(url, { ...options, method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  delete: (url: string, options?: RequestInit) => request(url, { ...options, method: 'DELETE' }),
});
