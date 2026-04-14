import { fetchClient } from '@/shared/api/fetch-client';
import { FavoriteList, UserMeeting, UserMeetingsResponse } from '@/shared/types/generated-client';

export type UserMeetingWithImage = UserMeeting & {
  image?: string;
  type?: string;
  confirmedAt?: string | null;
};
export type UserMeetingsResponseWithImage = Omit<UserMeetingsResponse, 'data'> & {
  data: UserMeetingWithImage[];
};

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
};
