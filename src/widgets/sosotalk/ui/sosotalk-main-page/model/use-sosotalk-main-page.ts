'use client';

import { useMemo } from 'react';

import { parseAsStringLiteral, useQueryState } from 'nuqs';

import type { GetSosoTalkPostListResponse } from '@/entities/post';
import { mapPostToSosoTalkCardItem, useGetSosoTalkPostList } from '@/entities/post';

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

  const queryParams = useMemo(
    () => createSosoTalkMainPageQueryParams(activeTab, activeSort),
    [activeSort, activeTab]
  );
  const shouldUseInitialData = activeTab === initialTab && activeSort === initialSort;
  const { data, isLoading, isError } = useGetSosoTalkPostList(
    queryParams,
    shouldUseInitialData ? initialData : undefined
  );
  const posts = useMemo(() => data?.data.map(mapPostToSosoTalkCardItem) ?? [], [data]);

  return {
    activeSort,
    activeTab,
    isError,
    isLoading,
    posts,
    setActiveSort: (value: SosoTalkSortValue) => void setActiveSort(value),
    setActiveTab: (value: SosoTalkTabValue) => void setActiveTab(value),
  };
}
