'use client';

import { Controller } from 'react-hook-form';

import Image from 'next/image';

import { cn } from '@/shared/lib/utils';

import { MEETING_CATEGORY_LABELS } from '../../model/meeting-create.constants';
import type { MeetingFormData, StepProps } from '../../model/meeting-create.types';

const CATEGORY_ICONS: Record<string, string> = {
  groupEat: '/images/group-eat-modal.png',
  groupBuy: '/images/group-buy-modal.png',
};

const CATEGORY_SELECTED_STYLES: Record<string, string> = {
  groupEat: 'bg-sosoeat-orange-100 border-sosoeat-orange-600 text-sosoeat-orange-600',
  groupBuy: 'bg-sosoeat-blue-50 border-sosoeat-blue-600 text-sosoeat-blue-600',
};

/**
 * 1단계: 모임 카테고리 선택
 */
export const StepCategory = ({ form }: StepProps<MeetingFormData>) => {
  return (
    <Controller
      control={form.control}
      name="type"
      render={({ field }) => (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5">
            <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
              이 모임은 어떤 종류인가요?<span className="text-destructive ml-0.5">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 md:gap-[29px]">
              {Object.entries(MEETING_CATEGORY_LABELS).map(([value, label]) => (
                <label
                  key={value}
                  className={cn(
                    'flex cursor-pointer flex-col items-center justify-center gap-3 transition-all',
                    'rounded-[24px] border-2 text-sm font-medium',
                    'h-[136px] w-full md:max-w-[209px]',
                    field.value === value
                      ? CATEGORY_SELECTED_STYLES[value]
                      : 'bg-sosoeat-gray-100 text-sosoeat-gray-700 border-sosoeat-gray-200'
                  )}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    value={value}
                    checked={field.value === value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <div className="relative h-20 w-20">
                    <Image
                      src={CATEGORY_ICONS[value]}
                      alt={label as string}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold md:text-base">{label as string}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
};
