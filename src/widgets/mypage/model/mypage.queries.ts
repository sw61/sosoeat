import { useInfiniteQuery } from '@tanstack/react-query';

import { useFavoriteList } from '@/entities/favorites';
import { meetingKeys } from '@/entities/meeting';

import { mypageApi } from '../api/mypage.api';

import { FIVE_MINUTES_IN_MS, TEN_MINUTES_IN_MS } from './mypage.constants';

export const useJoinedMeetings = () =>
  useInfiniteQuery({
    queryKey: meetingKeys.joined(),
    queryFn: ({ pageParam }) => mypageApi.fetchJoinedMeetings(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    staleTime: FIVE_MINUTES_IN_MS,
    gcTime: TEN_MINUTES_IN_MS,
  });

export const useCreatedMeetings = () =>
  useInfiniteQuery({
    queryKey: meetingKeys.my(),
    queryFn: ({ pageParam }) => mypageApi.fetchCreatedMeetings(pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    staleTime: FIVE_MINUTES_IN_MS,
    gcTime: TEN_MINUTES_IN_MS,
  });

export { useFavoriteList as useFavoriteMeetings };
