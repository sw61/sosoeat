'use client';

import { useMemo, useState } from 'react';

import { mapPostToSosoTalkCardItem, useGetSosoTalkPostList } from '@/entities/post';

import type {
  SosoTalkSortValue,
  SosoTalkTabValue,
} from '../../sosotalk-filter-bar/sosotalk-filter-bar.types';

import { createSosoTalkMainPageQueryParams } from './sosotalk-main-page.utils';

export function useSosoTalkMainPage() {
  const [activeTab, setActiveTab] = useState<SosoTalkTabValue>('all');
  const [activeSort, setActiveSort] = useState<SosoTalkSortValue>('latest');

  const queryParams = useMemo(
    () => createSosoTalkMainPageQueryParams(activeTab, activeSort),
    [activeSort, activeTab]
  );
  const { data, isLoading, isError } = useGetSosoTalkPostList(queryParams);
  const posts = useMemo(() => data?.data.map(mapPostToSosoTalkCardItem) ?? [], [data]);

  return {
    activeSort,
    activeTab,
    isError,
    isLoading,
    posts,
    setActiveSort,
    setActiveTab,
  };
}
