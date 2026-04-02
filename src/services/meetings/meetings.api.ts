import { fetchClient } from '@/lib/http/fetch-client';
import { CreateMeeting } from '@/types/generated-client/models/CreateMeeting';
import { MeetingWithHost } from '@/types/generated-client/models/MeetingWithHost';
import { UpdateMeeting } from '@/types/generated-client/models/UpdateMeeting';
import { UpdateMeetingStatus } from '@/types/generated-client/models/UpdateMeetingStatus';

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

  /**
   * 모임 수정 요청
   * PATCH /meetings/:id
   *
   * @param id - 수정할 모임 ID
   * @param payload - 수정할 데이터 (UpdateMeeting 타입)
   * @throws 서버 에러 메시지 또는 기본 에러
   */
  async update(id: number, payload: UpdateMeeting): Promise<MeetingWithHost> {
    const response = await fetchClient.patch(`/meetings/${id}`, payload);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 수정에 실패했습니다.');
    }

    return response.json();
  },

  async updateStatus(id: number, payload: UpdateMeetingStatus): Promise<MeetingWithHost> {
    const response = await fetchClient.patch(`/meetings/${id}/status`, payload);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 상태 변경에 실패했습니다.');
    }

    return response.json();
  },

  async deleteMeeting(id: number): Promise<void> {
    const response = await fetchClient.delete(`/meetings/${id}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 삭제에 실패했습니다.');
    }
  },

  async join(id: number): Promise<void> {
    const response = await fetchClient.post(`/meetings/${id}/join`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 참여에 실패했습니다.');
    }
  },

  async leave(id: number): Promise<void> {
    const response = await fetchClient.delete(`/meetings/${id}/join`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '모임 참여 취소에 실패했습니다.');
    }
  },
};
