import { useQuery } from '@tanstack/react-query';

import { mypageRepository } from './mypage.repository';

export const mypageQueryKeys = {
  joinedMeetings: ['mypage-joined-meetings'] as const,
  createdMeetings: ['mypage-created-meetings'] as const,
  favoriteMeetings: ['mypage-favorite-meetings'] as const,
};

export const useJoinedMeetings = (enabled = true) =>
  useQuery({
    queryKey: mypageQueryKeys.joinedMeetings,
    queryFn: mypageRepository.fetchJoinedMeetings,
    enabled,
  });

export const useCreatedMeetings = (enabled = true) =>
  useQuery({
    queryKey: mypageQueryKeys.createdMeetings,
    queryFn: mypageRepository.fetchCreatedMeetings,
    enabled,
  });

export const useFavoriteMeetings = (enabled = true) =>
  useQuery({
    queryKey: mypageQueryKeys.favoriteMeetings,
    queryFn: mypageRepository.fetchFavoriteMeetings,
    enabled,
    refetchOnMount: 'always',
  });
