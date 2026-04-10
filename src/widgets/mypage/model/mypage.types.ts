export type TabValue = 'all' | 'favorite' | 'created';

export interface TabList {
  value: TabValue;
  label: string;
}
