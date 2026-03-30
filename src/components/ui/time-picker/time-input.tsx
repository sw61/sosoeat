'use client';

import * as React from 'react';

import { Clock as ClockIcon } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/popover';
import { cn } from '@/lib/utils';

import { TimePicker } from './time-picker';

interface TimeInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

/**
 * 폼 전용 TimeInput 컴포넌트입니다.
 * 시와 분을 모두 선택하면 자동으로 팝업이 닫히도록 설계되어 직관적인 사용성을 제공합니다.
 */
const TimeInput = React.forwardRef<HTMLInputElement, TimeInputProps>(
  ({ className, label, errorMessage, value, onChange, name, onBlur, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    // 시와 분 중 무엇이 선택되었는지 추적합니다. (열릴 때 초기화)
    const [selectedParts, setSelectedParts] = React.useState<Set<'hour' | 'minute'>>(new Set());

    const handleTimeSelect = (nextTime: string, type: 'hour' | 'minute') => {
      // 값 반영
      if (onChange) {
        const event = {
          target: { name, value: nextTime },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }

      // 선택된 파트 업데이트
      const nextParts = new Set(selectedParts);
      nextParts.add(type);
      setSelectedParts(nextParts);

      // 시와 분이 모두 한 번씩 클릭되었다면 팝업 닫기
      if (nextParts.has('hour') && nextParts.has('minute')) {
        setOpen(false);
      }
    };

    const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) {
        // 팝업이 처음 열릴 때는 선택 추적 상태를 초기화
        setSelectedParts(new Set());
      }
    };

    return (
      <div className="flex w-full flex-col gap-1.5 font-sans">
        {label && <label className="text-sosoeat-gray-900 text-sm font-medium">{label}</label>}

        <input
          type="text"
          className="sr-only"
          aria-hidden="true"
          tabIndex={-1}
          ref={ref}
          name={name}
          value={(value as string) || ''}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />

        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className={cn(
                'bg-sosoeat-gray-100 text-sosoeat-gray-900 h-10 w-full justify-start gap-2 rounded-[12px] border border-transparent px-3.5 py-2 text-left text-sm font-normal transition-all md:h-12 md:text-base',
                'hover:border-sosoeat-gray-200 hover:bg-sosoeat-gray-100 hover:text-inherit',
                'focus:border-sosoeat-gray-200 focus:ring-sosoeat-gray-300 focus-visible:ring-sosoeat-gray-300 focus:ring-2 focus:outline-none focus-visible:ring-2',
                !value && 'text-sosoeat-gray-600',
                errorMessage && 'border-destructive',
                className
              )}
            >
              <ClockIcon className="text-sosoeat-gray-800 h-6 w-6 shrink-0" />
              <span className="truncate">{(value as string) || '00:00'}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="border-sosoeat-gray-100 w-[160px] overflow-hidden rounded-[12px] p-0 shadow-lg"
            align="start"
            sideOffset={8}
          >
            <TimePicker
              value={(value as string) || '00:00'}
              onChange={handleTimeSelect}
              className="h-[266px] w-[160px] border-none shadow-none"
            />
          </PopoverContent>
        </Popover>

        {errorMessage && (
          <p className="animate-in fade-in slide-in-from-top-1 text-destructive text-xs">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

TimeInput.displayName = 'TimeInput';

export { TimeInput };
