export const ESTABLISHED_BADGE_BASE_CLASS =
  'flex flex-row justify-center items-center pr-3 pl-2 gap-2.5 rounded-[24px] bg-white h-[30px] shrink-0 shadow-none text-sm leading-5 font-medium';

export const ESTABLISHED_VARIANT_CLASS = {
  groupEat: 'border border-sosoeat-orange-700 text-sosoeat-orange-700',
  groupBuy: 'border border-sosoeat-blue-500 text-sosoeat-blue-500',
} as const;

export const ESTABLISHED_LABEL_CLASS = 'flex flex-row items-center gap-0.5';

export const ICON_SRC = {
  groupEat: '/icons/check-circle-orange.svg',
  groupBuy: '/icons/check-circle-blue.svg',
} as const;

export const PENDING_BADGE_CLASS =
  'border-sosoeat-gray-200 h-[30px] shrink-0 rounded-full bg-white px-3 text-sm leading-5 font-medium text-[#6B7280] shadow-none hover:bg-white';
