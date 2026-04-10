'use client';

import * as React from 'react';
import { ko } from 'react-day-picker/locale';

import { format, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon, Triangle } from 'lucide-react';

import { cn } from '../../lib/utils';
import { Button } from '../button/button';
import { Calendar } from '../calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';
import { TimePicker } from '../time-picker/time-picker';

import { type DatePickerVariant } from './date-picker';

interface DateTimePickerProps {
  /** 날짜값 (yyyy-MM-dd) */
  dateValue?: string;
  /** 시간값 (HH:mm) */
  timeValue?: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 커스텀 trigger. 없으면 기본 버튼 렌더링 */
  children?: React.ReactNode;
  label?: string;
  variant?: DatePickerVariant;
  className?: string;
}

const variantStyles: Record<
  DatePickerVariant,
  { selectedDay: string; resetButton: string; applyButton: string }
> = {
  groupEat: {
    selectedDay:
      '[&_button[data-selected-single=true]]:!rounded-[var(--radius-md)] [&_button[data-selected-single=true]]:!bg-sosoeat-orange-600 [&_button[data-selected-single=true]]:!text-white',
    resetButton:
      'border-sosoeat-orange-600 text-sosoeat-orange-700 hover:text-sosoeat-orange-700 hover:bg-sosoeat-orange-100',
    applyButton: 'bg-sosoeat-orange-600 text-white hover:bg-sosoeat-orange-700',
  },
  groupBuy: {
    selectedDay:
      '[&_button[data-selected-single=true]]:!rounded-[var(--radius-md)] [&_button[data-selected-single=true]]:!bg-sosoeat-blue-500 [&_button[data-selected-single=true]]:!text-white',
    resetButton:
      'border-sosoeat-blue-500 text-sosoeat-blue-600 hover:text-sosoeat-blue-600 hover:bg-sosoeat-blue-50',
    applyButton: 'bg-sosoeat-blue-500 text-white hover:bg-sosoeat-blue-600',
  },
};

export function DateTimePicker({
  dateValue,
  timeValue,
  onDateChange,
  onTimeChange,
  open: openProp,
  onOpenChange,
  children,
  variant = 'groupEat',
  className,
}: DateTimePickerProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const open = openProp ?? internalOpen;
  const [draftDate, setDraftDate] = React.useState<Date | undefined>(undefined);
  const [draftTime, setDraftTime] = React.useState<string>('00:00');

  const styles = variantStyles[variant];

  const parsedDate = dateValue ? new Date(dateValue) : null;
  const dateDisplay = parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null;

  const handleOpenChange = (nextOpen: boolean) => {
    setInternalOpen(nextOpen);
    onOpenChange?.(nextOpen);
    if (nextOpen) {
      setDraftDate(dateDisplay ?? undefined);
      setDraftTime(timeValue || '00:00');
    }
  };

  const handleReset = () => {
    setDraftDate(undefined);
    setDraftTime('00:00');
  };

  const handleApply = () => {
    onDateChange(draftDate ? format(draftDate, 'yyyy-MM-dd') : '');
    onTimeChange(draftTime);
    handleOpenChange(false);
  };

  const displayText = dateDisplay
    ? `${format(dateDisplay, 'yyyy. MM. dd', { locale: ko })} ${timeValue || '00:00'}`
    : undefined;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        {children ?? (
          <Button
            variant="outline"
            type="button"
            className={cn(
              'bg-sosoeat-gray-100 text-sosoeat-gray-900 h-10 w-full justify-start gap-2 rounded-lg border border-transparent px-3.5 py-2 text-left text-sm font-normal transition-all md:h-12 md:text-base',
              'hover:border-sosoeat-gray-200 hover:bg-sosoeat-gray-100 hover:text-inherit',
              'focus:border-sosoeat-orange-500 focus-visible:border-sosoeat-orange-500 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
              !dateDisplay && 'text-sosoeat-gray-600',
              className
            )}
          >
            <CalendarIcon className="text-sosoeat-gray-800 h-6 w-6 shrink-0" />
            <span className="truncate">{displayText ?? 'YYYY-MM-DD 00:00'}</span>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent
        className="z-[200] h-fit w-fit gap-0 rounded-[12px] p-6 shadow-lg"
        align="start"
        sideOffset={8}
      >
        <div className="flex gap-3">
          <div className="flex flex-col">
            <Calendar
              mode="single"
              fixedWeeks
              disabled={{ before: startOfDay(new Date()) }}
              selected={draftDate}
              onSelect={setDraftDate}
              locale={ko}
              formatters={{
                formatCaption: (date, options) =>
                  format(date, 'yyyy년 M월', { locale: options?.locale }),
              }}
              className={cn('relative w-[250px] p-0 text-sm font-semibold', styles.selectedDay)}
              classNames={{
                root: 'w-full h-full p-0',
                months: 'gap-0 w-full h-full relative',
                month: 'gap-0 w-full h-full flex flex-col',
                nav: 'absolute inset-x-0 top-0 flex items-center justify-between h-[34px] z-10',
                button_previous:
                  'text-sosoeat-gray-900 flex size-6 items-center justify-center p-0 hover:bg-transparent hover:opacity-70 transition-opacity',
                button_next:
                  'flex size-6 items-center justify-center p-0 hover:bg-transparent hover:opacity-70 transition-opacity',
                month_caption: 'flex h-[34px] items-center justify-center',
                caption_label: 'text-base font-semibold text-sosoeat-gray-900 leading-none',
                table: 'w-full flex-1 border-collapse',
                weekdays: 'flex h-8 w-full items-center',
                weekday: 'text-sosoeat-gray-600 flex-1 text-center text-xs font-normal',
                week: 'flex w-full mt-0',
                day: 'flex-1 h-8 flex items-center justify-center p-0',
                day_button: 'size-8 rounded-[8px] flex items-center justify-center',
              }}
              components={{
                Chevron: ({ orientation }) => {
                  const isLeft = orientation === 'left';
                  return (
                    <Triangle
                      className={cn(
                        'fill-sosoeat-gray-700 h-[10px] w-[14px]',
                        isLeft ? '-rotate-90' : 'rotate-90'
                      )}
                      strokeWidth={0}
                    />
                  );
                },
              }}
            />

            <div className="mt-3 flex w-full gap-2">
              <Button
                variant="outline"
                className={cn(
                  'h-10 flex-1 rounded-[12px] text-sm font-semibold',
                  styles.resetButton
                )}
                onClick={handleReset}
                type="button"
              >
                초기화
              </Button>
              <Button
                className={cn(
                  'h-10 flex-1 rounded-[12px] text-sm font-semibold shadow-sm',
                  styles.applyButton
                )}
                onClick={handleApply}
                type="button"
              >
                적용
              </Button>
            </div>
          </div>

          {/* 시간 선택 - 캘린더 오른쪽 */}
          <div className="border-sosoeat-gray-100 border-l pl-3">
            <p className="text-sosoeat-gray-600 mb-2 text-xs font-medium">시간 선택</p>
            <TimePicker
              value={draftTime}
              onChange={(v) => setDraftTime(v)}
              className="h-[266px] w-[120px] border-none p-0 shadow-none"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
