'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { Meeting } from '@/entities/meeting';
import { meetingsApi, meetingsQueryOptions, mypageMeetingCountKey } from '@/entities/meeting';

export function useMeetingDetail(meetingId: number) {
  return useSuspenseQuery(meetingsQueryOptions.meetingDetail(meetingId));
}

export const useConfirmMeeting = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => meetingsApi.updateStatus(id, { status: 'CONFIRMED' }),
    retry: false,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
      });
      const previous = queryClient.getQueryData<Meeting>(
        meetingsQueryOptions.meetingDetail(id).queryKey
      );
      if (previous) {
        queryClient.setQueryData<Meeting>(meetingsQueryOptions.meetingDetail(id).queryKey, {
          ...previous,
          confirmedAt: new Date().toISOString(),
        });
      }
      return { previous };
    },
    onError: (_error: Error, _, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(meetingsQueryOptions.meetingDetail(id).queryKey, context.previous);
      } else {
        void queryClient.invalidateQueries({
          queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
        });
      }
      toast.error('모임 확정 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
    onSuccess: () => {
      toast.success('모임이 확정되었습니다.');
    },
    onSettled: (_data, error) => {
      if (error == null) {
        void queryClient.invalidateQueries({
          queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
        });
      }
    },
  });
};

export const useDeleteMeeting = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => meetingsApi.deleteMeeting(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: mypageMeetingCountKey });
      toast.success('모임이 삭제되었습니다.');
      router.back();
    },
    onError: () => {
      toast.error('모임 삭제 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
  });
};

export const useJoinMeeting = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => meetingsApi.join(id),
    retry: false,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
      });
      const previous = queryClient.getQueryData<Meeting>(
        meetingsQueryOptions.meetingDetail(id).queryKey
      );
      if (previous) {
        queryClient.setQueryData<Meeting>(meetingsQueryOptions.meetingDetail(id).queryKey, {
          ...previous,
          isJoined: true,
          participantCount: Math.min(previous.capacity, previous.participantCount + 1),
        });
      }
      return { previous };
    },
    onError: (_error: Error, _, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(meetingsQueryOptions.meetingDetail(id).queryKey, context.previous);
      } else {
        void queryClient.invalidateQueries({
          queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
        });
      }
      toast.error('모임 참여 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: mypageMeetingCountKey });
      toast.success('모임에 참여했습니다.');
    },
    onSettled: (_data, error) => {
      if (error == null) {
        void queryClient.invalidateQueries({
          queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
        });
      }
    },
  });
};

export const useLeaveMeeting = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => meetingsApi.leave(id),
    retry: false,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
      });
      const previous = queryClient.getQueryData<Meeting>(
        meetingsQueryOptions.meetingDetail(id).queryKey
      );
      if (previous) {
        queryClient.setQueryData<Meeting>(meetingsQueryOptions.meetingDetail(id).queryKey, {
          ...previous,
          isJoined: false,
          participantCount: Math.max(0, previous.participantCount - 1),
        });
      }
      return { previous };
    },
    onError: (_error: Error, _, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(meetingsQueryOptions.meetingDetail(id).queryKey, context.previous);
      } else {
        void queryClient.invalidateQueries({
          queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
        });
      }
      toast.error('모임 참여 취소 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: mypageMeetingCountKey });
      toast.success('모임 참여를 취소했습니다.');
    },
    onSettled: (_data, error) => {
      if (error == null) {
        void queryClient.invalidateQueries({
          queryKey: meetingsQueryOptions.meetingDetail(id).queryKey,
        });
      }
    },
  });
};
