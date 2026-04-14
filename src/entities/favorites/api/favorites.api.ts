import { fetchClient } from '@/shared/api/fetch-client';
import { parseResponse, parseVoidResponse } from '@/shared/api/parse-response';
import { FavoriteList } from '@/shared/types/generated-client';

export const favoritesApi = {
  async fetchList(): Promise<FavoriteList> {
    const res = await fetchClient.get('/favorites');
    return parseResponse<FavoriteList>(
      res,
      '찜 목록을 불러오는 중 문제가 생겼어요. 다시 시도해 주세요.'
    );
  },

  async favoritePost(meetingId: number): Promise<void> {
    const response = await fetchClient.post(`/meetings/${meetingId}/favorites`);
    return parseVoidResponse(response, '찜하기에 실패했습니다.');
  },

  async favoriteDelete(meetingId: number): Promise<void> {
    const response = await fetchClient.delete(`/meetings/${meetingId}/favorites`);
    return parseVoidResponse(response, '찜하기 취소에 실패했습니다.');
  },

  async getCount(): Promise<number> {
    const response = await fetchClient.get('/favorites/count');
    const data = await parseResponse<{ count: number }>(
      response,
      '찜한 모임 개수 조회에 실패했습니다.'
    );
    return data.count ?? 0;
  },
};
