import { fetchClient } from '@/lib/http/fetch-client';
import { PostListFromJSON } from '@/types/generated-client/models/PostList';
import { PostWithCommentsFromJSON } from '@/types/generated-client/models/PostWithComments';

import type {
  GetSosoTalkPostDetailResponse,
  GetSosoTalkPostListParams,
  GetSosoTalkPostListResponse,
} from './sosotalk.types';

const DEFAULT_SOSOTALK_POST_LIST_PARAMS: Required<
  Pick<GetSosoTalkPostListParams, 'type' | 'sortBy' | 'sortOrder' | 'size'>
> = {
  type: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
  size: 10,
};

export const getSosoTalkPostList = async (
  params: GetSosoTalkPostListParams = {}
): Promise<GetSosoTalkPostListResponse> => {
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

  const response = await fetchClient.get(`/posts?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('소소톡 게시글 목록을 불러오지 못했습니다.');
  }

  return PostListFromJSON(await response.json()) as GetSosoTalkPostListResponse;
};

export const getSosoTalkPostDetail = async (
  postId: number
): Promise<GetSosoTalkPostDetailResponse> => {
  const response = await fetchClient.get(`/posts/${postId}`);

  if (!response.ok) {
    throw new Error('소소톡 게시글을 불러오지 못했습니다.');
  }

  return PostWithCommentsFromJSON(await response.json()) as GetSosoTalkPostDetailResponse;
};
