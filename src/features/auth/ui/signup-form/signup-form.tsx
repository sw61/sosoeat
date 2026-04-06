'use client';

import Link from 'next/link';

import { useSignUp } from '@/entities/auth';
import { Funnel, Step } from '@/shared/ui/funnel/funnel';

import { useSignupForm } from './hooks/use-signup-form';
import {
  EmailStep,
  NameStep,
  PasswordStep,
  SignupHeader,
  SignupStepHeader,
  SignupStepper,
} from './_components';
import { STEP_TO_NUMBER } from './signup-form.constants';
import { SignupStep } from './signup-form.types';

interface SignupFormProps {
  defaultStep?: SignupStep;
}

export const SignupForm = ({ defaultStep = 'email' }: SignupFormProps) => {
  const { mutateAsync: signUp, isPending } = useSignUp();
  const {
    step,
    formData,
    emailServerError,
    handleEmailNext,
    handlePasswordNext,
    handleNameNext,
    handlePrev,
  } = useSignupForm({
    onSubmit: signUp,
    defaultStep,
  });

  const currentStepNumber = STEP_TO_NUMBER[step];

  return (
    <div className="border-sosoeat-gray-100 relative flex w-full max-w-[450px] min-w-[375px] flex-col rounded-[24px] border bg-white p-8 shadow-sm">
      <div className="flex h-full flex-col gap-y-6">
        <SignupHeader />

        <SignupStepper currentStepNumber={currentStepNumber} />

        <SignupStepHeader step={step} />

        <div className="flex-1">
          <Funnel step={step}>
            <Step name="email">
              <EmailStep
                onNext={handleEmailNext}
                defaultValues={{ email: formData.email }}
                serverError={emailServerError}
              />
            </Step>
            <Step name="password">
              <PasswordStep
                onNext={handlePasswordNext}
                onPrev={handlePrev}
                defaultValues={{
                  password: formData.password,
                  passwordConfirm: formData.passwordConfirm,
                }}
              />
            </Step>
            <Step name="name">
              <NameStep
                onNext={handleNameNext}
                onPrev={handlePrev}
                isLoading={isPending}
                defaultValues={{ name: formData.name }}
              />
            </Step>
          </Funnel>
        </div>
      </div>
      {/* Bottom Login Link */}
      <div className="flex justify-center pt-6">
        <Link
          href="/login"
          className="group hover:text-sosoeat-gray-900 text-sosoeat-gray-700 text-sm font-medium transition-colors"
        >
          이미 계정이 있으신가요?{' '}
          <span className="text-sosoeat-orange-600 font-bold group-hover:underline">로그인</span>
        </Link>
      </div>
    </div>
  );
};
