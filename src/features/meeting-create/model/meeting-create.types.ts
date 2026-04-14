import type { FieldValues, UseFormReturn } from 'react-hook-form';

import type { CreateMeeting } from '@/shared/types/generated-client/models/CreateMeeting';

/** 퍼널 단계 이름 */
export type MeetingStep = 'category' | 'basicInfo' | 'description' | 'schedule';

/** 내부 폼 데이터 타입 (UI 편의를 위한 구조) */
export interface MeetingFormData {
  // Step 1: 카테고리
  type: string;

  // Step 2: 기본 정보
  name: string;
  region: string;
  addressBase: string; // readonly 표시용 (예: "서울 영등포구 여의도동 85")
  address: string; // 사용자 입력 상세주소 (예: "여의도한강공원")
  latitude?: number;
  longitude?: number;
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

export interface MeetingCreateModalProps {
  /** 모달 표시 여부 */
  open: boolean;
  /** 모달 닫기 콜백 */
  onClose: () => void;
  /** 모임 생성 콜백 */
  onSubmit: (data: CreateMeeting) => unknown;
}

/** 각 Step 컴포넌트 공통 Props */
export interface StepProps<T extends FieldValues = MeetingFormData> {
  form: UseFormReturn<T>;
}
