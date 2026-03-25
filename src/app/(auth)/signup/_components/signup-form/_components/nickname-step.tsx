'use client';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import {
  AuthSubmitButton,
  getAuthFieldError,
  getErrorAnimationClasses,
  getInputClasses,
} from '@/app/(auth)/_components';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { nicknameSchema, NicknameValues } from '../signup-form.schema';
import { MiddleStepProps } from '../signup-form.types';

export const NicknameStep = ({
  onNext,
  onPrev,
  isLoading,
  defaultValues,
}: MiddleStepProps<NicknameValues>) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<NicknameValues>({
    resolver: zodResolver(nicknameSchema),
    mode: 'onTouched',
    delayError: 1000,
    defaultValues,
  });

  const nicknameValue = useWatch({
    control,
    name: 'nickname',
  });

  // 공통 헬퍼 함수를 사용하여 에러 노출 여부 결정
  const nicknameError = getAuthFieldError(errors.nickname, nicknameValue);
  const hasError = !!nicknameError;

  const onSubmit = (data: NicknameValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
      <div className="flex-1">
        <Field className="gap-0">
          <FieldLabel htmlFor="nickname" className="mb-1 ml-1 gap-0 text-sm font-normal">
            닉네임<span className="text-destructive ml-0.5">*</span>
          </FieldLabel>
          <FieldContent className="gap-1.5">
            <Input
              id="nickname"
              placeholder="닉네임을 입력하세요"
              className={getInputClasses(hasError)}
              {...register('nickname')}
              aria-invalid={hasError}
            />
            <div className={getErrorAnimationClasses(hasError)}>
              <div className="overflow-hidden">
                <FieldError errors={[nicknameError]} className="ml-1" />
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
          disabled={isLoading}
          className="bg-sosoeat-gray-100 mt-2 h-[52px] rounded-[16px] px-4 text-base font-semibold text-gray-500 shadow-sm transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
          <span>이전</span>
        </Button>
        <AuthSubmitButton
          label="회원가입"
          isActive={isValid}
          isLoading={isLoading}
          className="h-[52px] flex-1"
        />
      </div>
    </form>
  );
};
