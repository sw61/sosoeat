'use client';

import { useState } from 'react';
import { Controller } from 'react-hook-form';

import Image from 'next/image';

import { ImagePlus, Loader2 } from 'lucide-react';

import { MIME_TO_EXT, useUploadImage } from '@/entities/image';
import { cn } from '@/shared/lib/utils';
import { Input } from '@/shared/ui/input/input';

import type { StepProps } from '../../model/meeting-create.types';

import { LocationSearchModal } from './location-search/location-search-modal';
import type { LocationSearchResult } from './location-search/model/location-search.types';

const ACCEPTED_IMAGE_TYPES = Object.keys(MIME_TO_EXT).join(',');

/**
 * 2단계: 모임 기본 정보 입력 (이름, 장소, 이미지)
 */
export const StepBasicInfo = ({ form }: StepProps) => {
  const { register } = form;
  const { mutateAsync, isPending, error: uploadError } = useUploadImage('meetings');
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const handleLocationSelect = (result: LocationSearchResult) => {
    const region = [result.region1, result.region2].filter(Boolean).join(' ');
    form.setValue('region', region, { shouldValidate: true });
    form.setValue('addressBase', result.addressName, { shouldValidate: true });
    form.setValue('address', result.placeName);
    form.setValue('latitude', result.latitude);
    form.setValue('longitude', result.longitude);
    setLocationModalOpen(false);
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await mutateAsync(file);
      onChange(url);
    } catch {
      // 업로드 실패 시 uploadError로 표시
    } finally {
      e.target.value = ''; // 성공이나 실패 모두 초기화하여 재시도 가능하도록 처리
    }
  };

  const requiredIndicator = <span className="text-destructive ml-0.5">*</span>;
  const inputClassName =
    'h-10 md:h-12 bg-sosoeat-gray-100 text-sm md:text-base font-normal text-sosoeat-gray-900 border border-transparent placeholder:text-sosoeat-gray-600 transition-all focus:border-sosoeat-orange-500 focus-visible:border-sosoeat-orange-500';

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
          <Controller
            control={form.control}
            name="addressBase"
            render={({ field }) => (
              <div className="relative">
                <Input
                  placeholder="건물, 지번 또는 도로명 검색"
                  className={cn(inputClassName, 'cursor-pointer pr-10')}
                  readOnly
                  onClick={() => setLocationModalOpen(true)}
                  value={field.value}
                  onChange={field.onChange}
                />
                <Image
                  src="/icons/location.svg"
                  alt="위치 아이콘"
                  width={24}
                  height={24}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
                />
              </div>
            )}
          />
          <Input placeholder="상세주소" className={inputClassName} {...register('address')} />
        </div>
      </div>

      <LocationSearchModal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelect={handleLocationSelect}
      />

      {/* 이미지 업로드 */}
      <Controller
        control={form.control}
        name="image"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1.5">
            <label className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base">
              이미지{requiredIndicator}
            </label>
            <div className={field.value && !isPending ? 'relative w-full' : 'relative w-[147px]'}>
              {field.value && !isPending ? (
                <Image
                  src={field.value as string}
                  alt="모임 이미지"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full rounded-2xl"
                />
              ) : (
                <div className="bg-sosoeat-gray-100 text-sosoeat-gray-500 flex h-[147px] w-[147px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-sm">
                  {isPending ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <ImagePlus className="h-6 w-6" />
                  )}
                </div>
              )}
              {/* 이미지 업로드/변경을 위한 클릭 overlay */}
              {!isPending && (
                <label
                  htmlFor="image"
                  className="absolute inset-0 cursor-pointer rounded-2xl"
                  aria-label="이미지 선택"
                />
              )}
              <input
                type="file"
                id="image"
                className="sr-only"
                accept={ACCEPTED_IMAGE_TYPES}
                disabled={isPending}
                onChange={(e) => handleFileChange(e, field.onChange)}
              />
            </div>
            {(error || uploadError) && (
              <p className="animate-in fade-in slide-in-from-top-1 text-destructive text-xs">
                {uploadError instanceof Error
                  ? uploadError.message
                  : error?.message || '이미지 업로드에 실패했습니다.'}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};
