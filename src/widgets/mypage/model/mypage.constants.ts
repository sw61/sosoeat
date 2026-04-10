import type { TabList } from './mypage.types';

export const FIVE_MINUTES_IN_MS = 1000 * 60 * 5;

export const MYPAGE_TABS: TabList[] = [
  { value: 'all', label: '나의 모임' },
  { value: 'favorite', label: '찜한 모임' },
  { value: 'created', label: '내가 만든 모임' },
];
