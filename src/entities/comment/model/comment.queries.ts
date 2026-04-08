import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  Comment,
  commentApi,
  CreateCommentRequest,
  SyncMeetingRequest,
  UpdateCommentRequest,
} from '../api/comment.api';

export const commentKeys = {
  all: ['comments'] as const,
  list: (meetingId: number) => ['comments', meetingId] as const,
  count: (meetingId: number) => ['comments', meetingId, 'count'] as const,
};

const COMMENT_LIST_STALE_MS = 30_000;

export const useComments = (
  meetingId: number,
  initialData?: Comment[],
  syncMeeting?: SyncMeetingRequest
) => {
  return useQuery({
    queryKey: commentKeys.list(meetingId),
    queryFn: () => commentApi.getComments(meetingId, syncMeeting),
    initialData,
    staleTime: COMMENT_LIST_STALE_MS,
    retry: false,
  });
};

type CommentAuthor = {
  nickname: string;
  profileUrl: string | null;
};

export const useCreateComment = (meetingId: number, author: CommentAuthor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCommentRequest) => commentApi.createComment(meetingId, payload),
    onMutate: async (payload: CreateCommentRequest) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.list(meetingId) });
      const previousComments = queryClient.getQueryData(commentKeys.list(meetingId));

      const optimisticComment: Comment = {
        id: -Date.now(),
        parentId: payload.parentId ?? null,
        content: payload.content,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        author,
        likeCount: 0,
        isLiked: false,
        isHostComment: false,
        isMine: true,
        replies: [],
      };

      queryClient.setQueryData(commentKeys.list(meetingId), (old: Comment[] | undefined) => {
        if (!old) return [optimisticComment];
        if (payload.parentId) {
          return old.map((comment) =>
            comment.id === payload.parentId
              ? { ...comment, replies: [...(comment.replies ?? []), optimisticComment] }
              : comment
          );
        }
        return [...old, optimisticComment];
      });

      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(meetingId) });
      queryClient.invalidateQueries({ queryKey: commentKeys.count(meetingId) });
    },
    onError: (error: Error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(commentKeys.list(meetingId), context.previousComments);
      }
      toast.error(error.message || '댓글 작성 중 오류가 발생했습니다.');
    },
  });
};

export const useUpdateComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, payload }: { commentId: number; payload: UpdateCommentRequest }) =>
      commentApi.updateComment(commentId, payload),
    onMutate: async ({ commentId, payload }) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.list(meetingId) });
      const previousComments = queryClient.getQueryData(commentKeys.list(meetingId));

      queryClient.setQueryData(commentKeys.list(meetingId), (old: Comment[] | undefined) => {
        if (!old) return old;
        return old.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, content: payload.content };
          }
          return {
            ...comment,
            replies: comment.replies?.map((reply) =>
              reply.id === commentId ? { ...reply, content: payload.content } : reply
            ),
          };
        });
      });

      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(meetingId) });
      toast.success('댓글이 수정되었습니다.');
    },
    onError: (error: Error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(commentKeys.list(meetingId), context.previousComments);
      }
      toast.error(error.message || '댓글 수정 중 오류가 발생했습니다.');
    },
  });
};

export const useDeleteComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => commentApi.deleteComment(commentId),
    onMutate: async (commentId: number) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.list(meetingId) });
      const previousComments = queryClient.getQueryData(commentKeys.list(meetingId));

      queryClient.setQueryData(commentKeys.list(meetingId), (old: Comment[] | undefined) => {
        if (!old) return old;
        return old.map((comment) => {
          if (comment.id === commentId) {
            return { ...comment, isDeleted: true };
          }
          return {
            ...comment,
            replies: comment.replies?.map((reply) =>
              reply.id === commentId ? { ...reply, isDeleted: true } : reply
            ),
          };
        });
      });

      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(meetingId) });
      queryClient.invalidateQueries({ queryKey: commentKeys.count(meetingId) });
      toast.success('댓글이 삭제되었습니다.');
    },
    onError: (error: Error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(commentKeys.list(meetingId), context.previousComments);
      }
      toast.error(error.message || '댓글 삭제 중 오류가 발생했습니다.');
    },
  });
};

export const useLikeComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, isLiked }: { commentId: number; isLiked: boolean }) =>
      isLiked ? commentApi.unlikeComment(commentId) : commentApi.likeComment(commentId),

    onError: () => {
      toast.error('좋아요 처리 중 오류가 발생했습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: commentKeys.list(meetingId) });
    },
  });
};

export const useCommentCount = (meetingId: number, initialCount?: number) => {
  return useQuery({
    queryKey: commentKeys.count(meetingId),
    queryFn: () => commentApi.getCommentCount(meetingId),
    initialData: initialCount !== undefined ? { count: initialCount } : undefined,
  });
};

export const useSyncCreateMeeting = () => {
  return useMutation({
    mutationFn: (payload: SyncMeetingRequest) => commentApi.syncCreateMeeting(payload),
    retry: 3,
    onError: () => {
      console.error('[syncCreateMeeting] 동기화 실패');
    },
  });
};
