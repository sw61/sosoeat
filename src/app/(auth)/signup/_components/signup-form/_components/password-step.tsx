'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import {
  getAuthFieldError,
  getErrorAnimationClasses,
  getInputClasses,
} from '../../../../_components';
import { AuthSubmitButton } from '../../../../_components/auth-submit-button';
import { passwordSchema, PasswordValues } from '../signup-form.schema';
import { MiddleStepProps } from '../signup-form.types';

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
    control,
    trigger,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'all',
    delayError: 1000,
    defaultValues,
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
  });
  const passwordConfirmValue = useWatch({
    control,
    name: 'passwordConfirm',
  });

  // 이전 비밀번호 값을 ref로 관리
  const prevPasswordRef = useRef(passwordValue);

  // 비밀번호가 실제로 변경되었을 때만 비밀번호 확인 필드 유효성 재검사 (일치 여부 확인)
  useEffect(() => {
    if (prevPasswordRef.current !== passwordValue && passwordConfirmValue) {
      trigger('passwordConfirm');
    }
    prevPasswordRef.current = passwordValue;
  }, [passwordValue, passwordConfirmValue, trigger]);

  // 공통 헬퍼 함수를 사용하여 에러 노출 여부 결정
  const passwordError = getAuthFieldError(
    errors.password,
    touchedFields.password,
    isSubmitted,
    passwordValue
  );
  const hasPasswordError = !!passwordError;

  const confirmError = getAuthFieldError(
    errors.passwordConfirm,
    touchedFields.passwordConfirm,
    isSubmitted,
    passwordConfirmValue
  );
  const hasConfirmError = !!confirmError;

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
