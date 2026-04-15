'use client';

import { useEffect, useMemo, useState } from 'react';

import { startOfDay, startOfMinute } from 'date-fns';
import {
  parseAsIsoDate,
  parseAsJson,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from 'nuqs';

import type { RegionSelection } from '@/entities/location';
import type {
  MeetingListResult,
  MeetingSortBy,
  MeetingSortOrder,
  MeetingTypeFilter,
} from '@/entities/meeting';

import { buildMeetingSearchOptions } from './build-meeting-search-options';
import { buildSearchOptionSnapshot } from './search-option-snapshot';
import { shouldReuseInitialSearchData } from './should-reuse-initial-search-data';
import { useSearchMeetingList } from './use-search-meeting-list';

type DateChangeParams = {
  valueStart: Date | null;
  valueEnd: Date | null;
};
const getDefaultSearchDateStartIso = (now = new Date()) => startOfMinute(now).toISOString();

const useSearchState = (
  initialData: MeetingListResult | null,
  initialDefaultDateStartIso?: string
) => {
  const [defaultDateStartIso] = useState(
    () => initialDefaultDateStartIso ?? getDefaultSearchDateStartIso()
  );

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
  const [typeFilter, setTypeFilter] = useQueryState<NonNullable<MeetingTypeFilter>>(
    'typeFilter',
    parseAsStringLiteral(['all', 'groupEat', 'groupBuy'] as const)
      .withDefault('all')
      .withOptions({ history: 'push' })
  );
  const [sortOrder, setSortOrder] = useQueryState<NonNullable<MeetingSortOrder>>(
    'sortOrder',
    parseAsStringLiteral(['asc', 'desc'] as const)
      .withDefault('asc')
      .withOptions({ history: 'push' })
  );

  const [sortBy, setSortBy] = useQueryState<NonNullable<MeetingSortBy>>(
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

  const options = buildMeetingSearchOptions({
    regionCommitted,
    dateStart,
    dateEnd,
    defaultDateStartIso,
    typeFilter,
    sortBy,
    sortOrder,
    searchQuery,
  });

  const currentOptionSnapshot = buildSearchOptionSnapshot(options);
  const [initialOptionSnapshot] = useState(() => currentOptionSnapshot);
  const shouldUseInitialData = shouldReuseInitialSearchData({
    initialData,
    initialOptionSnapshot,
    currentOptionSnapshot,
    region: options.region,
  });

  const {
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    meetingData,
  } = useSearchMeetingList({
    options,
    initialData,
    shouldUseInitialData,
  });
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearchQueryChange = (e: string) => {
    setInputValue(e);
  };
  const searchError = inputValue.trim().length === 1 ? '2글자 이상 입력해주세요' : undefined;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmedValue = inputValue.trim();
      if (trimmedValue === '' || trimmedValue.length > 1) {
        setSearchQuery(trimmedValue);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
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

  const isSearchPending = inputValue !== searchQuery && inputValue !== '';

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
    isSearchPending,
    searchError,
  };
};

export default useSearchState;
