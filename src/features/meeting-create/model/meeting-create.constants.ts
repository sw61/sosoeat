import type { MeetingStep } from './meeting-create.types';

export const CATEGORY_OPTIONS = [
  { value: 'groupEat', label: '함께먹기' },
  { value: 'groupBuy', label: '공동구매' },
] as const;

/** 카테고리 기재 문구 */
export const MEETING_CATEGORY_LABELS: Record<string, string> = {
  groupEat: '함께먹기',
  groupBuy: '공동구매',
};

/** 퍼널 단계 순서 */
export const STEPS: MeetingStep[] = ['category', 'basicInfo', 'description', 'schedule'];

/** 각 단계별 타이틀 */
export const STEP_TITLES: Record<MeetingStep, string> = {
  category: '카테고리 선택',
  basicInfo: '모임 기본 정보',
  description: '모임 설명',
  schedule: '모임 일정 설정',
};

/** 전체 단계 수 */
export const TOTAL_STEPS = STEPS.length;

/** 폼 기본값 */
export const DEFAULT_FORM_VALUES = {
  type: '',
  name: '',
  region: '',
  address: '',
  image: '',
  description: '',
  meetingDate: '',
  meetingTime: '',
  registrationEndDate: '',
  registrationEndTime: '',
  capacity: 1,
} as const;
