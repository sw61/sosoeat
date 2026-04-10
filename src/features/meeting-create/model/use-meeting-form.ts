import { useState } from 'react';
import { type Control, type Resolver, useForm, useWatch } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { DEFAULT_FORM_VALUES, STEPS, TOTAL_STEPS } from './meeting-create.constants';
import { meetingFormSchema } from './meeting-create.schema';
import type { MeetingFormData, MeetingStep } from './meeting-create.types';

function isNonEmpty(value: unknown): boolean {
  if (typeof value === 'string') return value.trim().length > 0;
  if (typeof value === 'number') return Number.isFinite(value);
  return value !== undefined && value !== null;
}

function useStepValid(control: Control<MeetingFormData>, step: MeetingStep): boolean {
  const category = useWatch({ control, name: 'type' });
  const name = useWatch({ control, name: 'name' });
  const region = useWatch({ control, name: 'region' });
  const address = useWatch({ control, name: 'address' });
  const image = useWatch({ control, name: 'image' });
  const description = useWatch({ control, name: 'description' });
  const meetingDate = useWatch({ control, name: 'meetingDate' });
  const meetingTime = useWatch({ control, name: 'meetingTime' });
  const registrationEndDate = useWatch({ control, name: 'registrationEndDate' });
  const registrationEndTime = useWatch({ control, name: 'registrationEndTime' });
  const capacity = useWatch({ control, name: 'capacity' });

  switch (step) {
    case 'category':
      return isNonEmpty(category);
    case 'basicInfo':
      return isNonEmpty(name) && isNonEmpty(region) && isNonEmpty(address) && isNonEmpty(image);
    case 'description':
      return isNonEmpty(description);
    case 'schedule':
      return (
        isNonEmpty(meetingDate) &&
        isNonEmpty(meetingTime) &&
        isNonEmpty(registrationEndDate) &&
        isNonEmpty(registrationEndTime) &&
        isNonEmpty(capacity)
      );
  }
}

/**
 * MeetingCreateModal 전용 폼 상태 관리 훅.
 * react-hook-form + zod으로 전체 4단계를 하나의 폼으로 관리한다.
 */
export const useMeetingForm = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const form = useForm<MeetingFormData>({
    resolver: zodResolver(meetingFormSchema) as unknown as Resolver<MeetingFormData>,
    defaultValues: { ...DEFAULT_FORM_VALUES },
    mode: 'onSubmit',
  });

  const currentStep: MeetingStep = STEPS[currentStepIndex];
  const stepLabel = `${currentStepIndex + 1}/${TOTAL_STEPS}`;
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === TOTAL_STEPS - 1;

  const isCurrentStepValid = useStepValid(form.control, currentStep);

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
