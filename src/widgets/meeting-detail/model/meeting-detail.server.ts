import { cache } from 'react';

import type { Meeting } from '@/entities/meeting';
import { apiServer } from '@/shared/api/api-server';

/**
 * 모임 단건 조회 (서버 컴포넌트 전용)
 * GET /meetings/:id
 * React.cache로 같은 렌더 트리 내 동일 id 중복 요청 방지
 */
export const getMeetingById = cache(async (id: number): Promise<Meeting> => {
  const response = await apiServer.get(`/meetings/${id}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '모임 조회에 실패했습니다.');
  }

  return response.json();
});
