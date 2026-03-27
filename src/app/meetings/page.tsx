'use client';

import { Footer } from '@/components/common/footer';
import { MainPageCard } from '@/components/common/main-page-card';
import { NavigationBar } from '@/components/common/navigation-bar';

import { MeetingDetailBanner } from './_components/meeting-detail-banner';
import { MeetingFilterBar, MeetingFilterBarProps } from './_components/meeting-filter-bar';
import { MeetingMakeButton } from './_components/meeting-make-button.tsx';
import useMeetingPage from './usehooks/use-meeting-page';

export default function MeetingsPage() {
  const {
    regionCommitted,
    handleRegionChange,
    date,
    handleDateChange,
    meetingData,
    handleTypeFilterChange,
    typeFilter,
    handleSortChange,
    sort,
  } = useMeetingPage();

  const options: MeetingFilterBarProps['options'] = [
    { label: '인기순', sortBy: 'participantCount', sortOrder: 'desc' },
    { label: '모임일 임박순', sortBy: 'dateTime', sortOrder: 'asc' },
    { label: '모집 마감 임박 순', sortBy: 'registrationEnd', sortOrder: 'asc' },
    { label: '모집 마감 먼 순', sortBy: 'registrationEnd', sortOrder: 'desc' },
  ];

  //sort는 dateTime, registrationEnd, participantCount를 가짐

  //근데 options는 인기순, 모임일 임박순, 모집 마감 임박 순, 모집 마감 먼 순을 가짐

  //근데 vlaue===sort value === options 즉 sort === options임

  return (
    <div className="mx-auto flex max-w-[1140px] flex-col justify-center gap-4 sm:px-4">
      <NavigationBar />
      <MeetingDetailBanner
        alt="모임 배너"
        imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
        titleContent={
          <span>
            함께하면
            <br />더 맛있어요
          </span>
        }
        subtitle={
          <p>가고 싶었던 맛집, 혼자 가기 아쉬웠죠? 모여요에서 같이 먹을 사람을 찾아보세요.</p>
        }
      />
      <div className="flex flex-col gap-4 px-4 sm:px-0">
        <MeetingFilterBar
          regionCommitted={regionCommitted}
          date={date}
          typeFilter={typeFilter}
          onTypeFilterChange={handleTypeFilterChange}
          onDateChange={handleDateChange}
          onRegionChange={handleRegionChange}
          onSortChange={handleSortChange}
          options={options}
          sort={sort}
        />
        <div className="grid grid-cols-1 justify-center gap-1 md:grid-cols-2 md:gap-[20px] lg:grid-cols-3 lg:gap-[27px]">
          {meetingData.map((meeting) => (
            <MainPageCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
        <MeetingMakeButton onClick={() => {}} />
      </div>
      <Footer />
    </div>
  );
}
