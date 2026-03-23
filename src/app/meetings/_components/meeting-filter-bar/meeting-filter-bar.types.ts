import { DateRange } from 'react-day-picker';

export interface MeetingFilterBarProps {
  /** 필터 바 루트 컨테이너에 합쳐진다 */
  className?: string;
  onFilterButtonClick?: (filterType: string) => void;
  onDateChange?: (date: DateRange | null) => void;
  onRegionChange?: (region: Record<string, string>) => void;
  regionCommitted: Record<string, string>;
  date: DateRange | null;
}
