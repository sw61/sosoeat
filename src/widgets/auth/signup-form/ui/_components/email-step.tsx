'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import type { EmailValues, FirstStepProps } from '@/features/auth/model';
import {
  emailSchema,
  getErrorAnimationClasses,
  getInputClasses,
  useCheckEmailDuplicateMutation,
} from '@/features/auth/model';
import { AuthSubmitButton } from '@/features/auth/ui/auth-submit-button/auth-submit-button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

type EmailStepProps = FirstStepProps<EmailValues>;

export const EmailStep = ({ onNext, defaultValues }: EmailStepProps) => {
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const { mutateAsync: checkEmail } = useCheckEmailDuplicateMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitted },
    setError,
  } = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur',
    defaultValues,
  });

  const displayError =
    (touchedFields.email || isSubmitted) && errors.email ? errors.email : undefined;
  const isDisabled = !!displayError?.message?.trim() || isCheckingEmail;

  const checkEmailDuplicate = async (email: string): Promise<boolean> => {
    try {
      setIsCheckingEmail(true);
      const { available } = await checkEmail(email);
      if (!available) {
        setError('email', {
          type: 'manual',
          message: '이미 사용 중인 이메일입니다.',
        });
        return false;
      }
      return true;
    } catch (error) {
      setError('email', {
        type: 'manual',
        message: error instanceof Error ? error.message : '네트워크 오류가 발생했습니다.',
      });
      return false;
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const onSubmit = async (data: EmailValues) => {
    const isAvailable = await checkEmailDuplicate(data.email);
    if (isAvailable) {
      onNext(data);
    }
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
              type="text"
              placeholder="example@email.com"
              className={getInputClasses(!!displayError?.message?.trim())}
              {...register('email')}
              aria-invalid={!!displayError?.message?.trim()}
            />
            <div className={getErrorAnimationClasses(!!displayError?.message?.trim())}>
              <div className="overflow-hidden">
                <FieldError errors={[displayError]} className="ml-1" />
              </div>
            </div>
          </FieldContent>
        </Field>
      </div>

      <AuthSubmitButton
        label="다음"
        isActive={!isDisabled}
        isLoading={isCheckingEmail}
        className="mt-4 h-13"
      />
    </form>
  );
};
