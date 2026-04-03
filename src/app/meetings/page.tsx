'use client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { MainPageCard } from '@/components/common/main-page-card';
import { MeetingCreateModal } from '@/components/common/meeting-create-modal';
import { Skeleton } from '@/components/ui/skeleton';
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
  const [viewRef, inView] = useInView({
    threshold: 0.1,
  });

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
  } = useMeetingPage(inView);

  //sort는 dateTime, registrationEnd, participantCount를 가짐

  //근데 options는 인기순, 모임일 임박순, 모집 마감 임박 순, 모집 마감 먼 순을 가짐

  //근데 vlaue===sort value === options 즉 sort === options임
  //sortBy는 dateTime, registrationEnd, participantCount
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

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
          {status === 'pending' ? (
            <div className="grid grid-cols-1 justify-center gap-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6.75">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={`meeting-skeleton-${index}`}
                  className="h-105 w-full max-w-90 overflow-hidden rounded-2xl border border-[#F3F4F6] bg-white"
                >
                  <Skeleton className="h-45 w-full rounded-none" />
                  <div className="flex flex-col gap-3 p-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-5 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-7 flex-1 rounded-full" />
                      <Skeleton className="h-7 w-24 rounded-full" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                    <div className="mt-1 flex items-center gap-2 border-t border-[#F9FAFB] pt-3">
                      <Skeleton className="size-8 rounded-full" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : status === 'error' ? (
            <div className="flex min-h-80 w-full items-center justify-center rounded-2xl border border-[#F3F4F6] bg-white px-6 py-12 text-center">
              {' '}
              <div className="flex flex-col items-center gap-2">
                {' '}
                <p className="text-sosoeat-gray-900 text-lg font-semibold">
                  {' '}
                  모임 목록을 불러오지 못했어요.{' '}
                </p>{' '}
                <p className="text-sosoeat-gray-600 text-sm">
                  {' '}
                  잠시 후 다시 시도해 주세요. 문제가 계속되면 필터를 변경하거나 페이지를 새로고침해
                  주세요.{' '}
                </p>{' '}
              </div>{' '}
            </div>
          ) : status === 'success' ? (
            <div
              ref={viewRef}
              className="grid grid-cols-1 justify-center gap-1 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6.75"
            >
              {meetingList &&
                meetingList.pages
                  .flatMap((page) => page.data)
                  .map((meeting) => <MainPageCard key={meeting.id} meeting={meeting} />)}
            </div>
          ) : null}
          <MeetingMakeButton onClick={handleOpenCreateModal} />
        </div>
        <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
      </div>
    </div>
  );
}
