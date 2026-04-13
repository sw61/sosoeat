import { useQuery } from '@tanstack/react-query';

import { useFavoriteList } from '@/entities/favorites';

import { mypageApi } from '../api/mypage.api';

import { FIVE_MINUTES_IN_MS } from './mypage.constants';

export const mypageKeys = {
  joinedMeetings: () => ['users', 'me', 'joined-meetings'] as const,
  createdMeetings: () => ['users', 'me', 'created-meetings'] as const,
} as const;

export const useJoinedMeetings = () =>
  useQuery({
    queryKey: mypageKeys.joinedMeetings(),
    queryFn: mypageApi.fetchJoinedMeetings,
    staleTime: FIVE_MINUTES_IN_MS,
  });

export const useCreatedMeetings = () =>
  useQuery({
    queryKey: mypageKeys.createdMeetings(),
    queryFn: mypageApi.fetchCreatedMeetings,
    staleTime: FIVE_MINUTES_IN_MS,
  });

export { useFavoriteList as useFavoriteMeetings };
