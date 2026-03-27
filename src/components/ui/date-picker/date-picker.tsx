'use client';

import * as React from 'react';

import { Calendar as CalendarIcon } from 'lucide-react';

import { Input } from '@/components/ui/input/input';
import { cn } from '@/lib/utils';

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, errorMessage, ...props }, ref) => {
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && <label className="text-sosoeat-gray-900 text-sm font-medium">{label}</label>}
        <div className="group/date-picker relative">
          <Input
            type="date"
            ref={ref}
            className={cn(
              'block w-full appearance-none px-3.5 py-2 text-sm transition-all',
              'focus:ring-sosoeat-gray-300 focus:ring-2',
              'relative z-10 bg-transparent', // 기본 아이콘을 숨기기 위한 처리
              className
            )}
            {...props}
          />
          {/* 브라우저 기본 달력 아이콘 위치에 디자인 아이콘 배치 (데코용) */}
          <CalendarIcon className="text-sosoeat-gray-400 group-focus-within/date-picker:text-sosoeat-gray-900 pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transition-colors" />
        </div>
        {errorMessage && (
          <p className="animate-in fade-in slide-in-from-top-1 text-xs text-red-500">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };
