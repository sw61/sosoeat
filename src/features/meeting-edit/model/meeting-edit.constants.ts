import type { MeetingEditTab } from './meeting-edit.types';

export const CATEGORY_OPTIONS = [
  { value: 'groupEat', label: '함께먹기' },
  { value: 'groupBuy', label: '공동구매' },
] as const;

export const EDIT_TABS: { value: MeetingEditTab; label: string }[] = [
  { value: 'basicInfo', label: '기본정보' },
  { value: 'schedule', label: '일정 및 인원' },
];

export const BASIC_INFO_KEYS = [
  'name',
  'type',
  'region',
  'address',
  'image',
  'description',
] as const;
