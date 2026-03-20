'use client';

import Link from 'next/link';

import { Funnel, Step } from '@/components/common/funnel/funnel';

import {
  EmailStep,
  NicknameStep,
  PasswordStep,
  SignupHeader,
  SignupStepHeader,
  SignupStepper,
} from './_components';
import { useSignupForm } from './hooks';
import { STEP_TO_NUMBER } from './signup-form.constants';
import { SignupFormValues, SignupStep } from './signup-form.types';

interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => Promise<void>;
  isLoading?: boolean;
  defaultStep?: SignupStep;
}

export const SignupForm = ({ onSubmit, isLoading, defaultStep = 'email' }: SignupFormProps) => {
  const { step, formData, handleEmailNext, handlePasswordNext, handleNicknameNext, handlePrev } =
    useSignupForm({
      onSubmit,
      defaultStep,
    });

  const currentStepNumber = STEP_TO_NUMBER[step];

  return (
    <div className="relative flex w-full max-w-[450px] min-w-[375px] flex-col rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm">
      <div className="flex h-full flex-col gap-y-6">
        <SignupHeader />

        <SignupStepper currentStepNumber={currentStepNumber} />

        <SignupStepHeader step={step} />

        <div className="flex-1">
          <Funnel step={step}>
            <Step name="email">
              <EmailStep onNext={handleEmailNext} defaultValues={{ email: formData.email }} />
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
            <Step name="nickname">
              <NicknameStep
                onNext={handleNicknameNext}
                onPrev={handlePrev}
                isLoading={isLoading}
                defaultValues={{ nickname: formData.nickname }}
              />
            </Step>
          </Funnel>
        </div>
      </div>
      {/* Bottom Login Link */}
      <div className="flex justify-center pt-6">
        <Link
          href="/login"
          className="group text-sm font-medium text-gray-400 transition-colors hover:text-gray-500"
        >
          이미 계정이 있으신가요?{' '}
          <span className="text-sosoeat-orange-600 font-bold group-hover:underline">로그인</span>
        </Link>
      </div>
    </div>
  );
};
