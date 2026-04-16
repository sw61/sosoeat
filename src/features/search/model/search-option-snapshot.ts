import type { MeetingSortBy, MeetingSortOrder, MeetingTypeFilter } from '@/entities/meeting';

import type { ResolvedMeetingSearchOptions } from './build-meeting-search-options';

type SearchOptionSnapshot = {
  dateStart: string;
  dateEnd?: string;
  keyword?: string;
  sortBy?: MeetingSortBy;
  sortOrder?: MeetingSortOrder;
  type?: Exclude<MeetingTypeFilter, 'all'>;
};

export const buildSearchOptionSnapshot = (
  options: ResolvedMeetingSearchOptions
): SearchOptionSnapshot => ({
  dateStart: options.dateStart.toISOString(),
  dateEnd: options.dateEnd?.toISOString(),
  keyword: options.keyword,
  sortBy: options.sortBy,
  sortOrder: options.sortOrder,
  type: options.type,
});

export type { SearchOptionSnapshot };
