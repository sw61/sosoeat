import { useQuery } from '@tanstack/react-query';

import { mypageApi } from '../api/mypage.api';

export const mypageQueryKeys = {
  joinedMeetings: ['mypage-joined-meetings'] as const,
  createdMeetings: ['mypage-created-meetings'] as const,
  favoriteMeetings: ['mypage-favorite-meetings'] as const,
};

const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const useJoinedMeetings = () =>
  useQuery({
    queryKey: mypageQueryKeys.joinedMeetings,
    queryFn: mypageApi.fetchJoinedMeetings,
    staleTime: FIVE_MINUTES_IN_MS,
  });

export const useCreatedMeetings = () =>
  useQuery({
    queryKey: mypageQueryKeys.createdMeetings,
    queryFn: mypageApi.fetchCreatedMeetings,
    staleTime: FIVE_MINUTES_IN_MS,
  });

export const useFavoriteMeetings = () =>
  useQuery({
    queryKey: mypageQueryKeys.favoriteMeetings,
    queryFn: mypageApi.fetchFavoriteMeetings,
    staleTime: FIVE_MINUTES_IN_MS,
  });
