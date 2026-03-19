'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { ko } from 'react-day-picker/locale';

import { startOfDay } from 'date-fns';
import { ChevronDown, Triangle } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { Calendar } from '@/components/ui/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/popover';
import { cn } from '@/lib/utils';

const variantStyles = {
  groupEat: {
    triggerText: 'text-sosoeat-orange-500',
    rangeEdge: '[&_button]:!bg-sosoeat-orange-500 [&_button]:!text-white',
    rangeMiddle: '[&_button]:!bg-sosoeat-orange-100 [&_button]:!text-sosoeat-orange-900',
    resetButton:
      'bg-white border border-sosoeat-orange-600 text-sosoeat-orange-700 rounded-xl hover:bg-sosoeat-orange-50',
    applyButton: 'bg-sosoeat-orange-600 text-white rounded-xl hover:bg-sosoeat-orange-700',
  },
  groupBuy: {
    triggerText: 'text-sosoeat-blue-500',
    rangeEdge: '[&_button]:!bg-sosoeat-blue-500 [&_button]:!text-white',
    rangeMiddle: '[&_button]:!bg-sosoeat-blue-100 [&_button]:!text-sosoeat-blue-900',
    resetButton:
      'bg-white border border-sosoeat-blue-500 text-sosoeat-blue-600 rounded-xl hover:bg-sosoeat-blue-50',
    applyButton: 'bg-sosoeat-blue-500 text-white rounded-xl hover:bg-sosoeat-blue-600',
  },
};

export function DetailDatePicker({
  variant = 'groupEat',
  value,
  onChange,
}: {
  variant?: keyof typeof variantStyles;
  value: DateRange | null;
  onChange: (range: DateRange | null) => void;
}) {
  const styles = variantStyles[variant];

  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  //초기화 버튼
  const handleReset = () => {
    setDateRange(null);
    onChange(null);
  };

  const handleApply = () => {
    if (dateRange?.from && !dateRange?.to) {
      onChange({ from: dateRange.from, to: dateRange.from });
    } else if (!dateRange?.from && dateRange?.to) {
      onChange({ from: dateRange.to, to: dateRange.to });
    } else {
      onChange(dateRange);
    }
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen) setDateRange(value);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger className="text-base font-medium" asChild>
        <Button
          variant="outline"
          className="text-muted-foreground h-[32px] w-[93px] justify-between border-none text-left font-normal"
        >
          <span className="flex items-center gap-2">
            <span>날짜 전체</span>
          </span>
          <ChevronDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[298px] p-4">
        <Calendar
          locale={ko}
          mode="range"
          disabled={{ before: startOfDay(new Date()) }}
          required={true}
          selected={dateRange ?? undefined}
          onSelect={setDateRange}
          className="w-[250px] text-sm font-semibold"
          classNames={{
            range_start: styles.rangeEdge,
            range_end: styles.rangeEdge,
            range_middle: styles.rangeMiddle,
          }}
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
