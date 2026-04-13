import qs from 'qs';

import { fetchClient } from '@/shared/api/fetch-client';
import { parseResponse, parseVoidResponse } from '@/shared/api/parse-response';
import { MeetingList, TeamIdMeetingsGetRequest } from '@/shared/types/generated-client';
import { CreateMeeting } from '@/shared/types/generated-client/models/CreateMeeting';
import { MeetingWithHost } from '@/shared/types/generated-client/models/MeetingWithHost';
import { UpdateMeeting } from '@/shared/types/generated-client/models/UpdateMeeting';
import { UpdateMeetingStatus } from '@/shared/types/generated-client/models/UpdateMeetingStatus';

import type { Meeting } from '../model/meeting.types';

const makeQueryString = (params: Omit<TeamIdMeetingsGetRequest, 'teamId'>): string => {
  return qs.stringify(params, {
    skipNulls: true,
    addQueryPrefix: true,
    serializeDate: (date: Date) => date.toISOString(),
  });
};

/**
 * [Service Layer] meetingsApi
 * 모임 관련 API 요청을 처리합니다.
 */
export const meetingsApi = {
  async getById(id: number): Promise<Meeting> {
    const response = await fetchClient.get(`/meetings/${id}`);
    return parseResponse<Meeting>(response, '모임 조회에 실패했습니다.');
  },

  async getList(): Promise<MeetingList> {
    const response = await fetchClient.get('/meetings');
    return parseResponse<MeetingList>(response, '모임 목록 조회에 실패했습니다.');
  },

  async getByFilter(options: Omit<TeamIdMeetingsGetRequest, 'teamId'>): Promise<MeetingList> {
    const queryString = makeQueryString(options);
    const response = await fetchClient.get(`/meetings${queryString}`);
    return parseResponse<MeetingList>(response, '모임 목록 조회에 실패했습니다.');
  },

  /**
   * 모임 생성 요청
   * POST /meetings
   */
  async create(payload: CreateMeeting): Promise<MeetingWithHost> {
    const response = await fetchClient.post('/meetings', payload);
    return parseResponse<MeetingWithHost>(response, '모임 생성에 실패했습니다.');
  },

  /**
   * 모임 수정 요청
   * PATCH /meetings/:id
   */
  async update(id: number, payload: UpdateMeeting): Promise<MeetingWithHost> {
    const response = await fetchClient.patch(`/meetings/${id}`, payload);
    return parseResponse<MeetingWithHost>(response, '모임 수정에 실패했습니다.');
  },

  async updateStatus(id: number, payload: UpdateMeetingStatus): Promise<MeetingWithHost> {
    const response = await fetchClient.patch(`/meetings/${id}/status`, payload);
    return parseResponse<MeetingWithHost>(response, '모임 상태 변경에 실패했습니다.');
  },

  async deleteMeeting(id: number): Promise<void> {
    const response = await fetchClient.delete(`/meetings/${id}`);
    return parseVoidResponse(response, '모임 삭제에 실패했습니다.');
  },

  async join(id: number): Promise<void> {
    const response = await fetchClient.post(`/meetings/${id}/join`);
    return parseVoidResponse(response, '모임 참여에 실패했습니다.');
  },

  async leave(id: number): Promise<void> {
    const response = await fetchClient.delete(`/meetings/${id}/join`);
    return parseVoidResponse(response, '모임 참여 취소에 실패했습니다.');
  },
};
