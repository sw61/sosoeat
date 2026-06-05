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
 * /api/comments Route Handler를 통해 Supabase에 직접 접근합니다.
 */
const request = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const fullUrl = `/api/comments/${url.replace(/^\//, '')}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(fullUrl, { ...options, headers });

  if (response.status === 401) {
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
