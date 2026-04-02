import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CreateMeeting } from '@/types/generated-client/models/CreateMeeting';
import { UpdateMeeting } from '@/types/generated-client/models/UpdateMeeting';

import { meetingsApi } from './meetings.api';

export const useCreateMeeting = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: CreateMeeting) => meetingsApi.create(payload),
    onSuccess: (data) => {
      toast.success('모임이 생성되었습니다.');
      router.push(`/meetings/${data.id}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 생성 중 오류가 발생했습니다.');
    },
  });
};

export const useUpdateMeeting = (id: number) =>
  useMutation({
    mutationFn: (payload: UpdateMeeting) => meetingsApi.update(id, payload),
    onSuccess: () => {
      toast.success('모임이 수정되었습니다.');
    },
    onError: (error: Error) => {
      toast.error(error.message || '모임 수정 중 오류가 발생했습니다.');
    },
  });
