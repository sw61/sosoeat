import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createSosoTalkComment,
  createSosoTalkPost,
  createSosoTalkPostLike,
  deleteSosoTalkComment,
  deleteSosoTalkPost,
  deleteSosoTalkPostLike,
  getSosoTalkPostDetail,
  getSosoTalkPostList,
  updateSosoTalkComment,
  updateSosoTalkPost,
} from '../api/posts.api';

import type {
  CommentMutationParams,
  CreateSosoTalkCommentParams,
  CreateSosoTalkPostParams,
  GetSosoTalkPostDetailResponse,
  GetSosoTalkPostListParams,
  GetSosoTalkPostListResponse,
  SosoTalkPostMutationParams,
  UpdateSosoTalkCommentParams,
  UpdateSosoTalkPostParams,
} from './post.types';

const SOSOTALK_QUERY_STALE_TIME = 30_000;
const SOSOTALK_QUERY_GC_TIME = 1000 * 60 * 10;

export const sosotalkQueryKeys = {
  all: ['sosotalk'] as const,
  postList: (params?: GetSosoTalkPostListParams) => ['sosotalk-post-list', params] as const,
  postDetail: (postId?: number) => ['sosotalk-post-detail', postId] as const,
};

export const sosotalkPostListQueryOptions = (params?: GetSosoTalkPostListParams) =>
  queryOptions({
    queryKey: sosotalkQueryKeys.postList(params),
    queryFn: () => getSosoTalkPostList(params),
    staleTime: SOSOTALK_QUERY_STALE_TIME,
    gcTime: SOSOTALK_QUERY_GC_TIME,
  });

export const sosotalkPostDetailQueryOptions = (postId?: number) =>
  queryOptions({
    queryKey: sosotalkQueryKeys.postDetail(postId),
    queryFn: () => {
      if (postId == null) {
        throw new Error('게시글 ID가 필요합니다.');
      }

      return getSosoTalkPostDetail(postId);
    },
    enabled: postId != null,
    staleTime: SOSOTALK_QUERY_STALE_TIME,
    gcTime: SOSOTALK_QUERY_GC_TIME,
  });

export const useGetSosoTalkPostList = (params?: GetSosoTalkPostListParams) =>
  useQuery(sosotalkPostListQueryOptions(params));

export const useGetSosoTalkPostDetail = (postId?: number) =>
  useQuery(sosotalkPostDetailQueryOptions(postId));

const SOSOTALK_POST_LIST_QUERY_PREFIX = ['sosotalk-post-list'] as const;

type SosoTalkLikeMutationContext = {
  previousDetail?: GetSosoTalkPostDetailResponse;
  previousLists: Array<readonly [readonly unknown[], GetSosoTalkPostListResponse | undefined]>;
};

const updateSosoTalkPostDetailLikeCache = (
  previousDetail: GetSosoTalkPostDetailResponse | undefined,
  nextIsLiked: boolean
): GetSosoTalkPostDetailResponse | undefined => {
  if (!previousDetail) {
    return previousDetail;
  }

  const likeDiff = nextIsLiked === previousDetail.isLiked ? 0 : nextIsLiked ? 1 : -1;

  return {
    ...previousDetail,
    isLiked: nextIsLiked,
    likeCount: Math.max(0, previousDetail.likeCount + likeDiff),
  };
};

const updateSosoTalkPostListLikeCache = (
  previousList: GetSosoTalkPostListResponse | undefined,
  postId: number,
  likeDiff: number
): GetSosoTalkPostListResponse | undefined => {
  if (!previousList) {
    return previousList;
  }

  return {
    ...previousList,
    data: previousList.data.map((post) =>
      post.id === postId
        ? {
            ...post,
            likeCount: Math.max(0, post.likeCount + likeDiff),
          }
        : post
    ),
  };
};

const invalidateSosoTalkListQueries = (queryClient: ReturnType<typeof useQueryClient>) =>
  queryClient.invalidateQueries({ queryKey: SOSOTALK_POST_LIST_QUERY_PREFIX });

const restoreSosoTalkLikeCache = (
  queryClient: ReturnType<typeof useQueryClient>,
  postId: number,
  context?: SosoTalkLikeMutationContext
) => {
  if (context?.previousDetail) {
    queryClient.setQueryData(sosotalkQueryKeys.postDetail(postId), context.previousDetail);
  }

  context?.previousLists.forEach(([queryKey, previousList]) => {
    queryClient.setQueryData(queryKey, previousList);
  });
};

const createSosoTalkLikeMutation = (
  nextIsLiked: boolean,
  mutationFn: (postId: number) => Promise<unknown>
) => {
  return () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn,
      onMutate: async (postId): Promise<SosoTalkLikeMutationContext> => {
        await Promise.all([
          queryClient.cancelQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) }),
          queryClient.cancelQueries({ queryKey: SOSOTALK_POST_LIST_QUERY_PREFIX }),
        ]);

        const previousDetail = queryClient.getQueryData<GetSosoTalkPostDetailResponse>(
          sosotalkQueryKeys.postDetail(postId)
        );
        const previousLists = queryClient.getQueriesData<GetSosoTalkPostListResponse>({
          queryKey: SOSOTALK_POST_LIST_QUERY_PREFIX,
        });

        queryClient.setQueryData<GetSosoTalkPostDetailResponse>(
          sosotalkQueryKeys.postDetail(postId),
          (currentDetail) => updateSosoTalkPostDetailLikeCache(currentDetail, nextIsLiked)
        );
        queryClient.setQueriesData<GetSosoTalkPostListResponse>(
          { queryKey: SOSOTALK_POST_LIST_QUERY_PREFIX },
          (currentList) =>
            updateSosoTalkPostListLikeCache(currentList, postId, nextIsLiked ? 1 : -1)
        );

        return {
          previousDetail,
          previousLists,
        };
      },
      onError: (_error, postId, context) => {
        restoreSosoTalkLikeCache(queryClient, postId, context);
      },
      onSettled: (_data, _error, postId) => {
        void Promise.all([
          queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) }),
          invalidateSosoTalkListQueries(queryClient),
        ]);
      },
    });
  };
};

export const useCreateSosoTalkPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateSosoTalkPostParams) => createSosoTalkPost(params),
    onSuccess: () => {
      void invalidateSosoTalkListQueries(queryClient);
    },
  });
};

export const useCreateSosoTalkPostLike = createSosoTalkLikeMutation(true, createSosoTalkPostLike);

export const useDeleteSosoTalkPostLike = createSosoTalkLikeMutation(
  false,
  deleteSosoTalkPostLike
);

export const useCreateSosoTalkComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateSosoTalkCommentParams) => createSosoTalkComment(params),
    onSuccess: (_data, { postId }) => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) }),
        invalidateSosoTalkListQueries(queryClient),
      ]);
    },
  });
};

export const useUpdateSosoTalkComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateSosoTalkCommentParams) => updateSosoTalkComment(params),
    onSuccess: (_data, { postId }) => {
      void queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) });
    },
  });
};

export const useDeleteSosoTalkComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CommentMutationParams) => deleteSosoTalkComment(params),
    onSuccess: (_data, { postId }) => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) }),
        invalidateSosoTalkListQueries(queryClient),
      ]);
    },
  });
};

export const useUpdateSosoTalkPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateSosoTalkPostParams) => updateSosoTalkPost(params),
    onSuccess: (_data, { postId }) => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) }),
        invalidateSosoTalkListQueries(queryClient),
      ]);
    },
  });
};

export const useDeleteSosoTalkPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SosoTalkPostMutationParams) => deleteSosoTalkPost(params),
    onSuccess: () => {
      void invalidateSosoTalkListQueries(queryClient);
    },
  });
};
