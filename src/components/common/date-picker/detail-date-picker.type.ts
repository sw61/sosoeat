export type DetailDatePickerVariant = 'groupEat' | 'groupBuy';

export interface DetailDatePickerProps {
  variant?: DetailDatePickerVariant;
  value: Date | null;
  onChange: (date: Date | null) => void;
  /** 트리거 버튼에 합쳐진다 (필터 바 등 레이아웃용) */
  triggerClassName?: string;
}
