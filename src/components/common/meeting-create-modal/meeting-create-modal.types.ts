import type { FieldValues, UseFormReturn } from 'react-hook-form';

/** 퍼널 단계 이름 */
export type MeetingStep = 'category' | 'basicInfo' | 'description' | 'schedule';

/** 내부 폼 데이터 타입 (UI 편의를 위한 구조) */
export interface MeetingFormData {
  // Step 1: 카테고리
  type: string;

  // Step 2: 기본 정보
  name: string;
  region: string;
  address: string;
  image: string;

  // Step 3: 설명
  description: string;

  // Step 4: 일정/정원
  meetingDate: string;
  meetingTime: string;
  registrationEndDate: string;
  registrationEndTime: string;
  capacity: number;
}

/** MeetingCreateModal Props */
export interface MeetingCreateModalProps {
  /** 모달 표시 여부 */
  open: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** 모임 생성 콜백 — CreateMeeting 타입은 services 레이어에서 변환 */
  onSubmit: (data: MeetingFormData) => void | Promise<void>;
}

/** 각 Step 컴포넌트 공통 Props */
export interface StepProps<T extends FieldValues = MeetingFormData> {
  form: UseFormReturn<T>;
}
