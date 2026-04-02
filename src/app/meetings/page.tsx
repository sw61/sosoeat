'use client';
import { MainPageCard } from '@/components/common/main-page-card';
import { MeetingCreateModal } from '@/components/common/meeting-create-modal';
import { useModal } from '@/hooks/use-modal';
import { useCreateMeeting } from '@/services/meetings';
import { useAuthStore } from '@/store/auth-store';

import { EmptyPage } from './_components/empty-page';
import { MeetingFilterBar } from './_components/meeting-filter-bar';
import { MeetingMakeButton } from './_components/meeting-make-button';
import { MeetingSearchBanner } from './_components/meeting-search-banner';
import useMeetingPage from './usehooks/use-meeting-page';

export default function MeetingsPage() {
  const { isOpen, open, close } = useModal();
  const { mutateAsync: createMeeting } = useCreateMeeting();
  const { isAuthenticated, setLoginRequired } = useAuthStore();

  const handleOpenCreateModal = () => {
    if (!isAuthenticated) {
      setLoginRequired(true);
      return;
    }
    open();
  };

  const {
    regionCommitted,
    handleRegionChange,
    dateStart,
    dateEnd,
    meetingData,
    handleDateChange,
    handleTypeFilterChange,
    typeFilter,
    handleSortChange,
    sortBy,
    sortOrder,
  } = useMeetingPage();

  //sort는 dateTime, registrationEnd, participantCount를 가짐

  //근데 options는 인기순, 모임일 임박순, 모집 마감 임박 순, 모집 마감 먼 순을 가짐

  //근데 vlaue===sort value === options 즉 sort === options임
  //sortBy는 dateTime, registrationEnd, participantCount
  return (
    <div className="bg-sosoeat-gray-100">
      <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-center gap-4 sm:px-4">
        <MeetingSearchBanner />
        <div className="flex w-full flex-col gap-4 px-4 sm:px-0">
          <MeetingFilterBar
            sortBy={sortBy}
            sortOrder={sortOrder}
            regionCommitted={regionCommitted}
            dateStart={dateStart}
            dateEnd={dateEnd}
            typeFilter={typeFilter}
            onTypeFilterChange={handleTypeFilterChange}
            onDateChange={handleDateChange}
            onRegionChange={handleRegionChange}
            onSortChange={handleSortChange}
          />
          {!meetingData || meetingData.length === 0 ? (
            <EmptyPage />
          ) : (
            <div className="grid grid-cols-1 justify-center gap-1 md:grid-cols-2 md:gap-[20px] lg:grid-cols-3 lg:gap-[27px]">
              {meetingData.map((meeting) => (
                <MainPageCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          )}
          <MeetingMakeButton onClick={handleOpenCreateModal} />
        </div>
        <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
      </div>
    </div>
  );
}
