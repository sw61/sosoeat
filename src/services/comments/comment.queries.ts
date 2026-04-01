import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Comment, commentApi, CreateCommentRequest, UpdateCommentRequest } from './comment.api';

export const commentKeys = {
  all: ['comments'] as const,
  list: (meetingId: number) => ['comments', meetingId] as const,
  count: (meetingId: number) => ['comments', meetingId, 'count'] as const,
};

/**
 * [Hook] useComments
 * 모임의 댓글 목록을 조회합니다.
 * 서버 컴포넌트에서 fetch한 initialData를 주입받을 수 있습니다.
 */
export const useComments = (meetingId: number, initialData?: Comment[]) => {
  return useQuery({
    queryKey: commentKeys.list(meetingId),
    queryFn: () => commentApi.getComments(meetingId),
    initialData,
  });
};

/**
 * [Hook] useCreateComment
 * 댓글/대댓글을 작성합니다.
 * 성공 시 댓글 목록을 다시 불러옵니다.
 */
export const useCreateComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentRequest) => commentApi.createComment(meetingId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(meetingId) });
    },
    onError: (error: Error) => {
      toast.error(error.message || '댓글 작성 중 오류가 발생했습니다.');
    },
  });
};

/**
 * [Hook] useUpdateComment
 * 댓글을 수정합니다.
 * 성공 시 댓글 목록을 다시 불러옵니다.
 */
export const useUpdateComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, payload }: { commentId: number; payload: UpdateCommentRequest }) =>
      commentApi.updateComment(commentId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(meetingId) });
      toast.success('댓글이 수정되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '댓글 수정 중 오류가 발생했습니다.');
    },
  });
};

/**
 * [Hook] useDeleteComment
 * 댓글을 삭제합니다.
 * 성공 시 댓글 목록을 다시 불러옵니다.
 */
export const useDeleteComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => commentApi.deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(meetingId) });
      toast.success('댓글이 삭제되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '댓글 삭제 중 오류가 발생했습니다.');
    },
  });
};

/**
 * [Hook] useLikeComment
 * 댓글 좋아요/취소를 처리합니다.
 * isLiked가 true면 취소, false면 좋아요
 * 성공 시 댓글 목록을 다시 불러옵니다.
 */
export const useLikeComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, isLiked }: { commentId: number; isLiked: boolean }) =>
      isLiked ? commentApi.unlikeComment(commentId) : commentApi.likeComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(meetingId) });
    },
    onError: (error: Error) => {
      toast.error(error.message || '좋아요 처리 중 오류가 발생했습니다.');
    },
  });
};
