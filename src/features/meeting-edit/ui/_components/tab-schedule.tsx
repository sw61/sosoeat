'use client';

import { Controller, type UseFormReturn } from 'react-hook-form';

import { DateTimeField } from '@/shared/ui/date-picker/date-time-field';
import { Input } from '@/shared/ui/input/input';

import type { MeetingEditFormData } from '../../model/meeting-edit.schema';

interface TabProps {
  form: UseFormReturn<MeetingEditFormData>;
}

const requiredIndicator = <span className="text-destructive ml-0.5">*</span>;

/**
 * 일정 및 인원 탭: 모임 날짜, 시간, 최대 인원
 */
export const TabSchedule = ({ form }: TabProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="flex flex-col gap-5">
      {/* 모임 일정 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          모임 일정{requiredIndicator}
        </label>
        <Controller
          name="meetingDate"
          control={control}
          render={({ field: dateField }) => (
            <Controller
              name="meetingTime"
              control={control}
              render={({ field: timeField }) => (
                <DateTimeField
                  dateValue={dateField.value}
                  timeValue={timeField.value}
                  onDateChange={dateField.onChange}
                  onTimeChange={timeField.onChange}
                />
              )}
            />
          )}
        />
        {(errors.meetingDate || errors.meetingTime) && (
          <p className="text-destructive ml-1 text-xs">
            {errors.meetingDate?.message || errors.meetingTime?.message}
          </p>
        )}
      </div>

      {/* 모집 마감 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          모집 마감 날짜{requiredIndicator}
        </label>
        <Controller
          name="registrationEndDate"
          control={control}
          render={({ field: dateField }) => (
            <Controller
              name="registrationEndTime"
              control={control}
              render={({ field: timeField }) => (
                <DateTimeField
                  dateValue={dateField.value}
                  timeValue={timeField.value}
                  onDateChange={dateField.onChange}
                  onTimeChange={timeField.onChange}
                />
              )}
            />
          )}
        />
        {(errors.registrationEndDate || errors.registrationEndTime) && (
          <p className="text-destructive ml-1 text-xs">
            {errors.registrationEndDate?.message || errors.registrationEndTime?.message}
          </p>
        )}
      </div>

      {/* 모임 정원 */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="edit-capacity"
          className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base"
        >
          모임 정원{requiredIndicator}
        </label>
        <Input
          id="edit-capacity"
          type="text"
          inputMode="numeric"
          placeholder="최소 2명 이상 입력해 주세요."
          className="bg-sosoeat-gray-100 text-sosoeat-gray-900 placeholder:text-sosoeat-gray-600 h-10 border-transparent text-sm font-normal md:h-12 md:text-base"
          onKeyDown={(e) => {
            if (e.key.length > 1 || e.ctrlKey || e.metaKey) return;
            if (!/^\d$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            const text = e.clipboardData.getData('text');
            if (!/^\d+$/.test(text)) e.preventDefault();
          }}
          onCompositionStart={(e) => e.preventDefault()}
          {...register('capacity', { valueAsNumber: true })}
        />
        {errors.capacity && (
          <p className="text-destructive ml-1 text-xs">{errors.capacity.message}</p>
        )}
      </div>
    </div>
  );
};
