import qs from 'qs';

import type { MeetingListResult } from '@/entities/meeting';
import { fetchClient } from '@/shared/api/fetch-client';
import { parseResponse } from '@/shared/api/parse-response';

import type { MeetingSearchRequest } from '../model/meeting-search.types';

const makeQueryString = (params: MeetingSearchRequest): string => {
  return qs.stringify(params, {
    skipNulls: true,
    addQueryPrefix: true,
    serializeDate: (date: Date) => date.toISOString(),
  });
};

/**
 * [Service Layer] meetingSearchApi
 * 모임 검색/목록 조회 API 요청을 처리합니다.
 */
export const meetingSearchApi = {
  async getList(): Promise<MeetingListResult> {
    const response = await fetchClient.get('/meetings');
    return parseResponse<MeetingListResult>(response, '모임 목록 조회에 실패했습니다.');
  },

  async getByFilter(options: MeetingSearchRequest): Promise<MeetingListResult> {
    const queryString = makeQueryString(options);
    const response = await fetchClient.get(`/meetings${queryString}`);
    return parseResponse<MeetingListResult>(response, '모임 목록 조회에 실패했습니다.');
  },
};
