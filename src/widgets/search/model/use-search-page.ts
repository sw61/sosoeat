'use client';

import { useEffect, useState } from 'react';

import { startOfDay } from 'date-fns';
import {
  parseAsIsoDate,
  parseAsJson,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';

import { useSearchInfiniteOption } from '@/entities/meeting';
import type { getMeetings } from '@/entities/meeting/index.server';
import type { TeamIdMeetingsGetRequest } from '@/shared/types/generated-client';

import type { MeetingFilterBarProps } from '../ui/meeting-filter-bar';
import type { RegionSelection } from '../ui/region-select-modal';

import { useSearchInfiniteOptions } from './use-search-infinite-options';

type DateChangeParams = {
  valueStart: Date | null;
  valueEnd: Date | null;
};

const MEETINGS_PAGE_SIZE = 10;

const useSearchPage = (initialData: Awaited<ReturnType<typeof getMeetings>> | null) => {
  const [regionCommitted, setRegionCommitted] = useQueryState<RegionSelection>(
    'regionCommitted',
    parseAsJson<RegionSelection>((value) => {
      if (Array.isArray(value)) {
        if (
          value.every(
            (item) =>
              item !== null && typeof item === 'object' && 'province' in item && 'district' in item
          )
        ) {
          return value as RegionSelection;
        }
        return null;
      }
      if (
        value !== null &&
        typeof value === 'object' &&
        'province' in value &&
        'district' in value
      ) {
        return [value] as RegionSelection;
      }
      return null;
    }).withOptions({ history: 'push' })
  );

  const [dateStart, setDateStart] = useQueryState<Date>(
    'dateStart',
    parseAsIsoDate.withOptions({ history: 'push' })
  );
  const [dateEnd, setDateEnd] = useQueryState<Date>(
    'dateEnd',
    parseAsIsoDate.withOptions({ history: 'push' })
  );
  const [typeFilter, setTypeFilter] = useQueryState<'all' | 'groupEat' | 'groupBuy'>(
    'typeFilter',
    parseAsStringLiteral(['all', 'groupEat', 'groupBuy'] as const)
      .withDefault('all')
      .withOptions({ history: 'push' })
  );
  const [sortOrder, setSortOrder] = useQueryState<'asc' | 'desc'>(
    'sortOrder',
    parseAsStringLiteral(['asc', 'desc'] as const)
      .withDefault('asc')
      .withOptions({ history: 'push' })
  );

  const [sortBy, setSortBy] = useQueryState<MeetingFilterBarProps['sortBy']>(
    'sortBy',
    parseAsStringLiteral(['participantCount', 'dateTime', 'registrationEnd'] as const)
      .withDefault('dateTime')
      .withOptions({
        history: 'push',
      })
  );

  const [searchQuery, setSearchQuery] = useQueryState<string>(
    'search',
    parseAsString.withDefault('').withOptions({ history: 'push' })
  );

  const region =
    regionCommitted == null || regionCommitted.length === 0
      ? undefined
      : regionCommitted.length === 1
        ? `${regionCommitted[0].province} ${regionCommitted[0].district}`
        : regionCommitted.map((r) => `${r.province} ${r.district}`);
  const dateEndExclusiveIso =
    dateEnd == null
      ? undefined
      : new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1).toISOString();

  const options: Omit<TeamIdMeetingsGetRequest, 'teamId' | 'region'> & {
    region?: string | string[];
  } = {
    size: MEETINGS_PAGE_SIZE,
    type:
      typeFilter === 'all' || typeFilter == null
        ? undefined
        : (typeFilter as 'groupEat' | 'groupBuy'),
    region,
    dateStart: dateStart ?? new Date(),
    dateEnd: dateEndExclusiveIso == null ? undefined : new Date(dateEndExclusiveIso),
    sortBy:
      sortBy === null ? undefined : (sortBy as 'participantCount' | 'dateTime' | 'registrationEnd'),
    sortOrder: sortOrder === null ? undefined : (sortOrder as 'asc' | 'desc'),
    keyword: searchQuery === '' ? undefined : searchQuery,
  };

  const isMulti = Array.isArray(options.region) && options.region.length > 1;

  const singleResult = useSearchInfiniteOption(
    options as Omit<TeamIdMeetingsGetRequest, 'teamId'>,
    initialData ?? undefined
  );
  const multiResult = useSearchInfiniteOptions(options);

  const {
    data: meetingList,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = isMulti ? multiResult : singleResult;

  const meetingData = meetingList?.pages.flatMap((page) => page.data) ?? [];
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearchQueryChange = (e: string) => {
    setInputValue(e);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (inputValue !== searchQuery) {
        setSearchQuery(inputValue);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);

    // debounce 효과를 위해 searchQuery 의존성에서 제외 (불필요한 재실행 방지)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, setSearchQuery]);

  const handleTypeFilterChange = (value: 'all' | 'groupEat' | 'groupBuy') => {
    setTypeFilter(value);
  };

  const handleRegionChange = (value: RegionSelection) => {
    setRegionCommitted(value);
  };

  const handleDateChange = ({ valueStart, valueEnd }: DateChangeParams) => {
    if (!valueStart && !valueEnd) {
      setDateStart(null);
      setDateEnd(null);
      return;
    }

    if (valueStart) {
      setDateStart(startOfDay(valueStart));
      setDateEnd(valueEnd ?? valueStart);
      return;
    }

    setDateStart(startOfDay(valueEnd!));
    setDateEnd(valueEnd);
  };

  const handleSortChange = (
    sortBy: 'participantCount' | 'dateTime' | 'registrationEnd',
    sortOrder: 'asc' | 'desc'
  ) => {
    setSortBy(sortBy);
    setSortOrder(sortOrder);
  };

  return {
    meetingData,
    handleRegionChange,
    regionCommitted,
    dateStart,
    dateEnd,
    handleDateChange,
    handleTypeFilterChange,
    typeFilter,
    handleSortChange,
    sortBy,
    sortOrder,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    inputValue,
    handleSearchQueryChange,
  };
};

export default useSearchPage;
