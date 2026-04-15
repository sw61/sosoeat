'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import type { getMeetings } from '@/entities/meeting/index.server';
import {
  MeetingCreateModal,
  MeetingMakeButton,
  useMeetingCreateTrigger,
} from '@/features/meeting-create';
import { useSearchState } from '@/features/search';

import { SearchControls } from '../search-controls/search-controls';
import { SearchResults } from '../search-results/search-results';

export function SearchScreen({
  initialData,
  initialDefaultDateStartIso,
}: {
  initialData: Awaited<ReturnType<typeof getMeetings>> | null;
  initialDefaultDateStartIso?: string;
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
    isFetchingNextPage,
    fetchNextPage,
    inputValue,
    handleSearchQueryChange,
    searchError,
  } = useSearchState(initialData, initialDefaultDateStartIso);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="w-full max-w-[1140px]">
      <div className="flex w-full flex-col gap-4 px-4 md:px-0">
        <SearchControls
          inputValue={inputValue}
          onSearchQueryChange={handleSearchQueryChange}
          searchError={searchError}
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
        <SearchResults
          meetingData={meetingData}
          isLoading={isLoading}
          isError={isError}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          resultsRef={ref}
        />
        <MeetingMakeButton onClick={handleOpen} />
      </div>
      <MeetingCreateModal open={isOpen} onClose={close} onSubmit={createMeeting} />
    </div>
  );
}
