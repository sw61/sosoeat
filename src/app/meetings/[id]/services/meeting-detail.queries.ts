'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { meetingsApi } from '@/services/meetings/meetings.api';

export const useConfirmMeeting = (id: number, onSuccess?: () => void) =>
  useMutation({
    mutationFn: () => meetingsApi.updateStatus(id, { status: 'CONFIRMED' }),
    retry: false,
    onSuccess: () => {
      toast.success('모임이 확정되었습니다.');
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 확정 중 오류가 발생했습니다.');
    },
  });

export const useDeleteMeeting = (id: number) => {
  const router = useRouter();
  return useMutation({
    mutationFn: () => meetingsApi.deleteMeeting(id),
    onSuccess: () => {
      toast.success('모임이 삭제되었습니다.');
      router.push('/meetings');
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 삭제 중 오류가 발생했습니다.');
    },
  });
};

export const useJoinMeeting = (id: number, onSuccess?: () => void) =>
  useMutation({
    mutationFn: () => meetingsApi.join(id),
    retry: false,
    onSuccess: () => {
      toast.success('모임에 참여했습니다.');
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 참여 중 오류가 발생했습니다.');
    },
  });

export const useLeaveMeeting = (id: number, onSuccess?: () => void) =>
  useMutation({
    mutationFn: () => meetingsApi.leave(id),
    retry: false,
    onSuccess: () => {
      toast.success('모임 참여를 취소했습니다.');
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 참여 취소 중 오류가 발생했습니다.');
    },
  });
