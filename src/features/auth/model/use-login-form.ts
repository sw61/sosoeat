'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSearchParams } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { LoginRequest } from '@/shared/types/generated-client/models';

import { loginSchema } from './login-form.schema';
import { useLogin } from './use-login';

interface LoginFormProps {
  defaultValues?: Partial<LoginRequest>;
}

export const useLoginForm = ({ defaultValues }: LoginFormProps) => {
  const { mutateAsync: login, isPending: isLoginPending } = useLogin();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  // 동일한 에러 토스트 중복 실행 방지
  const isErrorToastShown = useRef(false);

  const errorCode = searchParams?.get('error');

  useEffect(() => {
    if (!errorCode || isErrorToastShown.current) return;

    isErrorToastShown.current = true;

    const errorMessages: Record<string, string> = {
      social_login_failed: '소셜 로그인에 실패했습니다. 다시 시도해주세요.',
      session_error: '세션 설정 중 오류가 발생했습니다. 다시 시도해주세요.',
    };

    toast.error(errorMessages[errorCode] ?? '로그인 중 오류가 발생했습니다.');
  }, [errorCode]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors, touchedFields },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues,
  });

  const isPending = isLoginPending || isSubmitting;

  const handleFormSubmit = handleSubmit(async (data: LoginRequest) => {
    await login(data);
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const emailError = touchedFields.email ? errors.email : undefined;
  const passwordError = touchedFields.password ? errors.password : undefined;

  return {
    register,
    handleFormSubmit,
    emailError,
    passwordError,
    showPassword,
    toggleShowPassword,
    isPending,
    isButtonActive: isValid,
    hasEmailError: !!emailError?.message?.trim(),
    hasPasswordError: !!passwordError?.message?.trim(),
  };
};
