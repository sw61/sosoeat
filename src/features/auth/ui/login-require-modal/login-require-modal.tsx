'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/store/auth-store';
import { AlertModal } from '@/shared/ui/alert-modal/alert-modal';

export const LoginRequireModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoginRequired, setLoginRequired } = useAuthStore();

  const handleConfirm = () => {
    setLoginRequired(false);
    router.push(`/login?callbackUrl=${encodeURIComponent(pathname ?? '')}`);
  };

  const handleCancel = () => {
    setLoginRequired(false);
  };

  return (
    <AlertModal
      open={isLoginRequired}
      title="로그인이 필요한 서비스입니다"
      cancelText="취소"
      confirmText="로그인"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};
