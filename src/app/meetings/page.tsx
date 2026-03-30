'use client';

import { MainPageCard } from '@/components/common/main-page-card';
import { MeetingCreateModal } from '@/components/common/meeting-create-modal';
import { useModal } from '@/hooks/use-modal';
import { useCreateMeeting } from '@/services/meetings';

import { MeetingFilterBar } from './_components/meeting-filter-bar';
import { MeetingMakeButton } from './_components/meeting-make-button.tsx';
import { MeetingSearchBanner } from './_components/meeting-search-banner';
import useMeetingPage from './usehooks/use-meeting-page';

export default function MeetingsPage() {
  const { isOpen, open, close } = useModal();
  const { mutateAsync: createMeeting } = useCreateMeeting();

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

  //sort는 dateTime, registrationEnd, participantCount를 가짐

  //근데 options는 인기순, 모임일 임박순, 모집 마감 임박 순, 모집 마감 먼 순을 가짐

  //근데 vlaue===sort value === options 즉 sort === options임
  //sortBy는 dateTime, registrationEnd, participantCount
  return (
    <div className="mx-auto flex max-w-[1140px] flex-col justify-center gap-4 sm:px-4">
      <MeetingSearchBanner
        alt="모임 배너"
        imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80"
        titleContent={
          <span>
            함께하면
            <br />더 맛있어요
          </span>
        }
        subtitleContent={
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
          sort={sort}
        />
        <div className="grid grid-cols-1 justify-center gap-1 md:grid-cols-2 md:gap-[20px] lg:grid-cols-3 lg:gap-[27px]">
          {meetingData.map((meeting) => (
            <MainPageCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
        <MeetingMakeButton onClick={open} />
      </div>
      <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
    </div>
  );
}
