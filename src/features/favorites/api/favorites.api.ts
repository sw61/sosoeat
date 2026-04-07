import { fetchClient } from '@/shared/api/fetch-client';

export const favoritesApi = {
  async favoritePost(meetingId: number): Promise<boolean> {
    const response = await fetchClient.post(`/meetings/${meetingId}/favorites`);
    if (!response.ok) {
      throw new Error('Failed to favorite the meeting');
    }
    return response.ok;
  },
  async favoriteDelete(meetingId: number): Promise<boolean> {
    const response = await fetchClient.delete(`/meetings/${meetingId}/favorites`);
    if (!response.ok) {
      throw new Error('Failed to unfavorite the meeting');
    }
    return response.ok;
  },
};
