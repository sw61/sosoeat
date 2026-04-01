import { fetchClient } from '@/lib/http/fetch-client';
import { CreateMeeting } from '@/types/generated-client/models/CreateMeeting';
import { MeetingWithHost } from '@/types/generated-client/models/MeetingWithHost';

/**
 * [Service Layer] meetingsApi
 * 모임 관련 API 요청을 처리합니다.
 */
export const meetingsApi = {
  /**
   * 모임 생성 요청
   * POST /meetings
   *
   * @param payload - 모임 생성에 필요한 데이터 (CreateMeeting 타입)
   * @throws 서버 에러 메시지 또는 기본 에러
   */
  async create(payload: CreateMeeting): Promise<MeetingWithHost> {
    const response = await fetchClient.post('/meetings', payload);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 생성에 실패했습니다.');
    }

    return response.json();
  },
};
