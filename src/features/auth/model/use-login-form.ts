'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import { createLazyZodResolver } from '@/shared/lib/lazy-zod-resolver';
import type { LoginRequest } from '@/shared/types/generated-client/models';

import { useLoginMutation } from './auth.mutations';

const loginFormResolver = createLazyZodResolver<LoginRequest>(() =>
  import('./login-form.schema').then((mod) => mod.loginSchema)
);

interface LoginFormProps {
  defaultValues?: Partial<LoginRequest>;
}

export const useLoginForm = ({ defaultValues }: LoginFormProps) => {
  const searchParams = useSearchParams();
  const { mutate: login, isPending } = useLoginMutation(searchParams?.get('callbackUrl'));
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
    setError,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<LoginRequest>({
    resolver: loginFormResolver,
    mode: 'onSubmit',
    defaultValues,
  });

  const handleFormSubmit = handleSubmit((data: LoginRequest) => {
    login(data, {
      onError: (error) => {
        setError('root', {
          message: error instanceof Error ? error.message : '로그인에 실패했습니다.',
        });
      },
    });
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const emailError = touchedFields.email || isSubmitted ? errors.email : undefined;
  const passwordError = touchedFields.password || isSubmitted ? errors.password : undefined;

  return {
    register,
    handleFormSubmit,
    emailError,
    passwordError,
    rootError: errors.root,
    showPassword,
    toggleShowPassword,
    isPending,

    hasEmailError: !!emailError?.message?.trim(),
    hasPasswordError: !!passwordError?.message?.trim(),
  };
};
