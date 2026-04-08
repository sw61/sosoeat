import { apiServer } from '@/shared/api/api-server';

/**
 * 찜한 모임 개수 조회 (서버 컴포넌트 전용)
 * GET /favorites/count
 */
export async function getFavoritesCount(): Promise<number> {
  const response = await apiServer.get('/favorites/count');

  if (response.status === 401) {
    return 0;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '찜한 모임 개수 조회에 실패했습니다.');
  }

  const data = await response.json();
  return data.count ?? 0;
}
