'use client';

import { Controller, useFormState } from 'react-hook-form';

import { DateTimeField } from '@/shared/ui/date-picker/date-time-field';
import { Input } from '@/shared/ui/input/input';

import type { StepProps } from '../../model/meeting-create.types';

/**
 * 4단계: 모임 일정/정원 설정
 */
export const StepSchedule = ({ form }: StepProps) => {
  const { register, control } = form;
  const { errors } = useFormState({ control });

  const requiredIndicator = <span className="text-destructive ml-0.5">*</span>;

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
        {errors.registrationEndDate && (
          <p className="text-destructive ml-1 text-xs">{errors.registrationEndDate.message}</p>
        )}
      </div>

      {/* 모임 정원 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          모임 정원{requiredIndicator}
        </label>
        <Input
          type="text"
          inputMode="numeric"
          placeholder="최소 2명 이상 입력해 주세요."
          className="bg-sosoeat-gray-100 text-sosoeat-gray-900 placeholder:text-sosoeat-gray-600 h-10 border-transparent text-sm font-normal md:h-12 md:text-base"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.ctrlKey || e.metaKey) return;
            if (
              !/^\d$/.test(e.key) &&
              !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
          onPaste={(e) => {
            const text = e.clipboardData.getData('text');
            if (!/^\d+$/.test(text)) e.preventDefault();
          }}
          onCompositionStart={(e) => e.preventDefault()}
          {...register('capacity')}
        />
        {errors.capacity && (
          <p className="text-destructive ml-1 text-xs">{errors.capacity.message}</p>
        )}
      </div>
    </div>
  );
};
