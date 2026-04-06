import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { meetingsApi } from '@/entities/meeting';
import { UpdateMeeting } from '@/shared/types/generated-client/models/UpdateMeeting';

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
