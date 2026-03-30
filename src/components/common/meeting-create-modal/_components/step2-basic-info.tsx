'use client';

import Image from 'next/image';

import { ImagePlus, Loader2, MapPin } from 'lucide-react';

import { Input } from '@/components/ui/input/input';
import { cn } from '@/lib/utils';
import { MIME_TO_EXT, useUploadImage } from '@/services/images';

import type { StepProps } from '../meeting-create-modal.types';

const ACCEPTED_IMAGE_TYPES = Object.keys(MIME_TO_EXT).join(',');

/**
 * 2단계: 모임 기본 정보 입력 (이름, 장소, 이미지)
 */
export const StepBasicInfo = ({ form }: StepProps) => {
  const { register, setValue } = form;
  const {
    mutateAsync,
    data: publicUrl,
    isPending,
    error: uploadError,
  } = useUploadImage('meetings');

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await mutateAsync(file).catch(() => null);
    if (url) setValue('image', url, { shouldDirty: true, shouldValidate: true });
  };

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
        <div className="relative h-[147px] w-[147px]">
          {publicUrl && !isPending ? (
            <Image
              src={publicUrl}
              alt="모임 이미지"
              width={147}
              height={147}
              className="rounded-2xl object-cover"
            />
          ) : (
            <div className="bg-sosoeat-gray-100 text-sosoeat-gray-500 flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-sm">
              {isPending ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <ImagePlus className="h-6 w-6" />
              )}
            </div>
          )}
          {/* 이미지가 없을 때만 영역 전체를 클릭 가능하게 overlay */}
          {!publicUrl && (
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
            onChange={onFileChange}
          />
        </div>
        {uploadError && (
          <p className="text-destructive text-xs">
            {uploadError instanceof Error ? uploadError.message : '이미지 업로드에 실패했습니다.'}
          </p>
        )}
      </div>
    </div>
  );
};
