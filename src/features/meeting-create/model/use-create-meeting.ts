import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { meetingKeys, meetingsApi } from '@/entities/meeting';
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
      void queryClient.invalidateQueries({ queryKey: meetingKeys.joined() });
      void queryClient.invalidateQueries({ queryKey: meetingKeys.my() });
      toast.success('모임이 생성되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 생성 중 오류가 발생했습니다.');
    },
  });
};
