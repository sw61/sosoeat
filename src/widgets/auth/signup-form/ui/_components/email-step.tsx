'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import type { EmailValues, FirstStepProps } from '@/features/auth/model';
import { emailSchema, getErrorAnimationClasses, getInputClasses } from '@/features/auth/model';
import { AuthSubmitButton } from '@/features/auth/ui/auth-submit-button/auth-submit-button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

interface EmailStepProps extends FirstStepProps<EmailValues> {
  serverError?: string | null;
}

export const EmailStep = ({ onNext, defaultValues, serverError }: EmailStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    mode: 'all',
    defaultValues,
  });

  const emailError = touchedFields.email ? errors.email : undefined;
  const hasError = !!emailError?.message?.trim() || !!serverError;

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
              type="text"
              placeholder="example@email.com"
              className={getInputClasses(hasError)}
              {...register('email')}
              aria-invalid={hasError}
            />
            <div className={getErrorAnimationClasses(hasError)}>
              <div className="overflow-hidden">
                <FieldError
                  errors={[emailError ?? (serverError ? { message: serverError } : undefined)]}
                  className="ml-1"
                />
              </div>
            </div>
          </FieldContent>
        </Field>
      </div>

      <AuthSubmitButton label="다음" isActive={isValid} className="mt-4 h-[52px]" />
    </form>
  );
};
