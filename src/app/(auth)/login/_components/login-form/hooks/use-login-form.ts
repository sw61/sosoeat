'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { LoginRequest } from '@/types/generated-client/models';

import { loginSchema } from '../login-form.schema';
import { LoginFormProps } from '../login-form.types';

export const useLoginForm = ({ onSubmit, isLoading, defaultValues }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors, touchedFields },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues,
  });

  const isPending = isLoading || isSubmitting;

  const handleFormSubmit = handleSubmit(async (data: LoginRequest) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // useWatch를 제거하고 formState.errors를 직접 사용합니다.
  // react-hook-form의 errors 객체는 에러 상태가 변할 때만 리렌더링을 유발하므로 훨씬 효율적입니다.
  const emailError = touchedFields.email ? errors.email : undefined;
  const passwordError = touchedFields.password ? errors.password : undefined;

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
    hasEmailError: !!emailError?.message?.trim(),
    hasPasswordError: !!passwordError?.message?.trim(),
  };
};
