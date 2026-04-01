import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
} from './sosotalk.api';
import type {
  CommentMutationParams,
  CreateSosoTalkCommentParams,
  CreateSosoTalkPostParams,
  GetSosoTalkPostListParams,
  SosoTalkPostMutationParams,
  UpdateSosoTalkCommentParams,
  UpdateSosoTalkPostParams,
} from './sosotalk.types';

export const sosotalkQueryKeys = {
  all: ['sosotalk'] as const,
  postList: (params?: GetSosoTalkPostListParams) => ['sosotalk-post-list', params] as const,
  postDetail: (postId?: number) => ['sosotalk-post-detail', postId] as const,
};

export const useGetSosoTalkPostList = (params?: GetSosoTalkPostListParams) =>
  useQuery({
    queryKey: sosotalkQueryKeys.postList(params),
    queryFn: () => getSosoTalkPostList(params),
  });

export const useGetSosoTalkPostDetail = (postId?: number) =>
  useQuery({
    queryKey: sosotalkQueryKeys.postDetail(postId),
    queryFn: () => {
      if (postId == null) {
        throw new Error('게시글 ID가 필요합니다.');
      }

      return getSosoTalkPostDetail(postId);
    },
    enabled: postId != null,
  });

export const useCreateSosoTalkPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateSosoTalkPostParams) => createSosoTalkPost(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['sosotalk-post-list'] });
    },
  });
};

export const useCreateSosoTalkPostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => createSosoTalkPostLike(postId),
    onSuccess: (_data, postId) => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) }),
        queryClient.invalidateQueries({ queryKey: ['sosotalk-post-list'] }),
      ]);
    },
  });
};

export const useDeleteSosoTalkPostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => deleteSosoTalkPostLike(postId),
    onSuccess: (_data, postId) => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) }),
        queryClient.invalidateQueries({ queryKey: ['sosotalk-post-list'] }),
      ]);
    },
  });
};

export const useCreateSosoTalkComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateSosoTalkCommentParams) => createSosoTalkComment(params),
    onSuccess: (_data, { postId }) => {
      void queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) });
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
      void queryClient.invalidateQueries({ queryKey: sosotalkQueryKeys.postDetail(postId) });
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
        queryClient.invalidateQueries({ queryKey: ['sosotalk-post-list'] }),
      ]);
    },
  });
};

export const useDeleteSosoTalkPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SosoTalkPostMutationParams) => deleteSosoTalkPost(params),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['sosotalk-post-list'] });
    },
  });
};
