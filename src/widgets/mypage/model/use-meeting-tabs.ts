'use client';

import { useMemo } from 'react';

import { TabValue } from '../ui/meeting-tabs/meeting-tabs.types';

import { useCreatedMeetings, useFavoriteMeetings, useJoinedMeetings } from './mypage.queries';
import { toFavoriteMeetingCards, toUserMeetingCards } from './mypage.service';

export function useMeetingTabs(activeTab: TabValue) {
  const joinedQuery = useJoinedMeetings(activeTab === 'all');
  const createdQuery = useCreatedMeetings(activeTab === 'created');
  const favoriteQuery = useFavoriteMeetings(activeTab === 'favorite');

  const cards = useMemo(() => {
    if (activeTab === 'all' && joinedQuery.data) {
      return toUserMeetingCards(joinedQuery.data);
    }
    if (activeTab === 'created' && createdQuery.data) {
      return toUserMeetingCards(createdQuery.data);
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
