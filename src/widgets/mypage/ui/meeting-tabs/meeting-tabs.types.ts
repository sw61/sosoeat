export type TabValue = 'all' | 'favorite' | 'created';

export interface TabList {
  value: TabValue;
  label: string;
}

export const MYPAGE_TABS: TabList[] = [
  { value: 'all', label: '나의 모임' },
  { value: 'favorite', label: '찜한 모임' },
  { value: 'created', label: '내가 만든 모임' },
];
