'use client';

import { useWatch } from 'react-hook-form';

import { Textarea } from '@/shared/ui/textarea/textarea';

import type { StepProps } from '../../model/meeting-create.types';

/**
 * 3단계: 모임 설명 입력
 */
export const StepDescription = ({ form }: StepProps) => {
  const { register, control } = form;
  const description = useWatch({ control, name: 'description' });
  const descriptionLength = Math.min(description?.length ?? 0, 500);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
            모임 설명<span className="text-destructive ml-0.5">*</span>
          </label>
          <span className="text-sosoeat-gray-500 text-xs">{descriptionLength}/500</span>
        </div>
        <Textarea
          placeholder="모임을 설명해주세요"
          className="bg-sosoeat-gray-100 text-sosoeat-gray-900 placeholder:text-sosoeat-gray-600 focus-visible:border-sosoeat-orange-500 focus:border-sosoeat-orange-500 rounded-[12px] border-transparent text-sm font-normal transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base"
          rows={6}
          maxLength={500}
          {...register('description')}
        />
      </div>
    </div>
  );
};
