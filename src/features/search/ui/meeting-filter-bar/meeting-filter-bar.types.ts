import { RegionSelection } from '@/entities/location';
import { MeetingSortBy, MeetingSortOrder, MeetingTypeFilter } from '@/entities/meeting';

export interface MeetingFilterBarProps {
  /** 필터 바 루트 컨테이너에 합쳐진다 */
  className?: string;
  onTypeFilterChange?: (typeFilter: MeetingTypeFilter) => void;
  onFilterButtonClick?: (filterType: string) => void;
  onDateChange?: (params: { valueStart: Date | null; valueEnd: Date | null }) => void;
  onRegionChange?: (region: RegionSelection) => void;
  onSortChange?: (
    sortBy: NonNullable<MeetingSortBy>,
    sortOrder: NonNullable<MeetingSortOrder>
  ) => void;
  sortBy: MeetingSortBy;
  sortOrder: MeetingSortOrder;
  regionCommitted: RegionSelection;
  typeFilter: MeetingTypeFilter;
  dateStart: Date | null;
  dateEnd: Date | null;
}
