/**
 * [Client-only] commentClient
 * 클라이언트 컴포넌트에서 사용합니다.
 * /api/comment-proxy를 통해 comment server(Railway Express)로 요청을 전달합니다.
 * Authorization 헤더 삽입은 프록시 Route Handler에서 처리합니다.
 */
const request = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const fullUrl = `/api/comment-proxy${url}`;

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(fullUrl, { ...options, headers });
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
