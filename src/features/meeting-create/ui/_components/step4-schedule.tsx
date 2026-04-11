'use client';

import { Controller, useFormState } from 'react-hook-form';

import { DateTimePicker } from '@/shared/ui/date-picker/date-time-picker';
import { Input } from '@/shared/ui/input/input';

import type { StepProps } from '../../model/meeting-create.types';

interface DateTimeFieldProps {
  dateValue: string;
  timeValue: string;
  onDateChange: (v: string) => void;
  onTimeChange: (v: string) => void;
}

function DateTimeField({ dateValue, timeValue, onDateChange, onTimeChange }: DateTimeFieldProps) {
  const dateDisplay = dateValue || 'YYYY-MM-DD';
  const timeDisplay = timeValue || '00:00';

  return (
    <DateTimePicker
      dateValue={dateValue}
      timeValue={timeValue}
      onDateChange={onDateChange}
      onTimeChange={onTimeChange}
    >
      <div className="grid cursor-pointer grid-cols-2 gap-3">
        <button
          type="button"
          className="bg-sosoeat-gray-100 text-sosoeat-gray-900 hover:border-sosoeat-gray-200 flex h-10 items-center gap-2 rounded-lg border border-transparent px-3.5 py-2 text-left text-sm font-normal transition-all md:h-12 md:text-base"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-sosoeat-gray-800 h-6 w-6 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={dateValue ? 'text-sosoeat-gray-900' : 'text-sosoeat-gray-600'}>
            {dateDisplay}
          </span>
        </button>
        <button
          type="button"
          className="bg-sosoeat-gray-100 text-sosoeat-gray-900 hover:border-sosoeat-gray-200 flex h-10 items-center gap-2 rounded-lg border border-transparent px-3.5 py-2 text-left text-sm font-normal transition-all md:h-12 md:text-base"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-sosoeat-gray-800 h-6 w-6 shrink-0"
            aria-hidden="true"
          >
            <path
              d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.71 15.18l-3.1-1.85A2 2 0 0 1 11.71 12V7.51"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className={timeValue ? 'text-sosoeat-gray-900' : 'text-sosoeat-gray-600'}>
            {timeDisplay}
          </span>
        </button>
      </div>
    </DateTimePicker>
  );
}

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
          {...register('capacity')}
        />
        {errors.capacity && (
          <p className="text-destructive ml-1 text-xs">{errors.capacity.message}</p>
        )}
      </div>
    </div>
  );
};
