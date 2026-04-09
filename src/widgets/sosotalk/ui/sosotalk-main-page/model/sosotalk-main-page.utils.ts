import type { GetSosoTalkPostListParams } from '@/entities/post';

import type { SosoTalkSortValue, SosoTalkTabValue } from '../sosotalk-filter-bar';

export function createSosoTalkMainPageQueryParams(
  activeTab: SosoTalkTabValue,
  activeSort: SosoTalkSortValue
): GetSosoTalkPostListParams {
  return {
    type: activeTab === 'popular' ? 'best' : 'all',
    sortBy:
      activeSort === 'comments'
        ? 'commentCount'
        : activeSort === 'likes'
          ? 'likeCount'
          : 'createdAt',
    sortOrder: 'desc',
    size: 10,
  };
}
