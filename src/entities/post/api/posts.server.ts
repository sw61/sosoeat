import { apiServer } from '@/shared/api/api-server';
import { parseResponse } from '@/shared/api/parse-response';
import { PostListFromJSON } from '@/shared/types/generated-client/models/PostList';

import type { GetSosoTalkPostListParams, GetSosoTalkPostListResponse } from '../model/post.types';

const DEFAULT_SOSOTALK_POST_LIST_PARAMS: Required<
  Pick<GetSosoTalkPostListParams, 'type' | 'sortBy' | 'sortOrder' | 'size'>
> = {
  type: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  size: 10,
};

export async function getSosoTalkPosts(
  params: GetSosoTalkPostListParams = {}
): Promise<GetSosoTalkPostListResponse> {
  const mergedParams = {
    ...DEFAULT_SOSOTALK_POST_LIST_PARAMS,
    ...params,
  };
  const searchParams = new URLSearchParams();

  Object.entries(mergedParams).forEach(([key, value]) => {
    if (value == null) {
      return;
    }

    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  const response = await apiServer.get(`/posts${query ? `?${query}` : ''}`);
  const data = await parseResponse<unknown>(response, '소소톡 게시글 목록을 불러오지 못했습니다.');

  return PostListFromJSON(data) as GetSosoTalkPostListResponse;
}
