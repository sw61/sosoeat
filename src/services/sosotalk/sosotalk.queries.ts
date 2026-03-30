import { useQuery } from '@tanstack/react-query';

import { getSosoTalkPostDetail, getSosoTalkPostList } from './sosotalk.api';
import type { GetSosoTalkPostListParams } from './sosotalk.types';

export const useGetSosoTalkPostList = (params?: GetSosoTalkPostListParams) =>
  useQuery({
    queryKey: ['sosotalk-post-list', params],
    queryFn: () => getSosoTalkPostList(params),
  });

export const useGetSosoTalkPostDetail = (postId?: number) =>
  useQuery({
    queryKey: ['sosotalk-post-detail', postId],
    queryFn: () => {
      if (postId == null) {
        throw new Error('게시글 ID가 필요합니다.');
      }

      return getSosoTalkPostDetail(postId);
    },
    enabled: postId != null,
  });
