import { fetchClient } from '@/shared/api/fetch-client';

export const favoritesApi = {
  async favoritePost(meetingId: number): Promise<void> {
    const response = await fetchClient.post(`/meetings/${meetingId}/favorites`);
    if (!response.ok) {
      throw new Error('Failed to favorite the meeting');
    }
  },
  async favoriteDelete(meetingId: number): Promise<void> {
    const response = await fetchClient.delete(`/meetings/${meetingId}/favorites`);
    if (!response.ok) {
      throw new Error('Failed to unfavorite the meeting');
    }
  },
  async getCount(): Promise<number> {
    const response = await fetchClient.get('/favorites/count');
    if (!response.ok) {
      throw new Error('Failed to fetch favorites count');
    }
    const data = await response.json();
    return data.count ?? 0;
  },
};
