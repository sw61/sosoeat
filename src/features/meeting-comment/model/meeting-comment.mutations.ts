import * as Sentry from '@sentry/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  CreateMeetingCommentRequest,
  MeetingComment,
  meetingCommentApi,
  meetingCommentKeys,
  SyncMeetingRequest,
  UpdateMeetingCommentRequest,
} from '@/entities/meeting-comment';
import { capture5xxException } from '@/shared/lib/sentry-error';

type CommentAuthor = {
  nickname: string;
  profileUrl: string | null;
};

export const useCreateComment = (meetingId: number, author: CommentAuthor) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMeetingCommentRequest) =>
      meetingCommentApi.createComment(meetingId, payload),
    onMutate: async (payload: CreateMeetingCommentRequest) => {
      await queryClient.cancelQueries({ queryKey: meetingCommentKeys.list(meetingId) });
      const previousComments = queryClient.getQueryData(meetingCommentKeys.list(meetingId));

      const optimisticComment: MeetingComment = {
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

      queryClient.setQueryData(
        meetingCommentKeys.list(meetingId),
        (old: MeetingComment[] | undefined) => {
          if (!old) return [optimisticComment];
          if (payload.parentId) {
            return old.map((comment) =>
              comment.id === payload.parentId
                ? { ...comment, replies: [...(comment.replies ?? []), optimisticComment] }
                : comment
            );
          }
          return [...old, optimisticComment];
        }
      );

      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingCommentKeys.list(meetingId) });
      queryClient.invalidateQueries({ queryKey: meetingCommentKeys.count(meetingId) });
    },
    onError: (error: Error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(meetingCommentKeys.list(meetingId), context.previousComments);
      }
      capture5xxException(error, {
        tags: {
          area: 'meeting-comment',
          action: 'create-comment',
        },
        extra: {
          meetingId,
        },
      });
      toast.error('댓글 작성 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
  });
};

export const useUpdateComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      payload,
    }: {
      commentId: number;
      payload: UpdateMeetingCommentRequest;
    }) => meetingCommentApi.updateComment(commentId, payload),
    onMutate: async ({ commentId, payload }) => {
      await queryClient.cancelQueries({ queryKey: meetingCommentKeys.list(meetingId) });
      const previousComments = queryClient.getQueryData(meetingCommentKeys.list(meetingId));

      queryClient.setQueryData(
        meetingCommentKeys.list(meetingId),
        (old: MeetingComment[] | undefined) => {
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
        }
      );

      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingCommentKeys.list(meetingId) });
      toast.success('댓글이 수정되었습니다.');
    },
    onError: (error: Error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(meetingCommentKeys.list(meetingId), context.previousComments);
      }
      capture5xxException(error, {
        tags: {
          area: 'meeting-comment',
          action: 'update-comment',
        },
        extra: {
          meetingId,
        },
      });
      toast.error('댓글 수정 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
  });
};

export const useDeleteComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => meetingCommentApi.deleteComment(commentId),
    onMutate: async (commentId: number) => {
      await queryClient.cancelQueries({ queryKey: meetingCommentKeys.list(meetingId) });
      const previousComments = queryClient.getQueryData(meetingCommentKeys.list(meetingId));

      queryClient.setQueryData(
        meetingCommentKeys.list(meetingId),
        (old: MeetingComment[] | undefined) => {
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
        }
      );

      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: meetingCommentKeys.list(meetingId) });
      queryClient.invalidateQueries({ queryKey: meetingCommentKeys.count(meetingId) });
      toast.success('댓글이 삭제되었습니다.');
    },
    onError: (error: Error, _, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(meetingCommentKeys.list(meetingId), context.previousComments);
      }
      capture5xxException(error, {
        tags: {
          area: 'meeting-comment',
          action: 'delete-comment',
        },
        extra: {
          meetingId,
        },
      });
      toast.error('댓글 삭제 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
  });
};

export const useLikeComment = (meetingId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, isLiked }: { commentId: number; isLiked: boolean }) =>
      isLiked
        ? meetingCommentApi.unlikeComment(commentId)
        : meetingCommentApi.likeComment(commentId),
    onError: () => {
      toast.error('좋아요 처리 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: meetingCommentKeys.list(meetingId) });
    },
  });
};

export const useSyncCreateMeeting = () => {
  return useMutation({
    mutationFn: (payload: SyncMeetingRequest) => meetingCommentApi.syncCreateMeeting(payload),
    retry: 3,
    onError: (error, payload) => {
      Sentry.captureException(error, {
        tags: {
          area: 'meeting-comment',
          action: 'sync-create-meeting',
        },
        extra: {
          meetingId: payload.id,
          hostId: payload.hostId,
          teamId: payload.teamId,
        },
      });
      console.error('[syncCreateMeeting] 동기화 실패');
    },
  });
};
