'use client';

import { Controller } from 'react-hook-form';

import { DatePicker } from '@/shared/ui/date-picker/date-picker';
import { Input } from '@/shared/ui/input/input';
import { TimeInput } from '@/shared/ui/time-picker/time-input';

import type { StepProps } from '../meeting-create-modal.types';

/**
 * 4단계: 모임 일정/정원 설정
 */
export const StepSchedule = ({ form }: StepProps) => {
  const { register } = form;

  const requiredIndicator = <span className="text-destructive ml-0.5">*</span>;

  return (
    <div className="flex flex-col gap-5">
      {/* 모임 일정 */}
      <fieldset className="flex flex-col gap-3">
        <legend className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          모임 일정{requiredIndicator}
        </legend>
        <div className="flex gap-3">
          <div className="flex-1">
            <Controller
              name="meetingDate"
              control={form.control}
              render={({ field }) => <DatePicker {...field} />}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="meetingTime"
              control={form.control}
              render={({ field }) => <TimeInput {...field} />}
            />
          </div>
        </div>
      </fieldset>

      {/* 모집 마감 */}
      <fieldset className="flex flex-col gap-3">
        <legend className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          모집 마감 날짜{requiredIndicator}
        </legend>
        <div className="flex gap-3">
          <div className="flex-1">
            <Controller
              name="registrationEndDate"
              control={form.control}
              render={({ field }) => <DatePicker {...field} />}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="registrationEndTime"
              control={form.control}
              render={({ field }) => <TimeInput {...field} />}
            />
          </div>
        </div>
      </fieldset>

      {/* 모임 정원 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          모임 정원{requiredIndicator}
        </label>
        <Input
          type="number"
          min={2}
          max={100}
          placeholder="정원을 입력해 주세요"
          className="bg-sosoeat-gray-100 text-sosoeat-gray-900 placeholder:text-sosoeat-gray-600 h-10 [appearance:textfield] border-transparent text-sm font-normal md:h-12 md:text-base [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...register('capacity', { valueAsNumber: true })}
        />
      </div>
    </div>
  );
};
