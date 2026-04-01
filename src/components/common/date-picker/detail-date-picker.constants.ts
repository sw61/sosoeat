import type { DetailDatePickerProps } from './detail-date-picker.type';

export const DETAIL_DATE_PICKER_TRIGGER_CLASS = 'min-w-42.5';

export const DETAIL_DATE_PICKER_TRIGGER_CONTENT_CLASS =
  'flex min-w-23.25 items-center justify-end gap-1 text-base font-medium';

export const DETAIL_DATE_PICKER_POPOVER_CONTENT_CLASS = 'w-74.5 p-4';

export const DETAIL_DATE_PICKER_CALENDAR_CLASS =
  'w-62.5 text-sm font-semibold [&_button]:focus-visible:border-transparent! [&_button]:focus-visible:ring-0! [&_button:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:hover:bg-transparent! [&_button:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:active:bg-transparent! [&_button[data-range-end=true]:not([data-range-start=true])]:rounded-l-none! [&_button[data-range-middle=true]]:rounded-none! [&_button[data-range-start=true]:not([data-range-end=true])]:rounded-r-none! [&_td[data-focused=true]_button]:border-transparent! [&_td[data-focused=true]_button]:ring-0! [&_td[data-focused=true]_button:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:bg-transparent! [&_td[data-today=true]]:bg-transparent! [&_td[data-today=true]_button:not([data-range-start=true]):not([data-range-end=true]):not([data-range-middle=true])]:bg-transparent!';

export const DETAIL_DATE_PICKER_CHEVRON_CLASS = 'text-foreground h-1.75 w-3.75';

export const DETAIL_DATE_PICKER_ACTIONS_CLASS = 'flex w-full justify-center gap-2';

export const DETAIL_DATE_PICKER_ACTION_BUTTON_CLASS = 'h-10 w-29.5 text-sm font-semibold';

export const DETAIL_DATE_PICKER_VARIANT_STYLES: Record<
  NonNullable<DetailDatePickerProps['variant']>,
  {
    calendarSelected: string;
    resetButton: string;
    applyButton: string;
  }
> = {
  groupEat: {
    calendarSelected:
      '[&_button[data-range-start=true][data-range-end=true]]:!rounded-[var(--radius-md)] [&_button[data-range-start=true][data-range-end=true]]:!bg-sosoeat-orange-500 [&_button[data-range-start=true][data-range-end=true]]:!text-white [&_button[data-range-start=true]:not([data-range-end=true])]:!bg-sosoeat-orange-500 [&_button[data-range-start=true]:not([data-range-end=true])]:!text-white [&_button[data-range-end=true]:not([data-range-start=true])]:!bg-sosoeat-orange-500 [&_button[data-range-end=true]:not([data-range-start=true])]:!text-white [&_button[data-range-middle=true]]:!bg-sosoeat-orange-100 [&_button[data-range-middle=true]]:!text-sosoeat-orange-900',
    resetButton:
      'bg-white border border-sosoeat-orange-600 text-sosoeat-orange-700 rounded-xl hover:bg-sosoeat-orange-50',
    applyButton: 'bg-sosoeat-orange-600 text-white rounded-xl hover:bg-sosoeat-orange-700',
  },
  groupBuy: {
    calendarSelected:
      '[&_button[data-range-start=true][data-range-end=true]]:!rounded-[var(--radius-md)] [&_button[data-range-start=true][data-range-end=true]]:!bg-sosoeat-blue-500 [&_button[data-range-start=true][data-range-end=true]]:!text-white [&_button[data-range-start=true]:not([data-range-end=true])]:!bg-sosoeat-blue-500 [&_button[data-range-start=true]:not([data-range-end=true])]:!text-white [&_button[data-range-end=true]:not([data-range-start=true])]:!bg-sosoeat-blue-500 [&_button[data-range-end=true]:not([data-range-start=true])]:!text-white [&_button[data-range-middle=true]]:!bg-sosoeat-blue-100 [&_button[data-range-middle=true]]:!text-sosoeat-blue-900',
    resetButton:
      'bg-white border border-sosoeat-blue-500 text-sosoeat-blue-600 rounded-xl hover:bg-sosoeat-blue-50',
    applyButton: 'bg-sosoeat-blue-500 text-white rounded-xl hover:bg-sosoeat-blue-600',
  },
};
