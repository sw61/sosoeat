import { apiServer } from '@/shared/api/api-server';
import type { Meeting } from '@/shared/types/meeting';

/**
 * 모임 단건 조회 (서버 컴포넌트 전용)
 * GET /meetings/:id
 */
export async function getMeetingById(id: number): Promise<Meeting> {
  const response = await apiServer.get(`/meetings/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '모임 조회에 실패했습니다.');
  }

  return response.json();
}
