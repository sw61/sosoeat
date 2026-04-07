'use client';

import { useState } from 'react';
import { type FieldErrors, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { useUploadImage } from '@/entities/image';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/shared/ui/dialog';

import { BASIC_INFO_KEYS, EDIT_TABS } from '../model/meeting-edit.constants';
import { type MeetingEditFormData, meetingEditFormSchema } from '../model/meeting-edit.schema';
import type { MeetingEditModalProps, MeetingEditTab } from '../model/meeting-edit.types';
import { useUpdateMeeting } from '../model/use-update-meeting';

import { TabBasicInfo, TabSchedule } from './_components';

const MeetingEditForm = ({
  onClose,
  meetingId,
  defaultValues,
  onSuccess,
}: Omit<MeetingEditModalProps, 'open'>) => {
  const [activeTab, setActiveTab] = useState<MeetingEditTab>('basicInfo');
  const { mutateAsync } = useUpdateMeeting(meetingId, onSuccess);
  const {
    mutateAsync: uploadImage,
    isPending: isUploadPending,
    error: uploadError,
  } = useUploadImage('meetings');

  const form = useForm<MeetingEditFormData>({
    resolver: zodResolver(meetingEditFormSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file).catch(() => null);
      if (url) form.setValue('image', url, { shouldDirty: true, shouldValidate: true });
    } finally {
      e.target.value = '';
    }
  };

  const handleSubmit = async (data: MeetingEditFormData) => {
    try {
      await mutateAsync({
        name: data.name,
        type: data.type,
        region: data.region,
        address: data.address,
        ...(data.latitude !== undefined && { latitude: data.latitude }),
        ...(data.longitude !== undefined && { longitude: data.longitude }),
        dateTime: new Date(`${data.meetingDate}T${data.meetingTime}`),
        registrationEnd: new Date(`${data.registrationEndDate}T${data.registrationEndTime}`),
        capacity: Number(data.capacity),
        image: data.image,
        description: data.description,
      });
      onClose();
    } catch {
      // useUpdateMeeting.onError에서 toast 처리 — 모달만 유지
    }
  };

  /**
   * 폼 검증 실패 시 (isSubmit 시 에러가 났을 때) 실행되는 콜백
   * 서로 다른 탭에 존재하는 필드들의 에러를 확인하여,
   * 에러가 난 화면 탭으로 자동 전환(Switch)시켜 유저가 에러를 확인할 수 있도록 합니다.
   * (React Hook Form은 안 보이는 탭의 input을 포커스할 수 없어 silent failure가 발생할 수 있기 때문)
   */
  const handleInvalid = (errors: FieldErrors<MeetingEditFormData>) => {
    const hasBasicInfoError = BASIC_INFO_KEYS.some(
      (key) => !!errors[key as keyof MeetingEditFormData]
    );

    if (hasBasicInfoError && activeTab !== 'basicInfo') {
      setActiveTab('basicInfo');
    } else if (!hasBasicInfoError && activeTab !== 'schedule') {
      setActiveTab('schedule');
    }
  };

  return (
    <div className="flex max-h-[90dvh] w-full flex-col gap-0 px-4 pt-8 pb-6 md:p-12">
      {/* 헤더 */}
      <h2 className="text-sosoeat-gray-900 text-xl font-semibold md:text-2xl">모임 수정하기</h2>

      {/* 탭 */}
      <div className="border-sosoeat-gray-200 mt-5 flex border-b">
        {EDIT_TABS.map((tab: (typeof EDIT_TABS)[number]) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'flex-1 pb-3 text-sm font-medium transition-colors md:text-base',
              activeTab === tab.value
                ? 'border-sosoeat-orange-600 text-sosoeat-orange-600 border-b-2'
                : 'text-sosoeat-gray-500'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 내용 + 저장 버튼 */}
      <form
        onSubmit={form.handleSubmit(handleSubmit, handleInvalid)}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <div className="min-h-0 flex-1 overflow-y-auto pt-12 pb-6 [scrollbar-width:thin]">
          {activeTab === 'basicInfo' ? (
            <TabBasicInfo
              form={form}
              isUploadPending={isUploadPending}
              uploadError={uploadError}
              onFileChange={handleFileChange}
            />
          ) : (
            <TabSchedule form={form} />
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex shrink-0 gap-3 pt-4 md:gap-4 md:pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-sosoeat-gray-300 text-sosoeat-gray-700 hover:bg-sosoeat-gray-50 h-[48px] flex-1 rounded-[12px] bg-white text-sm font-semibold transition-all md:h-[60px] md:rounded-[16px] md:text-base"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isDirty || form.formState.isSubmitting || isUploadPending}
            className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 disabled:bg-sosoeat-gray-300 disabled:text-sosoeat-gray-500 h-[48px] flex-1 rounded-[12px] text-sm font-semibold text-white transition-all md:h-[60px] md:rounded-[16px] md:text-base"
          >
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
};

/**
 * 탭 기반 모달 — 모임 수정
 *
 * @example
 * const { isOpen, open, close } = useModal();
 *
 * <button onClick={open}>모임 수정</button>
 * <MeetingEditModal
 *   open={isOpen}
 *   onClose={close}
 *   meetingId={meeting.id}
 *   defaultValues={toMeetingEditFormData(meeting)}
 * />
 */
export const MeetingEditModal = ({
  open,
  onClose,
  meetingId,
  defaultValues,
  onSuccess,
}: MeetingEditModalProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        aria-modal="true"
        className={cn(
          'flex h-auto max-h-[90dvh] w-[343px] min-w-[343px] flex-col gap-0 overflow-hidden rounded-[24px] p-0 md:w-[544px] md:max-w-none md:rounded-[40px]',
          '[&_button[data-slot=dialog-close]]:text-sosoeat-gray-700',
          '[&_button[data-slot=dialog-close]]:top-8 [&_button[data-slot=dialog-close]]:right-8',
          '[&_button[data-slot=dialog-close]]:h-6 [&_button[data-slot=dialog-close]]:w-6',
          '[&_button[data-slot=dialog-close]_svg]:h-6 [&_button[data-slot=dialog-close]_svg]:w-6',
          '[&_button[data-slot=dialog-close]]:p-0'
        )}
      >
        <DialogTitle className="sr-only">모임 수정</DialogTitle>
        <MeetingEditForm
          onClose={onClose}
          meetingId={meetingId}
          defaultValues={defaultValues}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
};
