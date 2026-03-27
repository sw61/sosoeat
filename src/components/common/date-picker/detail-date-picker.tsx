'use client';

import { useState } from 'react';
import { ko } from 'react-day-picker/locale';

import { format, startOfDay } from 'date-fns';
import { ChevronDown, Triangle } from 'lucide-react';

import type { DetailDatePickerProps } from '@/components/common/date-picker/detail-date-picker.type';
import { Button } from '@/components/ui/button/button';
import { Calendar } from '@/components/ui/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/popover';
import { cn } from '@/lib/utils';

const variantStyles: Record<
  NonNullable<DetailDatePickerProps['variant']>,
  {
    calendarSelected: string;
    resetButton: string;
    applyButton: string;
  }
> = {
  groupEat: {
    calendarSelected:
      '[&_button[data-selected-single=true]]:!rounded-[var(--radius-md)] [&_button[data-selected-single=true]]:!bg-sosoeat-orange-500 [&_button[data-selected-single=true]]:!text-white',
    resetButton:
      'bg-white border border-sosoeat-orange-600 text-sosoeat-orange-700 rounded-xl hover:bg-sosoeat-orange-50',
    applyButton: 'bg-sosoeat-orange-600 text-white rounded-xl hover:bg-sosoeat-orange-700',
  },
  groupBuy: {
    calendarSelected:
      '[&_button[data-selected-single=true]]:!rounded-[var(--radius-md)] [&_button[data-selected-single=true]]:!bg-sosoeat-blue-500 [&_button[data-selected-single=true]]:!text-white',
    resetButton:
      'bg-white border border-sosoeat-blue-500 text-sosoeat-blue-600 rounded-xl hover:bg-sosoeat-blue-50',
    applyButton: 'bg-sosoeat-blue-500 text-white rounded-xl hover:bg-sosoeat-blue-600',
  },
};

function formatTriggerLabel(value: Date | null): string {
  if (!value) return '날짜 전체';
  return format(value, 'yyyy-MM-dd');
}

export function DetailDatePicker({
  variant = 'groupEat',
  value,
  onChange,
  className,
}: DetailDatePickerProps) {
  const styles = variantStyles[variant];

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Date | undefined>(undefined);

  const handleReset = () => {
    setDraft(undefined);
    onChange(null);
  };

  const handleApply = () => {
    onChange(draft ?? null);
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) setDraft(value ?? undefined);
  };

  const triggerLabel = formatTriggerLabel(value);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger type="button" className={cn('min-w-[93px]', className)}>
        <span>{triggerLabel}</span>
        <ChevronDown className="text-sosoeat-gray-600 size-[17px] shrink-0" aria-hidden />
      </PopoverTrigger>
      <PopoverContent className="w-[298px] p-4">
        <Calendar
          locale={ko}
          mode="single"
          disabled={{ before: startOfDay(new Date()) }}
          selected={draft}
          onSelect={(d) => setDraft(d)}
          className={cn('w-[250px] text-sm font-semibold', styles.calendarSelected)}
          buttonVariant={'ghost'}
          components={{
            Chevron: ({ orientation, className, ...props }) =>
              orientation === 'left' ? (
                <Triangle
                  className={cn('text-foreground h-[7px] w-[15px]', className)}
                  fill="currentColor"
                  strokeWidth={0}
                  style={{ transform: 'rotate(-90deg)' }}
                  {...props}
                />
              ) : (
                <Triangle
                  className={cn('text-foreground h-[7px] w-[15px]', className)}
                  fill="currentColor"
                  strokeWidth={0}
                  style={{ transform: 'rotate(90deg)' }}
                  {...props}
                />
              ),
          }}
        />
        <div className="flex w-full justify-center gap-2">
          <Button
            variant="outline"
            className={cn('h-10 w-[118px] text-sm font-semibold', styles.resetButton)}
            onClick={handleReset}
            type="button"
          >
            초기화
          </Button>
          <Button
            className={cn('h-10 w-[118px] text-sm font-semibold', styles.applyButton)}
            onClick={handleApply}
            type="button"
          >
            적용
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
