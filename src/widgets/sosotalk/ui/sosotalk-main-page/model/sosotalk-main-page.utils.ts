import type { GetSosoTalkPostListParams } from '@/entities/post';

import type {
  SosoTalkSortValue,
  SosoTalkTabValue,
} from '../../sosotalk-filter-bar/sosotalk-filter-bar.types';

const SORT_BY_MAP: Record<SosoTalkSortValue, GetSosoTalkPostListParams['sortBy']> = {
  comments: 'commentCount',
  latest: 'createdAt',
  likes: 'likeCount',
};

export function createSosoTalkMainPageQueryParams(
  activeTab: SosoTalkTabValue,
  activeSort: SosoTalkSortValue
): GetSosoTalkPostListParams {
  return {
    type: activeTab === 'popular' ? 'best' : 'all',
    sortBy: SORT_BY_MAP[activeSort] ?? 'createdAt',
    sortOrder: 'desc',
    size: 12,
  };
}
