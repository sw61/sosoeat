export type SosoTalkTabValue = 'all' | 'popular';

export type SosoTalkSortValue = 'comments' | 'likes' | 'latest';

export interface SosoTalkFilterTab {
  label: string;
  value: SosoTalkTabValue;
}

export interface SosoTalkSortOption {
  label: string;
  value: SosoTalkSortValue;
}

export interface SosoTalkFilterBarProps {
  className?: string;
  activeTab?: SosoTalkTabValue;
  activeSort?: SosoTalkSortValue;
  tabs?: SosoTalkFilterTab[];
  sortOptions?: SosoTalkSortOption[];
  onTabChange?: (value: SosoTalkTabValue) => void;
  onSortChange?: (value: SosoTalkSortValue) => void;
}
