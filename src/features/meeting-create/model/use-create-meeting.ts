import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { meetingsApi, mypageMeetingCountKey } from '@/entities/meeting';
import { meetingCommentApi } from '@/entities/meeting-comment';
import { CreateMeeting } from '@/shared/types/generated-client/models/CreateMeeting';

export const useCreateMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMeeting) => meetingsApi.create(payload),
    onSuccess: (meeting) => {
      meetingCommentApi
        .syncCreateMeeting({
          id: meeting.id,
          hostId: meeting.hostId,
          teamId: meeting.teamId,
        })
        .catch((error: Error) => {
          console.error('[useCreateMeeting] comment sync failed:', error);
        });
      void queryClient.invalidateQueries({ queryKey: mypageMeetingCountKey });
      toast.success('모임이 생성되었습니다.');
    },
    onError: () => {
      toast.error('모임 생성 중 문제가 생겼어요. 다시 시도해 주세요.');
    },
  });
};
