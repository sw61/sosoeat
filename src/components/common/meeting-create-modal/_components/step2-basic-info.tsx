'use client';

import { useState } from 'react';

import { ImagePlus, MapPin } from 'lucide-react';

import { Input } from '@/components/ui/input/input';
import { cn } from '@/lib/utils';

import type { StepProps } from '../meeting-create-modal.types';

import { ImageSubmit } from './_components/step2-basic-info/image-submit/image-submit';

/**
 * 2단계: 모임 기본 정보 입력 (이름, 장소, 이미지)
 */
export const StepBasicInfo = ({ form }: StepProps) => {
  const { register } = form;

  const requiredIndicator = <span className="text-destructive ml-0.5">*</span>;
  const inputClassName =
    'bg-sosoeat-gray-100 text-sm md:text-base font-normal text-sosoeat-gray-900 border-transparent placeholder:text-sosoeat-gray-600 transition-all focus:border-sosoeat-gray-200';

  return (
    <div className="flex flex-col gap-5">
      {/* 모임 이름 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          모임 이름{requiredIndicator}
        </label>
        <Input
          placeholder="모임 이름을 입력해 주세요"
          className={inputClassName}
          {...register('name')}
        />
      </div>

      {/* 장소 (주소 입력) */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          장소{requiredIndicator}
        </label>
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Input
              placeholder="건물, 지번 또는 도로명 검색"
              className={cn(inputClassName, 'pr-10')}
              {...register('region')}
            />
            <MapPin className="text-sosoeat-gray-700 absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2" />
          </div>
          <Input placeholder="상세주소" className={inputClassName} {...register('address')} />
        </div>
      </div>

      {/* 이미지 업로드 */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
          이미지{requiredIndicator}
        </label>
        <ImageSubmit form={form} />
      </div>
    </div>
  );
};
