import { useState } from 'react';
import { type Resolver, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { DEFAULT_FORM_VALUES, STEPS, TOTAL_STEPS } from './meeting-create.constants';
import { meetingFormSchema, STEP_REQUIRED_FIELDS } from './meeting-create.schema';
import type { MeetingFormData, MeetingStep } from './meeting-create.types';

/**
 * MeetingCreateModal 전용 폼 상태 관리 훅.
 * react-hook-form + zod으로 전체 4단계를 하나의 폼으로 관리한다.
 */
export const useMeetingForm = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const form = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormSchema) as unknown as Resolver<MeetingFormData>,
    defaultValues: { ...DEFAULT_FORM_VALUES },
    mode: 'onTouched',
  });

  const currentStep: MeetingStep = STEPS[currentStepIndex];
  const stepLabel = `${currentStepIndex + 1}/${TOTAL_STEPS}`;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOTAL_STEPS - 1;

  /** 현재 단계의 필수 필드가 모두 채워졌는지 확인 */
  const watchedValues = useWatch({
    control: form.control,
  });

  const isCurrentStepValid = (() => {
    const requiredFields = STEP_REQUIRED_FIELDS[currentStep];

    return requiredFields.every((field) => {
      const value = watchedValues[field as keyof MeetingFormData];

      if (typeof value === 'string') {
        return value.trim().length > 0;
      }
      if (typeof value === 'number') {
        return value > 0;
      }
      return !!value;
    });
  })();

  const goNext = () => {
    if (currentStepIndex < TOTAL_STEPS - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const reset = () => {
    setCurrentStepIndex(0);
    form.reset({ ...DEFAULT_FORM_VALUES });
  };

  return {
    form,
    currentStep,
    stepLabel,
    isFirstStep,
    isLastStep,
    isCurrentStepValid,
    goNext,
    goPrev,
    reset,
  };
};
