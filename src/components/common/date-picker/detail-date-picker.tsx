'use client';

import { useState } from 'react';
import { ko } from 'react-day-picker/locale';

import Image from 'next/image';

import { format, isSameDay, startOfDay } from 'date-fns';
import { ChevronDown, Triangle } from 'lucide-react';

import type { DetailDatePickerProps } from '@/components/common/date-picker/detail-date-picker.type';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button/button';
import { Calendar } from '@/shared/ui/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover/popover';

import {
  DETAIL_DATE_PICKER_ACTION_BUTTON_CLASS,
  DETAIL_DATE_PICKER_ACTIONS_CLASS,
  DETAIL_DATE_PICKER_CALENDAR_CLASS,
  DETAIL_DATE_PICKER_CHEVRON_CLASS,
  DETAIL_DATE_PICKER_POPOVER_CONTENT_CLASS,
  DETAIL_DATE_PICKER_TRIGGER_CLASS,
  DETAIL_DATE_PICKER_TRIGGER_CONTENT_CLASS,
  DETAIL_DATE_PICKER_VARIANT_STYLES,
} from './detail-date-picker.constants';

function formatTriggerLabel({
  valueStart,
  valueEnd,
}: {
  valueStart: Date | null;
  valueEnd: Date | null;
}): string {
  if (!valueStart && !valueEnd) return '날짜 전체';
  if (valueStart && !valueEnd) return format(valueStart, 'M.dd EEE', { locale: ko });
  if (!valueStart && valueEnd) return format(valueEnd, 'M.dd EEE', { locale: ko });
  if (valueStart && valueEnd && isSameDay(valueStart, valueEnd))
    return format(valueStart, 'M.dd EEE', { locale: ko });
  return `${format(valueStart!, 'M.dd EEE', { locale: ko })} - ${format(valueEnd!, 'M.dd EEE', { locale: ko })}`;
}

export function DetailDatePicker({
  variant = 'groupEat',
  valueStart,
  valueEnd,
  onDateChange = () => {},
  className,
}: DetailDatePickerProps) {
  const styles = DETAIL_DATE_PICKER_VARIANT_STYLES[variant];

  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<{
    valueStart: Date | undefined;
    valueEnd: Date | undefined;
  }>();

  const handleReset = () => {
    setDraft({ valueStart: undefined, valueEnd: undefined });
    onDateChange({ valueStart: null, valueEnd: null });
  };

  const handleApply = () => {
    if (!draft?.valueStart && !draft?.valueEnd) {
      onDateChange({ valueStart: null, valueEnd: null });
      setOpen(false);
      return;
    }

    onDateChange({ valueStart: draft.valueStart ?? null, valueEnd: draft.valueEnd ?? null });
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen)
      setDraft({
        valueStart: valueStart ?? undefined,
        valueEnd: valueEnd ?? undefined,
      });
  };

  const triggerLabel = formatTriggerLabel({ valueStart, valueEnd });
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger type="button" className={cn(DETAIL_DATE_PICKER_TRIGGER_CLASS, className)}>
        <span className={DETAIL_DATE_PICKER_TRIGGER_CONTENT_CLASS}>
          <Image src={'/icons/deadline-calendar.svg'} alt="Calendar" width={20} height={20} />
          {triggerLabel}
          <ChevronDown className="size-4 shrink-0" aria-hidden />
        </span>
      </PopoverTrigger>
      <PopoverContent className={DETAIL_DATE_PICKER_POPOVER_CONTENT_CLASS}>
        <Calendar
          locale={ko}
          mode="range"
          disabled={{ before: startOfDay(new Date()) }}
          selected={draft?.valueStart ? { from: draft.valueStart, to: draft.valueEnd } : undefined}
          onSelect={(d) =>
            setDraft({
              valueStart: d?.from,
              valueEnd: d?.to,
            })
          }
          className={cn(DETAIL_DATE_PICKER_CALENDAR_CLASS, styles.calendarSelected)}
          buttonVariant={'ghost'}
          components={{
            Chevron: ({ orientation, className, ...props }) =>
              orientation === 'left' ? (
                <Triangle
                  className={cn(DETAIL_DATE_PICKER_CHEVRON_CLASS, className)}
                  fill="currentColor"
                  strokeWidth={0}
                  style={{ transform: 'rotate(-90deg)' }}
                  {...props}
                />
              ) : (
                <Triangle
                  className={cn(DETAIL_DATE_PICKER_CHEVRON_CLASS, className)}
                  fill="currentColor"
                  strokeWidth={0}
                  style={{ transform: 'rotate(90deg)' }}
                  {...props}
                />
              ),
          }}
        />
        <div className={DETAIL_DATE_PICKER_ACTIONS_CLASS}>
          <Button
            variant="outline"
            className={cn(DETAIL_DATE_PICKER_ACTION_BUTTON_CLASS, styles.resetButton)}
            onClick={handleReset}
            type="button"
          >
            초기화
          </Button>
          <Button
            className={cn(DETAIL_DATE_PICKER_ACTION_BUTTON_CLASS, styles.applyButton)}
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
