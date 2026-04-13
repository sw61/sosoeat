import { fetchClient } from '@/shared/api/fetch-client';
import { FavoriteList, UserMeeting, UserMeetingsResponse } from '@/shared/types/generated-client';

export type UserMeetingWithImage = UserMeeting & { image?: string };
export type UserMeetingsResponseWithImage = Omit<UserMeetingsResponse, 'data'> & {
  data: UserMeetingWithImage[];
};

const MAX_FETCH_SIZE = 100;

export const mypageApi = {
  fetchJoinedMeetings: async (): Promise<UserMeetingsResponse> => {
    const res = await fetchClient.get('/users/me/meetings?type=joined');
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },

  fetchCreatedMeetings: async (): Promise<UserMeetingsResponseWithImage> => {
    const res = await fetchClient.get('/users/me/meetings?type=created');
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },

  fetchFavoriteMeetings: async (): Promise<FavoriteList> => {
    const res = await fetchClient.get('/favorites');
    if (!res.ok) return { data: [], nextCursor: '', hasMore: false };
    return res.json();
  },

  fetchMeetingCount: async (): Promise<number> => {
    const res = await fetchClient.get(`/users/me/meetings?type=joined&size=${MAX_FETCH_SIZE}`);
    if (!res.ok) return 0;
    const data: UserMeetingsResponse = await res.json();
    return data.data.length;
  },
};
