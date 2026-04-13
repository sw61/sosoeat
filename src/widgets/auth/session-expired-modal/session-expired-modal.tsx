'use client';

import { useAuthStore } from '@/entities/auth';
import { useLogoutMutation } from '@/features/auth';
import { AlertModal } from '@/shared/ui/alert-modal/alert-modal';

export const SessionExpiredModal = () => {
  const { isSessionExpired, setSessionExpired } = useAuthStore();
  const { mutate: logout } = useLogoutMutation();

  const handleConfirm = () => {
    setSessionExpired(false);
    logout('/login');
  };

  const handleCancel = () => {
    setSessionExpired(false);
    logout('/home');
  };

  return (
    <AlertModal
      open={isSessionExpired}
      title="세션이 만료되었습니다"
      description="로그인 세션이 만료되었습니다. 다시 로그인해주세요."
      cancelText="홈으로 이동"
      confirmText="로그인"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};
