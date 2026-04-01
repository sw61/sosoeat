'use client';

import * as React from 'react';
import { ko } from 'react-day-picker/locale';

import { format, startOfDay } from 'date-fns';
import { Calendar as CalendarIcon, Triangle } from 'lucide-react';

import { Button } from '@/components/ui/button/button';
import { Calendar } from '@/components/ui/calendar/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover/popover';
import { cn } from '@/lib/utils';

export type DatePickerVariant = 'groupEat' | 'groupBuy';

const variantStyles: Record<
  DatePickerVariant,
  {
    selectedDay: string;
    resetButton: string;
    applyButton: string;
  }
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

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  variant?: DatePickerVariant;
}

/**
 * 폼(Form)에서 사용되는 커스텀 DatePicker 컴포넌트입니다.
 * 필터용인 DetailDatePicker와 달리, react-hook-form 등과 직접 연동되며
 * input 필드와 같은 외형을 가지지만 동일한 선택 및 초기화 로직을 공유합니다.
 */
const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      className,
      label,
      errorMessage,
      value,
      onChange,
      name,
      onBlur,
      variant = 'groupEat',
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    // 선택 취소/적용 전 임시 선택값을 관리합니다. (DetailDatePicker와 동일한 로직)
    const [draft, setDraft] = React.useState<Date | undefined>(undefined);

    const styles = variantStyles[variant];

    // value가 문자열(yyyy-MM-dd)로 넘어올 경우 Date 객체로 파싱하여 캘린더에 전달합니다.
    const d = value ? new Date(value as string) : null;
    const dateValue = d && !isNaN(d.getTime()) ? d : null;

    const handleReset = () => {
      setDraft(undefined);
      if (onChange) {
        // react-hook-form 등이 value를 읽어갈 수 있도록 이벤트 핸들러 호출
        const event = {
          target: { name, value: '' },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const handleApply = () => {
      if (onChange) {
        const formattedDate = draft ? format(draft, 'yyyy-MM-dd') : '';
        const event = {
          target: { name, value: formattedDate },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
      setOpen(false);
    };

    const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) {
        // 팝업이 열릴 때 현재 고정값을 draft에 복사하여 편집 시작
        setDraft(dateValue ?? undefined);
      }
    };

    return (
      <div className="flex w-full flex-col gap-1.5 font-sans">
        {label && <label className="text-sosoeat-gray-900 text-sm font-medium">{label}</label>}

        {/* 실제 폼 데이터가 담기는 숨겨진 input */}
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
                'bg-sosoeat-gray-100 text-sosoeat-gray-900 h-10 w-full justify-start gap-2 rounded-lg border border-transparent px-3.5 py-2 text-left text-sm font-normal transition-all md:h-12 md:text-base',
                'hover:border-sosoeat-gray-200 hover:bg-sosoeat-gray-100 hover:text-inherit',
                'focus:border-sosoeat-orange-500 focus-visible:border-sosoeat-orange-500 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                !dateValue && 'text-sosoeat-gray-600',
                errorMessage && 'border-destructive',
                className
              )}
            >
              <CalendarIcon className="text-sosoeat-gray-800 h-6 w-6 shrink-0" />
              <span className="truncate">
                {dateValue ? format(dateValue, 'yyyy. MM. dd', { locale: ko }) : 'YYYY-MM-DD'}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="h-fit w-[298px] gap-0 rounded-[12px] p-6 shadow-lg"
            align="start"
            sideOffset={8}
          >
            <Calendar
              mode="single"
              fixedWeeks
              disabled={{ before: startOfDay(new Date()) }}
              selected={draft}
              onSelect={setDraft}
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
            <div className="mt-2 flex w-full gap-2">
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

DatePicker.displayName = 'DatePicker';

export { DatePicker };
