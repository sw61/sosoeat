'use client';

import { useCreatedMeetings, useFavoriteMeetings, useJoinedMeetings } from './mypage.queries';
import { toFavoriteMeetingCards, toUserMeetingCards } from './mypage.service';
import { TabValue } from './mypage.types';

export function useMeetingTabs(activeTab: TabValue) {
  const joinedQuery = useJoinedMeetings();
  const createdQuery = useCreatedMeetings();
  const favoriteQuery = useFavoriteMeetings();

  const favoritedIds = new Set(favoriteQuery.data?.data.map((f) => f.meeting.id) ?? []);

  let cards: ReturnType<typeof toUserMeetingCards>;
  if (activeTab === 'all' && joinedQuery.data) {
    cards = toUserMeetingCards(joinedQuery.data, favoritedIds);
  } else if (activeTab === 'created' && createdQuery.data) {
    cards = toUserMeetingCards(createdQuery.data, favoritedIds);
  } else if (activeTab === 'favorite' && favoriteQuery.data) {
    cards = toFavoriteMeetingCards(favoriteQuery.data);
  } else {
    cards = [];
  }

  const isLoading =
    (activeTab === 'all' && joinedQuery.isLoading) ||
    (activeTab === 'created' && createdQuery.isLoading) ||
    (activeTab === 'favorite' && favoriteQuery.isLoading);

  return { cards, isLoading };
}
