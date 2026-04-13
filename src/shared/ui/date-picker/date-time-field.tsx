'use client';

import { DateTimePicker } from './date-time-picker';

export interface DateTimeFieldProps {
  dateValue: string;
  timeValue: string;
  onDateChange: (v: string) => void;
  onTimeChange: (v: string) => void;
}

export function DateTimeField({
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
}: DateTimeFieldProps) {
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
