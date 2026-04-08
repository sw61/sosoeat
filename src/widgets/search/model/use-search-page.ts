'use client';

import { useQuery } from '@tanstack/react-query';
import { startOfDay } from 'date-fns';
import { parseAsIsoDate, parseAsJson, parseAsStringLiteral, useQueryState } from 'nuqs';

import { meetingsQueryOptions } from '@/entities/meeting';
import type { MeetingList, TeamIdMeetingsGetRequest } from '@/shared/types/generated-client';

import type { MeetingFilterBarProps } from '../ui/meeting-filter-bar';
import type { RegionSelection } from '../ui/region-select-modal';

type DateChangeParams = {
  valueStart: Date | null;
  valueEnd: Date | null;
};

const MEETINGS_PAGE_SIZE = 10;

const useSearchPage = () => {
  const [regionCommitted, setRegionCommitted] = useQueryState<RegionSelection>(
    'regionCommitted',
    parseAsJson<RegionSelection>((value) => {
      if (
        value !== null &&
        typeof value === 'object' &&
        'province' in value &&
        'district' in value
      ) {
        return value as RegionSelection;
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

  const region =
    regionCommitted == null ? undefined : `${regionCommitted.district} ${regionCommitted.province}`;
  const dateEndExclusiveIso =
    dateEnd == null
      ? undefined
      : new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1).toISOString();

  const options: Omit<TeamIdMeetingsGetRequest, 'teamId'> = {
    size: MEETINGS_PAGE_SIZE,
    type:
      typeFilter === 'all' || typeFilter == null
        ? undefined
        : (typeFilter as 'groupEat' | 'groupBuy'),
    region,
    dateStart: dateStart ?? undefined,
    dateEnd: dateEndExclusiveIso == null ? undefined : new Date(dateEndExclusiveIso),
    sortBy:
      sortBy === null ? undefined : (sortBy as 'participantCount' | 'dateTime' | 'registrationEnd'),
    sortOrder: sortOrder === null ? undefined : (sortOrder as 'asc' | 'desc'),
  };
  const {
    data: meetingList,
    isLoading,
    isError,
  } = useQuery<MeetingList>(meetingsQueryOptions.options(options));
  const meetingData = meetingList?.data ?? [];

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
  };
};

export default useSearchPage;
