import { useQuery } from '@tanstack/react-query';

import { useFavoriteList } from '@/entities/favorites';
import { meetingKeys } from '@/entities/meeting';

import { mypageApi } from '../api/mypage.api';

import { FIVE_MINUTES_IN_MS } from './mypage.constants';

export const useJoinedMeetings = () =>
  useQuery({
    queryKey: meetingKeys.joined(),
    queryFn: mypageApi.fetchJoinedMeetings,
    staleTime: FIVE_MINUTES_IN_MS,
  });

export const useCreatedMeetings = () =>
  useQuery({
    queryKey: meetingKeys.my(),
    queryFn: mypageApi.fetchCreatedMeetings,
    staleTime: FIVE_MINUTES_IN_MS,
  });

export { useFavoriteList as useFavoriteMeetings };
