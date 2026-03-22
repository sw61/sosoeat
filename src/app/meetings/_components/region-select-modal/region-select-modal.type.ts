import type { ReactNode } from 'react';

import type { DropdownSubProp } from '@/components/common/dropdown-sub';

export interface RegionSelectModalProps {
  trigger: ReactNode;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  dropdownSub?: DropdownSubProp;
  /**
   * 드롭다운 임시 선택값. `onDraftChange`와 함께 넘기면 모달 내부 state 대신 외부에서 제어합니다.
   * 열릴 때마다 모달이 `onDraftChange({ ...dropdownSub.value })`로 확정값 기준으로 초기화합니다.
   */
  draftValue?: Record<string, string>;
  onDraftChange?: (value: Record<string, string>) => void;
  contentClassName?: string;
}
