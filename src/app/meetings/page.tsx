'use client';

import { useEffect, useState } from 'react';

import { MainPageCard } from '@/components/common/main-page-card';
import { MeetingsApi } from '@/types/generated-client/apis/MeetingsApi';
import type { MeetingWithHost } from '@/types/generated-client/models/MeetingWithHost';
import type { Meeting } from '@/types/meeting/meeting.type';

import { MeetingFilterBar } from './_components/meeting-filter-bar';
import type { RegionSelection } from './_components/region-select-modal';

export default function MeetingsPage() {
  const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
  const [date, setDate] = useState<Date | null>(null);

  const [meetingData, setMeetingData] = useState<Meeting[]>([]);

  useEffect(() => {
    const toMeeting = (meeting: MeetingWithHost): Meeting => ({
      ...meeting,
      dateTime: meeting.dateTime.toISOString(),
      registrationEnd: meeting.registrationEnd.toISOString(),
      canceledAt: meeting.canceledAt ? meeting.canceledAt.toISOString() : null,
      confirmedAt: meeting.confirmedAt ? meeting.confirmedAt.toISOString() : null,
      createdAt: meeting.createdAt.toISOString(),
      updatedAt: meeting.updatedAt.toISOString(),
      host: {
        id: meeting.host.id,
        name: meeting.host.name,
        image: meeting.host.image,
      },
      variant: meeting.type === 'groupEat' ? 'groupEat' : 'groupBuy',
      isFavorited: false,
    });

    const fetchData = async () => {
      const data = (await new MeetingsApi().teamIdMeetingsGet({ teamId: 'sosoeattest', size: 10 }))
        .data;
      setMeetingData(data.map(toMeeting));
      console.log(data);
    };

    fetchData();
  }, [regionCommitted, date]);

  return (
    <div>
      <MeetingFilterBar
        regionCommitted={regionCommitted}
        date={date}
        onDateChange={setDate}
        onRegionChange={setRegionCommitted}
      />
      {meetingData.map((meeting) => (
        <MainPageCard key={meeting.id} {...meeting} />
      ))}
    </div>
  );
}
