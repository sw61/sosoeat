'use client';

import { useMemo } from 'react';

import { TabValue } from '../_components/meeting-tabs/meeting-tabs.types';
import {
  useCreatedMeetings,
  useFavoriteMeetings,
  useJoinedMeetings,
} from '../_services/mypage.queries';
import {
  toCreatedMeetingCards,
  toFavoriteMeetingCards,
  toJoinedMeetingCards,
} from '../_services/mypage.service';

export function useMeetingTabs(activeTab: TabValue) {
  const joinedQuery = useJoinedMeetings(activeTab === 'all');
  const createdQuery = useCreatedMeetings(activeTab === 'created');
  const favoriteQuery = useFavoriteMeetings(activeTab === 'favorite');

  const cards = useMemo(() => {
    if (activeTab === 'all' && joinedQuery.data) {
      return toJoinedMeetingCards(joinedQuery.data);
    }
    if (activeTab === 'created' && createdQuery.data) {
      return toCreatedMeetingCards(createdQuery.data);
    }
    if (activeTab === 'favorite' && favoriteQuery.data) {
      return toFavoriteMeetingCards(favoriteQuery.data);
    }
    return [];
  }, [activeTab, joinedQuery.data, createdQuery.data, favoriteQuery.data]);

  const isLoading =
    (activeTab === 'all' && joinedQuery.isLoading) ||
    (activeTab === 'created' && createdQuery.isLoading) ||
    (activeTab === 'favorite' && favoriteQuery.isLoading);

  return { cards, isLoading };
}
