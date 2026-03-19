import type { DateRange } from 'react-day-picker';

export type DetailDatePickerVariant = 'groupEat' | 'groupBuy';

export interface DetailDatePickerProps {
  variant?: DetailDatePickerVariant;
  value: DateRange | null;
  onChange: (range: DateRange | null) => void;
}
