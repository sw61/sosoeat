import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth';
import { useModal } from '@/shared/lib/use-modal';

import { useCreateMeeting } from './use-create-meeting';

export function useMeetingCreateTrigger() {
  const { isOpen, open, close } = useModal();
  const { mutateAsync: createMeetingMutation } = useCreateMeeting();
  const { isAuthenticated, setLoginRequired } = useAuthStore();
  const router = useRouter();

  const handleOpen = () => {
    if (!isAuthenticated) {
      setLoginRequired(true);
      return;
    }
    open();
  };

  const createMeeting = async (payload: Parameters<typeof createMeetingMutation>[0]) => {
    const meeting = await createMeetingMutation(payload);
    close();
    router.push(`/meetings/${meeting.id}`);
  };

  return { handleOpen, isOpen, close, createMeeting };
}
