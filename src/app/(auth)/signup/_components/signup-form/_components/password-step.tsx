'use client';

import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { MiddleStepProps, passwordSchema, PasswordValues } from '../signup-form.types';
import { getErrorAnimationClasses, getInputClasses } from '../signup-form.utils';

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
    formState: { errors, isValid },
  } = useForm<PasswordValues>({
    resolver: zodResolver(passwordSchema),
    mode: 'all',
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

  // 비밀번호가 변경되었을 때, 비밀번호 확인 필드도 유효성 재검사 (일치 여부 확인)
  useEffect(() => {
    if (passwordConfirmValue) {
      trigger('passwordConfirm');
    }
  }, [passwordValue, passwordConfirmValue, trigger]);

  // 비밀번호: 값이 존재하고 에러가 있는 경우
  const hasPasswordError = !!errors.password && !!passwordValue?.length;

  // 비밀번호 확인: 에러가 존재하고 값이 1자 이상 입력되었을 때만 에러 메시지가 표시되도록 (빈 칸에서 포커스 잃을 때 에러 숨김)
  const hasConfirmError = !!errors.passwordConfirm && !!passwordConfirmValue?.length;

  const onSubmit = (data: PasswordValues) => {
    onNext(data);
  };

  // 비밀번호 필드에 에러가 있으면 비밀번호 확인 필드의 에러는 표시하지 않음
  // -> (수정) 비밀번호 유효성 검사와 비밀번호 확인 유효성 검사 메세지가 같이 나오도록 변경
  const shouldShowConfirmError = hasConfirmError;

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
                <FieldError errors={[errors.password]} className="mt-1 ml-1" />
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
            <div className={getErrorAnimationClasses(shouldShowConfirmError)}>
              <div className="overflow-hidden">
                <FieldError errors={[errors.passwordConfirm]} className="mt-1 ml-1" />
              </div>
            </div>
          </FieldContent>
        </Field>
      </div>

      <div className="mt-4 flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="hover:bg-sosoeat-gray-100 h-[52px] rounded-[16px] px-4 text-base font-semibold text-gray-500 shadow-sm transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
          <span>이전</span>
        </Button>
        <Button
          type="submit"
          className={cn(
            'relative h-[52px] flex-1 rounded-[16px] text-base font-semibold shadow-sm transition-all duration-300 disabled:cursor-not-allowed',
            isValid
              ? 'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 text-white'
              : 'bg-sosoeat-gray-300 text-sosoeat-gray-700'
          )}
          disabled={!isValid}
        >
          <span>다음</span>
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </form>
  );
};
