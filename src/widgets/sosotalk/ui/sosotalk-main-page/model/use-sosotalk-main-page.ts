'use client';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

import type { GetSosoTalkPostListResponse } from '@/entities/post';
import { mapPostToSosoTalkCardItem, useGetSosoTalkPostInfiniteList } from '@/entities/post';

import type {
  SosoTalkSortValue,
  SosoTalkTabValue,
} from '../../sosotalk-filter-bar/sosotalk-filter-bar.types';

import { createSosoTalkMainPageQueryParams } from './sosotalk-main-page.utils';

interface UseSosoTalkMainPageParams {
  initialData?: GetSosoTalkPostListResponse;
  initialTab?: SosoTalkTabValue;
  initialSort?: SosoTalkSortValue;
}

export function useSosoTalkMainPage({
  initialData,
  initialTab = 'all',
  initialSort = 'latest',
}: UseSosoTalkMainPageParams) {
  const [activeTab, setActiveTab] = useQueryState<SosoTalkTabValue>(
    'tab',
    parseAsStringLiteral(['all', 'popular'] as const)
      .withDefault('all')
      .withOptions({ history: 'push' })
  );
  const [activeSort, setActiveSort] = useQueryState<SosoTalkSortValue>(
    'sort',
    parseAsStringLiteral(['comments', 'likes', 'latest'] as const)
      .withDefault('latest')
      .withOptions({ history: 'push' })
  );

  const queryParams = createSosoTalkMainPageQueryParams(activeTab, activeSort);
  const shouldUseInitialData = activeTab === initialTab && activeSort === initialSort;
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetSosoTalkPostInfiniteList(queryParams, shouldUseInitialData ? initialData : undefined);
  const posts = data?.pages.flatMap((page) => page.data).map(mapPostToSosoTalkCardItem) ?? [];

  return {
    activeSort,
    activeTab,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    posts,
    setActiveSort: (value: SosoTalkSortValue) => void setActiveSort(value),
    setActiveTab: (value: SosoTalkTabValue) => void setActiveTab(value),
  };
}
