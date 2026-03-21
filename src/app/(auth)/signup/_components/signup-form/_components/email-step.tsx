'use client';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { emailSchema, EmailValues, FirstStepProps } from '../signup-form.types';
import { getErrorAnimationClasses, getInputClasses } from '../signup-form.utils';

// 테스트를 위한 임시 이메일 중복 확인 모의 함수
const checkEmailDuplicateMock = async (email: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (email === 'test@example.com') {
    return { isDuplicate: true };
  }
  return { isDuplicate: false };
};

export const EmailStep = ({ onNext, defaultValues }: FirstStepProps<EmailValues>) => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isValid },
  } = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    mode: 'all',
    defaultValues,
  });

  const emailValue = useWatch({
    control,
    name: 'email',
  });

  // React Hook Form은 blur 시 즉시 터치 오류를 뱉기 때문에,
  // 실제 사용자가 이메일에 '값을 한 글자 이상 입력했을 때만' 에러 UI가 보이도록 UX를 최적화
  const hasError = !!errors.email && !!emailValue?.length;

  // TanStack Query를 활용한 서버 통신(단방향 POST/검증) 모듈화: 추후 실제 서비스 API 훅으로 교체
  const { mutate, isPending } = useMutation({
    mutationFn: checkEmailDuplicateMock,
  });

  // 중복 이메일 시뮬레이션 (test@example.com) 추후: API 연동 과정에서 삭제 예정
  const onSubmit = (data: EmailValues) => {
    mutate(data.email, {
      onSuccess: (res) => {
        if (res.isDuplicate) {
          setError('email', {
            type: 'manual',
            message: '이미 사용 중인 이메일입니다.',
          });
        } else {
          onNext(data);
        }
      },
      onError: () => {
        setError('email', {
          type: 'manual',
          message: '중복 확인 중 오류가 발생했습니다.',
        });
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
      <div className="flex-1">
        <Field className="gap-0">
          <FieldLabel htmlFor="email" className="mb-1 ml-1 gap-0 text-sm font-normal">
            이메일<span className="text-destructive ml-0.5">*</span>
          </FieldLabel>
          <FieldContent className="gap-1.5">
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              className={getInputClasses(hasError)}
              {...register('email')}
              aria-invalid={hasError}
            />
            <div className={getErrorAnimationClasses(hasError)}>
              <div className="overflow-hidden">
                <FieldError errors={[errors.email]} className="mt-1 ml-1" />
              </div>
            </div>
          </FieldContent>
        </Field>
      </div>

      <Button
        type="submit"
        className={cn(
          'mt-4 h-[52px] w-full rounded-[16px] text-base font-semibold shadow-sm transition-all duration-300',
          isValid && !isPending
            ? 'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 text-white'
            : 'bg-sosoeat-gray-300 text-sosoeat-gray-700'
        )}
        disabled={!isValid || isPending}
      >
        {isPending ? (
          <span>확인 중...</span>
        ) : (
          <>
            <span>다음</span>
            <ChevronRight className="h-6 w-6" />
          </>
        )}
      </Button>
    </form>
  );
};
