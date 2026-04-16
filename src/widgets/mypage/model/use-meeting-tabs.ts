'use client';

import { useMemo } from 'react';

import { useCreatedMeetings, useFavoriteMeetings, useJoinedMeetings } from './mypage.queries';
import { toFavoriteMeetingCards, toUserMeetingCards } from './mypage.service';
import { TabValue } from './mypage.types';

export function useMeetingTabs(activeTab: TabValue) {
  const joinedQuery = useJoinedMeetings();
  const createdQuery = useCreatedMeetings();
  const favoriteQuery = useFavoriteMeetings();

  const cards = useMemo(() => {
    const favoritedIds = new Set(favoriteQuery.data?.data.map((f) => f.meeting.id) ?? []);

    if (activeTab === 'all' && joinedQuery.data) {
      const allMeetings = joinedQuery.data.pages.flatMap((page) => page.data);
      return toUserMeetingCards(
        { data: allMeetings, nextCursor: '', hasMore: false },
        favoritedIds
      );
    }
    if (activeTab === 'created' && createdQuery.data) {
      const allMeetings = createdQuery.data.pages.flatMap((page) => page.data);
      return toUserMeetingCards(
        { data: allMeetings, nextCursor: '', hasMore: false },
        favoritedIds
      );
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

  const hasNextPage =
    activeTab === 'all'
      ? (joinedQuery.hasNextPage ?? false)
      : activeTab === 'created'
        ? (createdQuery.hasNextPage ?? false)
        : false;

  const isFetchingNextPage =
    activeTab === 'all'
      ? joinedQuery.isFetchingNextPage
      : activeTab === 'created'
        ? createdQuery.isFetchingNextPage
        : false;

  const fetchNextPage = () => {
    if (activeTab === 'all') joinedQuery.fetchNextPage();
    else if (activeTab === 'created') createdQuery.fetchNextPage();
  };

  return { cards, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage };
}
