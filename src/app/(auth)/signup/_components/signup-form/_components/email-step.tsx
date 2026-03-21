'use client';

import { useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import {
  getAuthFieldError,
  getErrorAnimationClasses,
  getInputClasses,
} from '../../../../_components';
import { AuthSubmitButton } from '../../../../_components/auth-submit-button';
import { emailSchema, EmailValues } from '../signup-form.schema';
import { FirstStepProps } from '../signup-form.types';

export const EmailStep = ({ onNext, defaultValues }: FirstStepProps<EmailValues>) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    mode: 'all',
    delayError: 1000,
    defaultValues,
  });

  const emailValue = useWatch({
    control,
    name: 'email',
  });

  // 공통 헬퍼 함수를 사용하여 에러 노출 여부 결정
  const emailError = getAuthFieldError(errors.email, touchedFields.email, isSubmitted, emailValue);
  const hasError = !!emailError;

  /**
   * TODO: 추후 API 연동 시 실제 이메일 중복 확인 로직 구현 필요
   */
  const onSubmit = (data: EmailValues) => {
    onNext(data);
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
                <FieldError errors={[emailError]} className="ml-1" />
              </div>
            </div>
          </FieldContent>
        </Field>
      </div>

      <AuthSubmitButton label="다음" isActive={isValid} className="mt-4 h-[52px]" />
    </form>
  );
};
