import { useQuery } from '@tanstack/react-query';

import { mypageApi } from '../api/mypage.api';

export const mypageQueryKeys = {
  joinedMeetings: ['mypage-joined-meetings'] as const,
  createdMeetings: ['mypage-created-meetings'] as const,
  favoriteMeetings: ['mypage-favorite-meetings'] as const,
};

export const useJoinedMeetings = () =>
  useQuery({
    queryKey: mypageQueryKeys.joinedMeetings,
    queryFn: mypageApi.fetchJoinedMeetings,
    staleTime: 1000 * 60 * 5,
  });

export const useCreatedMeetings = () =>
  useQuery({
    queryKey: mypageQueryKeys.createdMeetings,
    queryFn: mypageApi.fetchCreatedMeetings,
    staleTime: 1000 * 60 * 5,
  });

export const useFavoriteMeetings = () =>
  useQuery({
    queryKey: mypageQueryKeys.favoriteMeetings,
    queryFn: mypageApi.fetchFavoriteMeetings,
    staleTime: 1000 * 60 * 5,
  });
