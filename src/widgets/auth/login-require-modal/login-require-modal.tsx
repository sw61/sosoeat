'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/auth';
import { AlertModal } from '@/shared/ui/alert-modal/alert-modal';

export const LoginRequireModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoginRequired, loginRequiredCallbackUrl, setLoginRequired } = useAuthStore();

  const handleConfirm = () => {
    setLoginRequired(false);
    const callbackUrl = loginRequiredCallbackUrl ?? pathname ?? '';
    router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
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
