'use client';

import { Suspense } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { getErrorAnimationClasses, getInputClasses, useLoginForm } from '@/features/auth/model';
import { AuthSubmitButton } from '@/features/auth/ui/auth-submit-button/auth-submit-button';
import { LoginRequest } from '@/shared/types/generated-client/models';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

interface LoginFormProps {
  defaultValues?: Partial<LoginRequest>;
}

const LoginFormContent = (props: LoginFormProps) => {
  const {
    register,
    handleFormSubmit,
    showPassword,
    toggleShowPassword,
    isPending,
    emailError,
    passwordError,
    rootError,
    hasEmailError,
    hasPasswordError,
  } = useLoginForm(props);

  return (
    <form onSubmit={handleFormSubmit} className="w-full px-4 md:px-0" noValidate>
      <FieldGroup className="gap-4">
        <Field orientation="vertical" className="gap-1">
          <FieldLabel htmlFor="email" className="text-sm font-normal duration-200 md:text-base">
            이메일 <span className="text-destructive">*</span>
          </FieldLabel>
          <FieldContent>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              disabled={isPending}
              className={getInputClasses(hasEmailError)}
              {...register('email')}
              aria-invalid={hasEmailError}
            />
          </FieldContent>
          <div className={getErrorAnimationClasses(hasEmailError)}>
            <div className="overflow-hidden">
              <FieldError errors={[emailError]} className="pl-1 duration-200" />
            </div>
          </div>
        </Field>

        <Field orientation="vertical" className="gap-1">
          <FieldLabel htmlFor="password" className="text-sm font-normal duration-200 md:text-base">
            비밀번호 <span className="text-destructive">*</span>
          </FieldLabel>
          <FieldContent className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              disabled={isPending}
              className={getInputClasses(hasPasswordError)}
              {...register('password')}
              aria-invalid={hasPasswordError}
            />
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 focus-visible:outline-none"
              onClick={toggleShowPassword}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
            >
              {showPassword ? <Eye className="size-[22px]" /> : <EyeOff className="size-[22px]" />}
            </button>
          </FieldContent>
          <div className={getErrorAnimationClasses(hasPasswordError)}>
            <div className="overflow-hidden">
              <FieldError errors={[passwordError]} className="pl-1 duration-200" />
            </div>
          </div>
        </Field>

        <div className={getErrorAnimationClasses(!!rootError?.message?.trim())}>
          <div className="overflow-hidden">
            <FieldError errors={[rootError]} className="pl-1 duration-200" />
          </div>
        </div>

        <AuthSubmitButton isActive={true} isLoading={isPending} label="로그인" />
      </FieldGroup>
    </form>
  );
};

export const LoginForm = (props: LoginFormProps) => (
  <Suspense>
    <LoginFormContent {...props} />
  </Suspense>
);
