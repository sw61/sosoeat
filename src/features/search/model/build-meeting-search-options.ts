import type { RegionSelection } from '@/entities/location';
import type {
  MeetingSearchOptions,
  MeetingSortBy,
  MeetingSortOrder,
  MeetingTypeFilter,
} from '@/entities/meeting';

const MEETINGS_PAGE_SIZE = 10;

type ResolvedMeetingSearchOptions = MeetingSearchOptions & {
  dateStart: Date;
  type?: Exclude<MeetingTypeFilter, 'all'>;
};

type BuildMeetingSearchOptionsParams = {
  regionCommitted: RegionSelection;
  dateStart: Date | null;
  dateEnd: Date | null;
  defaultDateStartIso: string;
  typeFilter: MeetingTypeFilter;
  sortBy: MeetingSortBy | null;
  sortOrder: MeetingSortOrder | null;
  searchQuery: string;
};

const resolveRegion = (regionCommitted: RegionSelection) => {
  if (regionCommitted == null || regionCommitted.length === 0) {
    return undefined;
  }

  if (regionCommitted.length === 1) {
    return `${regionCommitted[0].province} ${regionCommitted[0].district}`;
  }

  return regionCommitted.map((region) => `${region.province} ${region.district}`);
};

const resolveDateEnd = (dateEnd: Date | null) => {
  if (dateEnd == null) {
    return undefined;
  }

  return new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1);
};

const resolveType = (typeFilter: MeetingTypeFilter) => {
  if (typeFilter === 'all' || typeFilter == null) {
    return undefined;
  }

  return typeFilter as Exclude<MeetingTypeFilter, 'all'>;
};

const resolveKeyword = (searchQuery: string) => {
  return searchQuery === '' ? undefined : searchQuery;
};

export const buildMeetingSearchOptions = ({
  regionCommitted,
  dateStart,
  dateEnd,
  defaultDateStartIso,
  typeFilter,
  sortBy,
  sortOrder,
  searchQuery,
}: BuildMeetingSearchOptionsParams): ResolvedMeetingSearchOptions => ({
  size: MEETINGS_PAGE_SIZE,
  region: resolveRegion(regionCommitted),
  dateStart: dateStart ?? new Date(defaultDateStartIso),
  dateEnd: resolveDateEnd(dateEnd),
  type: resolveType(typeFilter),
  sortBy: sortBy ?? undefined,
  sortOrder: sortOrder ?? undefined,
  keyword: resolveKeyword(searchQuery),
});

export type { BuildMeetingSearchOptionsParams, ResolvedMeetingSearchOptions };
