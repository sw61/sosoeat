import { useQuery } from '@tanstack/react-query';

import { mypageApi } from '../api/mypage.api';

export const mypageQueryKeys = {
  joinedMeetings: ['mypage-joined-meetings'] as const,
  createdMeetings: ['mypage-created-meetings'] as const,
  favoriteMeetings: ['mypage-favorite-meetings'] as const,
};

export const useJoinedMeetings = (enabled = true) =>
  useQuery({
    queryKey: mypageQueryKeys.joinedMeetings,
    queryFn: mypageApi.fetchJoinedMeetings,
    enabled,
  });

export const useCreatedMeetings = (enabled = true) =>
  useQuery({
    queryKey: mypageQueryKeys.createdMeetings,
    queryFn: mypageApi.fetchCreatedMeetings,
    enabled,
  });

export const useFavoriteMeetings = (enabled = true) =>
  useQuery({
    queryKey: mypageQueryKeys.favoriteMeetings,
    queryFn: mypageApi.fetchFavoriteMeetings,
    enabled,
    refetchOnMount: 'always',
  });
