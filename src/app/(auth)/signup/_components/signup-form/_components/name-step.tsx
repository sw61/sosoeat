'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import {
  AuthSubmitButton,
  getErrorAnimationClasses,
  getInputClasses,
} from '@/app/(auth)/_components';
import { Button } from '@/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { nameSchema } from '../signup-form.schema';
import { MiddleStepProps, NameValues } from '../signup-form.types';

export const NameStep = ({
  onNext,
  onPrev,
  isLoading,
  defaultValues,
}: MiddleStepProps<NameValues>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<NameValues>({
    resolver: zodResolver(nameSchema),
    mode: 'all',
    defaultValues,
  });

  const nameError = touchedFields.name ? errors.name : undefined;
  const hasError = !!nameError?.message?.trim();

  const onSubmit = (data: NameValues) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
      <div className="flex-1">
        <Field className="gap-0">
          <FieldLabel htmlFor="name" className="mb-1 ml-1 gap-0 text-sm font-normal">
            이름<span className="text-destructive ml-0.5">*</span>
          </FieldLabel>
          <FieldContent className="gap-1.5">
            <Input
              id="name"
              placeholder="이름을 입력하세요"
              className={getInputClasses(hasError)}
              {...register('name')}
              aria-invalid={hasError}
            />
            <div className={getErrorAnimationClasses(hasError)}>
              <div className="overflow-hidden">
                <FieldError errors={[nameError]} className="ml-1" />
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
