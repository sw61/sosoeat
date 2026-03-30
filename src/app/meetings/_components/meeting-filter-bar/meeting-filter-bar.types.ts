import type { RegionSelection } from '../region-select-modal/region-select-modal.types';

export type { RegionSelection };

export interface MeetingFilterBarProps {
  /** 필터 바 루트 컨테이너에 합쳐진다 */
  className?: string;
  onTypeFilterChange?: (typeFilter: 'all' | 'groupEat' | 'groupBuy') => void;
  onFilterButtonClick?: (filterType: string) => void;
  onDateChange?: (date: Date | null) => void;
  onRegionChange?: (region: RegionSelection) => void;
  onSortChange?: (
    sortBy: 'participantCount' | 'dateTime' | 'registrationEnd',
    sortOrder: 'asc' | 'desc'
  ) => void;
  sort: 'participantCount' | 'dateTime' | 'registrationEnd';
  regionCommitted: RegionSelection;
  typeFilter: 'all' | 'groupEat' | 'groupBuy';
  date: Date | null;
}
