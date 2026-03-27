'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  AuthSubmitButton,
  getErrorAnimationClasses,
  getInputClasses,
} from '@/app/(auth)/_components';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { emailSchema } from '../signup-form.schema';
import { EmailValues, FirstStepProps } from '../signup-form.types';

interface EmailStepProps extends FirstStepProps<EmailValues> {
  serverError?: string | null;
}

export const EmailStep = ({ onNext, defaultValues, serverError }: EmailStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onTouched',
    defaultValues,
  });

  const emailError = errors.email;
  const hasError = !!emailError || !!serverError;

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
