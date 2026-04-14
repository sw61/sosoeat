import { CATEGORY_OPTIONS } from '@/shared/constants/meeting.constants';

import type { MeetingEditTab } from './meeting-edit.types';

export { CATEGORY_OPTIONS };

export const EDIT_TABS: { value: MeetingEditTab; label: string }[] = [
  { value: 'basicInfo', label: '기본정보' },
  { value: 'schedule', label: '일정 및 인원' },
];

export const BASIC_INFO_KEYS = [
  'name',
  'type',
  'region',
  'addressBase',
  'address',
  'image',
  'description',
] as const;
