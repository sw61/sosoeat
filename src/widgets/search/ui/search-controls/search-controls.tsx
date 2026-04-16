'use client';

import type { RegionSelection } from '@/entities/location';
import type { MeetingSortBy, MeetingSortOrder, MeetingTypeFilter } from '@/entities/meeting';
import { MeetingFilterBar, SearchBar } from '@/features/search';

type DateChangeParams = {
  valueStart: Date | null;
  valueEnd: Date | null;
};

type SearchControlsProps = {
  inputValue: string;
  onSearchQueryChange: (value: string) => void;
  searchError?: string;
  sortBy: NonNullable<MeetingSortBy>;
  sortOrder: NonNullable<MeetingSortOrder>;
  regionCommitted: RegionSelection;
  dateStart: Date | null;
  dateEnd: Date | null;
  typeFilter: NonNullable<MeetingTypeFilter>;
  onTypeFilterChange: (value: NonNullable<MeetingTypeFilter>) => void;
  onDateChange: (params: DateChangeParams) => void;
  onRegionChange: (value: RegionSelection) => void;
  onSortChange: (
    nextSortBy: NonNullable<MeetingSortBy>,
    nextSortOrder: NonNullable<MeetingSortOrder>
  ) => void;
};

export function SearchControls({
  inputValue,
  onSearchQueryChange,
  searchError,
  sortBy,
  sortOrder,
  regionCommitted,
  dateStart,
  dateEnd,
  typeFilter,
  onTypeFilterChange,
  onDateChange,
  onRegionChange,
  onSortChange,
}: SearchControlsProps) {
  return (
    <>
      <SearchBar onChange={onSearchQueryChange} value={inputValue} error={searchError} />
      <MeetingFilterBar
        sortBy={sortBy}
        sortOrder={sortOrder}
        regionCommitted={regionCommitted}
        dateStart={dateStart}
        dateEnd={dateEnd}
        typeFilter={typeFilter}
        onTypeFilterChange={onTypeFilterChange}
        onDateChange={onDateChange}
        onRegionChange={onRegionChange}
        onSortChange={onSortChange}
      />
    </>
  );
}
