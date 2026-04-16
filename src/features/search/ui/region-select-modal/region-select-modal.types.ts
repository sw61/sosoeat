import type { ReactNode } from 'react';

import type { RegionSelection } from '@/entities/location';
import type { DropdownSubProp } from '@/shared/ui/dropdown-sub/dropdown-sub.types';

export type { RegionSelection };

/** `korea-regions-districts.json`의 지역 항목과 동일한 형태 */
export interface KoreaRegionRegion {
  id: string;
  name: string;
  nameEn: string;
  districts: string[];
}

/** RegionSelectModal 전용 — 확정·드래프트는 지역 배열 */
export type RegionModalDropdownSub = Omit<DropdownSubProp, 'value' | 'onChange'> & {
  value: RegionSelection;
  onChange: (value: RegionSelection) => void;
};

export interface RegionSelectModalProps {
  trigger: ReactNode;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  dropdownSub?: RegionModalDropdownSub;
  /**
   * 시·도를 먼저 고른 뒤 해당 구·군을 고르는 2단계 UI.
   * 사용 시 `dropdownSub`의 `value`·`onChange`(확정)는 그대로 쓰이며, `data`는 렌더에 사용되지 않는다.
   */
  regionCascade?: {
    regions: KoreaRegionRegion[];
  };
  /**
   * 드래프트 임시 선택값. `onDraftChange`와 함께 넘기면 모달 내부 state 대신 외부에서 제어합니다.
   * 열릴 때마다 모달이 `onDraftChange(dropdownSub.value)`로 확정값 기준으로 초기화합니다.
   */
  draftValue?: RegionSelection;
  onDraftChange?: (value: RegionSelection) => void;
  contentClassName?: string;
}
