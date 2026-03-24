import type { RegionSelection } from '../region-select-modal/region-select-modal.type';

export type { RegionSelection };

export interface MeetingFilterBarProps {
  /** 필터 바 루트 컨테이너에 합쳐진다 */
  className?: string;
  onFilterButtonClick?: (filterType: string) => void;
  onDateChange?: (date: Date | null) => void;
  onRegionChange?: (region: RegionSelection) => void;
  regionCommitted: RegionSelection;
  date: Date | null;
}
