'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

import type { MiddleStepProps, PasswordValues } from '@/features/auth/model';
import { getErrorAnimationClasses, getInputClasses, passwordSchema } from '@/features/auth/model';
import { AuthSubmitButton } from '@/features/auth/ui/auth-submit-button/auth-submit-button';
import { Button } from '@/shared/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

export const PasswordStep = ({
  onNext,
  onPrev,
  defaultValues,
}: MiddleStepProps<PasswordValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'all',
    defaultValues,
  });

  const passwordError = touchedFields.password ? errors.password : undefined;
  const hasPasswordError = !!passwordError?.message?.trim();

  const confirmError = touchedFields.passwordConfirm ? errors.passwordConfirm : undefined;
  const hasConfirmError = !!confirmError?.message?.trim();

  const onSubmit = (data: PasswordValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
      <div className="flex-1 space-y-4">
        {/* 비밀번호 필드 */}
        <Field className="gap-0">
          <FieldLabel htmlFor="password" className="mb-1 ml-1 text-sm font-normal">
            비밀번호<span className="text-destructive ml-0.5">*</span>
          </FieldLabel>
          <FieldContent className="gap-1.5">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className={getInputClasses(hasPasswordError)}
                {...register('password')}
                aria-invalid={hasPasswordError}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="비밀번호 표시 토글"
                className="text-sosoeat-gray-800 hover:text-sosoeat-gray-900 absolute top-1/2 right-4 -translate-y-1/2 focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
            <div className={getErrorAnimationClasses(hasPasswordError)}>
              <div className="overflow-hidden">
                <FieldError errors={[passwordError]} className="mt-1 ml-1" />
              </div>
            </div>
          </FieldContent>
        </Field>

        {/* 비밀번호 확인 필드 */}
        <Field className="gap-0">
          <FieldLabel htmlFor="passwordConfirm" className="mb-1 ml-1 gap-0 text-sm font-normal">
            비밀번호 확인<span className="text-destructive ml-0.5">*</span>
          </FieldLabel>
          <FieldContent className="gap-1.5">
            <div className="relative">
              <Input
                id="passwordConfirm"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 입력하세요"
                className={getInputClasses(hasConfirmError)}
                {...register('passwordConfirm')}
                aria-invalid={hasConfirmError}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label="비밀번호 확인 표시 토글"
                className="text-sosoeat-gray-800 hover:text-sosoeat-gray-900 absolute top-1/2 right-4 -translate-y-1/2 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
            <div className={getErrorAnimationClasses(hasConfirmError)}>
              <div className="overflow-hidden">
                <FieldError errors={[confirmError]} className="ml-1" />
              </div>
            </div>
          </FieldContent>
        </Field>
      </div>

      <div className="mt-2 flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="bg-sosoeat-gray-100 mt-2 h-[52px] rounded-[16px] px-4 text-base font-semibold text-gray-500 shadow-sm transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
          <span>이전</span>
        </Button>
        <AuthSubmitButton label="다음" isActive={isValid} className="h-[52px] flex-1" />
      </div>
    </form>
  );
};
