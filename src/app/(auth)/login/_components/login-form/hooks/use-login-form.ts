'use client';

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { getAuthFieldError } from '@/app/(auth)/_components/auth.utils';

import { loginSchema } from '../login-form.schema';
import { LoginFormProps, LoginFormValues } from '../login-form.types';

export const useLoginForm = ({ onSubmit, isLoading, defaultValues }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    getFieldState,
    formState,
    formState: { isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    delayError: 1000,
    defaultValues,
  });

  const watchEmail = useWatch({ control, name: 'email' });
  const watchPassword = useWatch({ control, name: 'password' });

  const isPending = isLoading || isSubmitting;

  const handleFormSubmit = handleSubmit(async (data: LoginFormValues) => {
    if (onSubmit) {
      await onSubmit(data);
    } else {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          console.log('Mock login success:', data);
          alert(`로그인 성공! 이메일: ${data.email}`);
          resolve();
        }, 1000);
      });
    }
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // 에러 노출 조건 통일: getFieldState를 사용하여 touched 상태를 더 정확하게 체크 (키보드 대응 개선)
  const emailState = getFieldState('email', formState);
  const passwordState = getFieldState('password', formState);

  const emailError = getAuthFieldError(emailState.error, watchEmail);

  const passwordError = getAuthFieldError(passwordState.error, watchPassword);

  const isButtonActive = isValid;

  return {
    register,
    handleFormSubmit,
    emailError,
    passwordError,
    showPassword,
    toggleShowPassword,
    isPending,
    isButtonActive,
    hasEmailError: !!emailError,
    hasPasswordError: !!passwordError,
  };
};
