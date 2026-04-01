import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { commentApi } from '@/services/comments';
import { CreateMeeting } from '@/types/generated-client/models/CreateMeeting';

import { meetingsApi } from './meetings.api';

export const useCreateMeeting = () =>
  useMutation({
    mutationFn: (payload: CreateMeeting) => meetingsApi.create(payload),
    onSuccess: (meeting) => {
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
