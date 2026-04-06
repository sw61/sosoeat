import { fetchClient } from '@/shared/api/fetch-client';

const favoriteApi = {
  async favoritePost(meetingId: number): Promise<boolean> {
    const response = await fetchClient.post(`/meetings/${meetingId}/favorites`);
    if (!response.ok) {
      throw new Error('Failed to favorite the meeting');
    } else {
      return response.ok;
    }
  },
  async favoriteDelete(meetingId: number): Promise<boolean> {
    const response = await fetchClient.delete(`/meetings/${meetingId}/favorites`);
    if (!response.ok) {
      throw new Error('Failed to unfavorite the meeting');
    } else {
      return response.ok;
    }
  },
};

export default favoriteApi;
