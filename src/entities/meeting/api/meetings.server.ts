import { apiServer } from '@/shared/api/api-server';
import { MeetingList } from '@/shared/types/generated-client/models/MeetingList';

export interface GetMeetingsParams {
  type?: string;
  region?: string;
  dateStart?: string;
  dateEnd?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  cursor?: string;
  size?: number;
  keyword?: string;
}

/**
 * 모임 목록 조회 (서버 컴포넌트 전용)
 * GET /meetings
 */
export async function getMeetings(params?: GetMeetingsParams): Promise<MeetingList> {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) searchParams.set(key, String(value));
    });
  }
  const query = searchParams.toString();
  const response = await apiServer.get(`/meetings${query ? `?${query}` : ''}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '모임 목록 조회에 실패했습니다.');
  }

  return response.json();
}
