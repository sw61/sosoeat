'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { MainPageCard } from '@/entities/meeting';
import type { getMeetings } from '@/entities/meeting/index.server';
import { HeartButton } from '@/features/favorites';
import {
  MeetingCreateModal,
  MeetingMakeButton,
  useMeetingCreateTrigger,
} from '@/features/meeting-create';

import useSearchPage from '../../model/use-search-page';
import { EmptyPage } from '../empty-page';
import { MeetingFilterBar } from '../meeting-filter-bar';
import { SearchBar } from '../search-bar';

import SearchSkeleton from './search-skeleton';

export default function SearchPage({
  initialData,
}: {
  initialData: Awaited<ReturnType<typeof getMeetings>> | null;
}) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    root: null,
  });

  const { handleOpen, isOpen, close, createMeeting } = useMeetingCreateTrigger();

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
    isLoading,
    isError,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    inputValue,
    handleSearchQueryChange,
  } = useSearchPage(initialData);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mx-auto flex max-w-[1140px] flex-col items-center justify-center gap-4 md:px-4 md:pt-4">
      <div className="flex w-full flex-col gap-4 px-4 md:px-0">
        <SearchBar onChange={handleSearchQueryChange} value={inputValue} />
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
        {isLoading ? (
          <SearchSkeleton />
        ) : isError ? (
          <div className="flex min-h-80 w-full items-center justify-center rounded-2xl border border-[#F3F4F6] bg-white px-6 py-12 text-center">
            <div className="flex flex-col items-center gap-2">
              <p className="text-sosoeat-gray-900 text-lg font-semibold">
                모임 목록을 불러오지 못했어요.
              </p>
              <p className="text-sosoeat-gray-600 text-sm">
                잠시 후 다시 시도해 주세요. 문제가 계속되면 필터를 변경하거나 페이지를 새로고침해
                주세요.
              </p>
            </div>
          </div>
        ) : meetingData.length === 0 ? (
          <EmptyPage />
        ) : (
          <div className="grid grid-cols-1 justify-center justify-items-center gap-4 min-[768px]:grid-cols-2 min-[768px]:gap-5 min-[1140px]:grid-cols-3 min-[1140px]:gap-6.75">
            {meetingData.map((meeting) => (
              <MainPageCard
                key={meeting.id}
                meeting={meeting}
                renderFavoriteButton={(id, isFavorited) => (
                  <HeartButton meetingId={id} isFavorited={isFavorited} size="md" />
                )}
              />
            ))}
            <div ref={ref} className="col-span-full flex h-1 items-center justify-center" />
          </div>
        )}
        {isFetching ? (
          <span className="text-sosoeat-gray-600 col-span-full flex justify-center">
            Loading...
          </span>
        ) : inView && hasNextPage ? (
          <SearchSkeleton />
        ) : (
          !hasNextPage &&
          meetingData.length !== 0 && (
            <span className="text-sosoeat-gray-600 col-span-full flex justify-center">
              더 이상 모임이 없습니다.
            </span>
          )
        )}
        <MeetingMakeButton onClick={handleOpen} />
      </div>
      <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
    </div>
  );
}
