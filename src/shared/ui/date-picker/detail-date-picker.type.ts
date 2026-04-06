export type DetailDatePickerVariant = 'groupEat' | 'groupBuy';

export interface DetailDatePickerProps {
  variant?: DetailDatePickerVariant;
  valueStart: Date | null;
  valueEnd: Date | null;
  onDateChange: (params: { valueStart: Date | null; valueEnd: Date | null }) => void;
  /** 트리거 버튼에 합쳐진다 (필터 바 등 레이아웃용) */
  className?: string;
}
