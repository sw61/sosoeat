import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CreateMeeting } from '@/shared/types/generated-client/models/CreateMeeting';
import { UpdateMeeting } from '@/shared/types/generated-client/models/UpdateMeeting';

import { meetingsApi } from '../api/meetings.api';

export const useCreateMeeting = () =>
  useMutation({
    mutationFn: (payload: CreateMeeting) => meetingsApi.create(payload),
    onSuccess: async (meeting) => {
      const { commentApi } = await import('@/entities/comment');
      commentApi.syncCreateMeeting({
        id: meeting.id,
        hostId: meeting.hostId,
        teamId: meeting.teamId,
      });
      toast.success('모임이 생성되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 생성 중 오류가 발생했습니다.');
    },
  });

export const useUpdateMeeting = (id: number, onSuccess?: () => void) =>
  useMutation({
    mutationFn: (payload: UpdateMeeting) => meetingsApi.update(id, payload),
    onSuccess: () => {
      toast.success('모임이 수정되었습니다.');
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 수정 중 오류가 발생했습니다.');
    },
  });
