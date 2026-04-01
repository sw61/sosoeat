import { useEffect, useState } from 'react';

import { startOfDay } from 'date-fns';

import { MeetingWithHost, TeamIdMeetingsGetRequest } from '@/types/generated-client';

import { MeetingFilterBarProps } from '../_components/meeting-filter-bar';
import { RegionSelection } from '../_components/region-select-modal';
import { fetchMeetingByFilter } from '../repositories/api/fetch-meeting-by-filter';

type DateChangeParams = {
  valueStart: Date | null;
  valueEnd: Date | null;
};

const useMeetingPage = () => {
  const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [meetingData, setMeetingData] = useState<MeetingWithHost[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'groupEat' | 'groupBuy'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortBy, setSortBy] = useState<MeetingFilterBarProps['sortBy']>('participantCount');

  const options: Omit<TeamIdMeetingsGetRequest, 'teamId'> = {
    size: 10,
    //type unfind이면 전체 보냄
    type: typeFilter === 'all' ? undefined : typeFilter,
    region:
      regionCommitted == null
        ? undefined
        : regionCommitted.district + ' ' + regionCommitted.province,
    dateStart: dateStart == null ? undefined : dateStart,
    dateEnd:
      dateEnd == null
        ? undefined
        : new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1),
    sortBy: sortBy,
    sortOrder: sortOrder,
  };

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMeetingByFilter(options);
      setMeetingData(data.data);
    };
    fetchData();
  }, [regionCommitted, dateStart, dateEnd, typeFilter, sortBy, sortOrder]);
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
  };
};

export default useMeetingPage;
