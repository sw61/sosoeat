'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth';
import { useLogout } from '@/features/auth';
import { AlertModal } from '@/shared/ui/alert-modal/alert-modal';

export const SessionExpiredModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isSessionExpired, setSessionExpired } = useAuthStore();
  const { mutate: logout } = useLogout();

  const handleConfirm = async () => {
    logout();
    setSessionExpired(false);
    router.push(`/login?callbackUrl=${encodeURIComponent(pathname ?? '')}`);
  };

  const handleCancel = async () => {
    logout();
    setSessionExpired(false);
    router.push('/');
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
