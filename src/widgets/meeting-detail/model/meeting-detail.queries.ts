'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { Meeting } from '@/entities/meeting';
import { meetingsApi, mypageMeetingCountKey } from '@/entities/meeting';

export const meetingDetailKeys = {
  detail: (id: number) => ['meetings', 'detail', id] as const,
};

export function useMeetingDetail(meetingId: number, initialData: Meeting) {
  return useQuery({
    queryKey: meetingDetailKeys.detail(meetingId),
    queryFn: () => meetingsApi.getById(meetingId),
    initialData,
    staleTime: 60_000,
  });
}

export const useConfirmMeeting = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => meetingsApi.updateStatus(id, { status: 'CONFIRMED' }),
    retry: false,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: meetingDetailKeys.detail(id) });
      const previous = queryClient.getQueryData<Meeting>(meetingDetailKeys.detail(id));
      if (previous) {
        queryClient.setQueryData<Meeting>(meetingDetailKeys.detail(id), {
          ...previous,
          confirmedAt: new Date().toISOString(),
        });
      }
      return { previous };
    },
    onError: (error: Error, _, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(meetingDetailKeys.detail(id), context.previous);
      } else {
        void queryClient.invalidateQueries({ queryKey: meetingDetailKeys.detail(id) });
      }
      toast.error(error.message || '모임 확정 중 오류가 발생했습니다.');
    },
    onSuccess: () => {
      toast.success('모임이 확정되었습니다.');
    },
    onSettled: (_data, error) => {
      if (error == null) {
        void queryClient.invalidateQueries({ queryKey: meetingDetailKeys.detail(id) });
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
    onError: (error: Error) => {
      toast.error(error.message || '모임 삭제 중 오류가 발생했습니다.');
    },
  });
};

export const useJoinMeeting = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => meetingsApi.join(id),
    retry: false,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: meetingDetailKeys.detail(id) });
      const previous = queryClient.getQueryData<Meeting>(meetingDetailKeys.detail(id));
      if (previous) {
        queryClient.setQueryData<Meeting>(meetingDetailKeys.detail(id), {
          ...previous,
          isJoined: true,
          participantCount: Math.min(previous.capacity, previous.participantCount + 1),
        });
      }
      return { previous };
    },
    onError: (error: Error, _, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(meetingDetailKeys.detail(id), context.previous);
      } else {
        void queryClient.invalidateQueries({ queryKey: meetingDetailKeys.detail(id) });
      }
      toast.error(error.message || '모임 참여 중 오류가 발생했습니다.');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: mypageMeetingCountKey });
      toast.success('모임에 참여했습니다.');
    },
    onSettled: (_data, error) => {
      if (error == null) {
        void queryClient.invalidateQueries({ queryKey: meetingDetailKeys.detail(id) });
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
      await queryClient.cancelQueries({ queryKey: meetingDetailKeys.detail(id) });
      const previous = queryClient.getQueryData<Meeting>(meetingDetailKeys.detail(id));
      if (previous) {
        queryClient.setQueryData<Meeting>(meetingDetailKeys.detail(id), {
          ...previous,
          isJoined: false,
          participantCount: Math.max(0, previous.participantCount - 1),
        });
      }
      return { previous };
    },
    onError: (error: Error, _, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(meetingDetailKeys.detail(id), context.previous);
      } else {
        void queryClient.invalidateQueries({ queryKey: meetingDetailKeys.detail(id) });
      }
      toast.error(error.message || '모임 참여 취소 중 오류가 발생했습니다.');
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: mypageMeetingCountKey });
      toast.success('모임 참여를 취소했습니다.');
    },
    onSettled: (_data, error) => {
      if (error == null) {
        void queryClient.invalidateQueries({ queryKey: meetingDetailKeys.detail(id) });
      }
    },
  });
};
