import { useAuthStore } from '@/entities/auth';
import { useModal } from '@/shared/lib/use-modal';

import { useCreateMeeting } from './use-create-meeting';

export function useMeetingCreateTrigger() {
  const { isOpen, open, close } = useModal();
  const { mutateAsync: createMeeting } = useCreateMeeting();
  const { isAuthenticated, setLoginRequired } = useAuthStore();

  const handleOpen = () => {
    if (!isAuthenticated) {
      setLoginRequired(true);
      return;
    }
    open();
  };

  return { handleOpen, isOpen, close, createMeeting };
}
