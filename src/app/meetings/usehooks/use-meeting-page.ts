import { useEffect, useState } from 'react';

import { format } from 'date-fns';

import { MeetingWithHost, TeamIdMeetingsGetRequest } from '@/types/generated-client';

import { MeetingFilterBarProps } from '../_components/meeting-filter-bar';
import { RegionSelection } from '../_components/region-select-modal';
import { fetchMeetingByFilter } from '../repositories/api/fetch-meeting-by-filter';

const useMeetingPage = () => {
  const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [meetingData, setMeetingData] = useState<MeetingWithHost[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'groupEat' | 'groupBuy'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sort, setSort] = useState<MeetingFilterBarProps['sort']>('participantCount');

  const options: TeamIdMeetingsGetRequest = {
    teamId: 'sosoeattest',
    size: 10,
    //type unfind이면 전체 보냄
    type: typeFilter === 'all' ? undefined : typeFilter,
    region:
      regionCommitted == null
        ? undefined
        : regionCommitted.district + ' ' + regionCommitted.province,
    date: date == null ? undefined : date,
    sortBy: sort === 'participantCount' ? undefined : sort,
    sortOrder: sortOrder,
  };

  const handleTypeFilterChange = (value: 'all' | 'groupEat' | 'groupBuy') => {
    setTypeFilter(value);
  };

  const handleDateChange = (value: Date | null) => {
    const formattedDate = value ? format(value, 'yyyy-MM-dd') : undefined;
    setDate(formattedDate ? new Date(formattedDate) : null);
  };

  const handleRegionChange = (value: RegionSelection) => {
    setRegionCommitted(value);
  };

  const handleSortChange = (
    sortBy: 'participantCount' | 'dateTime' | 'registrationEnd',
    sortOrder: 'asc' | 'desc'
  ) => {
    setSort(sortBy);
    setSortOrder(sortOrder);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMeetingByFilter(options);
      setMeetingData(data.data);
    };
    fetchData();
  }, [regionCommitted, date, typeFilter, sort, sortOrder]);

  return {
    meetingData,
    handleRegionChange,
    regionCommitted,
    date,
    handleDateChange,
    handleTypeFilterChange,
    typeFilter,
    handleSortChange,
    sort,
  };
};

export default useMeetingPage;
