import { useState } from 'react';

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { startOfDay } from 'date-fns';

import { meetingsQueryOptions } from '@/services/meetings/meetings.options';
import { MeetingList, TeamIdMeetingsGetRequest } from '@/types/generated-client';

import { MeetingFilterBarProps } from '../_components/meeting-filter-bar';
import { RegionSelection } from '../_components/region-select-modal';

type DateChangeParams = {
  valueStart: Date | null;
  valueEnd: Date | null;
};

const useMeetingPage = (inView: boolean) => {
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
    size: 5,
    //type unfind이면 전체 보냄
    type: typeFilter === 'all' ? undefined : typeFilter,
    region,
    dateStart: dateStart == null ? undefined : dateStart,
    dateEnd: dateEndExclusiveIso == null ? undefined : new Date(dateEndExclusiveIso),
    sortBy: sortBy,
    sortOrder: sortOrder,
  };
  const {
    data: meetingList,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(meetingsQueryOptions.infiniteOptions(options));

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
    data: meetingList,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useMeetingPage;
