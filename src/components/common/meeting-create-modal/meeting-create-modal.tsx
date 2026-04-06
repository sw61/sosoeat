'use client';

import { Funnel, Step } from '@/components/common/funnel/funnel';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';

import { useMeetingForm } from './hooks/use-meeting-form';
import { StepBasicInfo, StepCategory, StepDescription, StepSchedule } from './_components';
import { STEP_TITLES } from './meeting-create-modal.constants';
import type { MeetingCreateModalProps, MeetingFormData } from './meeting-create-modal.types';

const CTA_BASE_CLASS =
  'h-[48px] flex-1 rounded-[12px] text-sm md:text-base font-semibold transition-all md:h-[60px] md:rounded-[16px]';

const StepIndicator = ({ label }: { label: string }) => {
  const [current, total] = label.split('/');
  const isFull = current === total;

  return (
    <span className="text-lg font-semibold md:text-2xl">
      <span className={isFull ? 'text-sosoeat-gray-500' : 'text-sosoeat-gray-700'}>{current}</span>
      <span className="text-sosoeat-gray-500">/{total}</span>
    </span>
  );
};

export const MeetingCreateForm = ({ onClose, onSubmit }: Omit<MeetingCreateModalProps, 'open'>) => {
  const {
    form,
    currentStep,
    stepLabel,
    isFirstStep,
    isLastStep,
    isCurrentStepValid,
    goNext,
    goPrev,
    reset,
  } = useMeetingForm();

  const handleSubmit = async (data: MeetingFormData) => {
    const payload = {
      name: data.name,
      type: data.type,
      region: data.region,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      dateTime: new Date(`${data.meetingDate}T${data.meetingTime}`),
      registrationEnd: new Date(`${data.registrationEndDate}T${data.registrationEndTime}`),
      capacity: data.capacity,
      image: data.image,
      description: data.description,
    };
    try {
      await onSubmit(payload);
      reset();
      onClose();
    } catch {
      // useCreateMeeting.onError에서 toast 처리 — 모달만 유지
    }
  };

  return (
    <div className="flex min-h-0 w-full flex-col gap-0 px-6 pt-8 pb-6 md:p-12">
      {/* ── 헤더: 단계 표시 + 제목 ── */}
      <div className="flex items-center gap-2 text-xl font-semibold md:text-2xl">
        <h2 className="text-sosoeat-gray-900">{STEP_TITLES[currentStep]}</h2>
        <StepIndicator label={stepLabel} />
      </div>

      {/* ── 퍼널 본문 ── */}
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div className="min-h-0 flex-1 overflow-y-auto py-6 md:py-8">
          <Funnel step={currentStep}>
            <Step name="category">
              <StepCategory form={form} />
            </Step>
            <Step name="basicInfo">
              <StepBasicInfo form={form} />
            </Step>
            <Step name="description">
              <StepDescription form={form} />
            </Step>
            <Step name="schedule">
              <StepSchedule form={form} />
            </Step>
          </Funnel>
        </div>

        {/* ── 하단 버튼 ── */}
        <div className="flex gap-3 pt-4 md:gap-4 md:pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={isFirstStep ? onClose : goPrev}
            className={cn(
              CTA_BASE_CLASS,
              'border-sosoeat-gray-300 text-sosoeat-gray-700 hover:bg-sosoeat-gray-50 bg-white'
            )}
          >
            {isFirstStep ? '취소' : '이전'}
          </Button>

          {isLastStep ? (
            <Button
              type="submit"
              disabled={!isCurrentStepValid}
              className={cn(
                CTA_BASE_CLASS,
                'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 text-white',
                'disabled:bg-sosoeat-gray-300 disabled:text-sosoeat-gray-500'
              )}
            >
              모임 만들기
            </Button>
          ) : (
            <Button
              type="button"
              disabled={!isCurrentStepValid}
              onClick={goNext}
              className={cn(
                CTA_BASE_CLASS,
                'bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 text-white',
                'disabled:bg-sosoeat-gray-300 disabled:text-sosoeat-gray-500'
              )}
            >
              다음
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

/**
 * 4단계 퍼널 모달 — 모임 생성
 *
 * @example
 * const { isOpen, open, close } = useModal();
 *
 * <button onClick={open}>모임 만들기</button>
 * <MeetingCreateModal
 *   open={isOpen}
 *   onClose={close}
 *   onSubmit={handleCreate}
 * />
 */
export const MeetingCreateModal = ({ open, onClose, onSubmit }: MeetingCreateModalProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        aria-modal="true"
        className={cn(
          'flex h-auto max-h-[90dvh] w-[343px] flex-col gap-0 overflow-hidden rounded-[24px] p-0 md:w-[544px] md:max-w-none md:rounded-[40px]',
          '[&_button[data-slot=dialog-close]]:text-sosoeat-gray-700',
          '[&_button[data-slot=dialog-close]]:top-8 [&_button[data-slot=dialog-close]]:right-8',
          '[&_button[data-slot=dialog-close]]:h-6 [&_button[data-slot=dialog-close]]:w-6',
          '[&_button[data-slot=dialog-close]_svg]:h-6 [&_button[data-slot=dialog-close]_svg]:w-6',
          '[&_button[data-slot=dialog-close]]:p-0'
        )}
      >
        <DialogTitle className="sr-only">모임 생성</DialogTitle>
        <MeetingCreateForm onClose={onClose} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
