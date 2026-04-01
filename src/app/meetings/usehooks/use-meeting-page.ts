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

const toExclusiveDateEnd = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

const useMeetingPage = () => {
  const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
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
    dateStart: dateStart == null ? undefined : dateStart,
    dateEnd: dateEnd == null ? undefined : toExclusiveDateEnd(dateEnd),
    sortBy: sort === 'participantCount' ? undefined : sort,
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
    setSort(sortBy);
    setSortOrder(sortOrder);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMeetingByFilter(options);
      setMeetingData(data.data);
    };
    fetchData();
  }, [regionCommitted, dateStart, dateEnd, typeFilter, sort, sortOrder]);
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
    sort,
  };
};

export default useMeetingPage;
