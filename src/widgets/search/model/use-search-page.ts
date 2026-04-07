'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { startOfDay } from 'date-fns';

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
  const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [typeFilter, setTypeFilter] = useState<'all' | 'groupEat' | 'groupBuy'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<MeetingFilterBarProps['sortBy']>('participantCount');

  const region =
    regionCommitted == null ? undefined : `${regionCommitted.district} ${regionCommitted.province}`;
  const dateEndExclusiveIso =
    dateEnd == null
      ? undefined
      : new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1).toISOString();

  const options: Omit<TeamIdMeetingsGetRequest, 'teamId'> = {
    size: MEETINGS_PAGE_SIZE,
    type: typeFilter === 'all' ? undefined : typeFilter,
    region,
    dateStart: dateStart == null ? undefined : dateStart,
    dateEnd: dateEndExclusiveIso == null ? undefined : new Date(dateEndExclusiveIso),
    sortBy: sortBy,
    sortOrder: sortOrder,
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
