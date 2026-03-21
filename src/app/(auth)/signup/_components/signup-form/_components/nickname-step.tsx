'use client';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { MiddleStepProps, nicknameSchema, NicknameValues } from '../signup-form.types';
import { getErrorAnimationClasses, getInputClasses } from '../signup-form.utils';

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
    mode: 'all',
    defaultValues,
  });

  const nicknameValue = useWatch({
    control,
    name: 'nickname',
  });

  // 에러가 존재하고 값이 실제로 입력되었을 때만 에러 UI 표시
  const hasError = !!errors.nickname && !!nicknameValue?.length;

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
                <FieldError errors={[errors.nickname]} className="mt-1 ml-1" />
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
          disabled={isLoading}
          className="hover:bg-sosoeat-gray-100 h-[52px] rounded-[16px] px-4 text-base font-semibold text-gray-500 shadow-sm transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
          <span>이전</span>
        </Button>
        <Button
          type="submit"
          className={cn(
            'h-[52px] flex-1 rounded-[16px] text-base font-semibold shadow-sm transition-all duration-300',
            isValid && !isLoading
              ? 'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 text-white'
              : 'bg-sosoeat-gray-300 text-sosoeat-gray-700'
          )}
          disabled={!isValid || isLoading}
        >
          {isLoading ? '회원가입 중...' : '회원가입'}
        </Button>
      </div>
    </form>
  );
};
