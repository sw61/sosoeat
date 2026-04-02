import { Fragment } from 'react';

import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

import { SIGNUP_STEPS } from '../signup-form.constants';

interface SignupStepperProps {
  currentStepNumber: number;
}

export const SignupStepper = ({ currentStepNumber }: SignupStepperProps) => {
  return (
    <div className="flex w-full items-start">
      {SIGNUP_STEPS.map((step, index) => {
        const isCurrent = currentStepNumber === step.number;
        const isCompleted = currentStepNumber > step.number;
        const isCompletedOrCurrent = isCurrent || isCompleted;
        const isLastStep = index === SIGNUP_STEPS.length - 1;

        // 현재 단계 이후의 선(커넥터) 활성화 여부
        const isLineActive = currentStepNumber > step.number;

        return (
          <Fragment key={step.id}>
            {/* Step Item */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300',
                  isCompletedOrCurrent
                    ? 'bg-sosoeat-orange-600 text-white'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                {isCompleted ? (
                  <Check className="h-[18px] w-[18px]" strokeWidth={3} />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cn(
                  'mt-2 text-xs font-semibold transition-colors duration-300',
                  isCompletedOrCurrent ? 'text-sosoeat-orange-600' : 'text-gray-400'
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Step 사이의 선 */}
            {!isLastStep && (
              <div className="mt-5 flex-1 px-4">
                <div
                  className={cn(
                    'h-[2px] w-full transition-all duration-300',
                    isLineActive ? 'bg-sosoeat-orange-gradation' : 'bg-gray-200'
                  )}
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
