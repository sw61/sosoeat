import { fetchClient } from '@/shared/api/fetch-client';

export const favoritesApi = {
  async favoritePost(meetingId: number): Promise<void> {
    const response = await fetchClient.post(`/meetings/${meetingId}/favorites`);
    if (!response.ok) {
      throw new Error('찜하기에 실패했습니다.');
    }
  },
  async favoriteDelete(meetingId: number): Promise<void> {
    const response = await fetchClient.delete(`/meetings/${meetingId}/favorites`);
    if (!response.ok) {
      throw new Error('찜하기 취소에 실패했습니다.');
    }
  },
  async getCount(): Promise<number> {
    const response = await fetchClient.get('/favorites/count');
    if (!response.ok) {
      throw new Error('찜한 모임 개수 조회에 실패했습니다.');
    }
    const data = await response.json();
    return data.count ?? 0;
  },
};
