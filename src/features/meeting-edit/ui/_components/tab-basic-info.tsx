'use client';

import { useState } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import Image from 'next/image';

import { ImagePlus, Loader2 } from 'lucide-react';

import { MIME_TO_EXT } from '@/entities/image';
import type { LocationSearchResult } from '@/entities/location';
import { LocationSearchModal } from '@/entities/location';
import { cn } from '@/shared/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown';
import { Input } from '@/shared/ui/input/input';
import { Textarea } from '@/shared/ui/textarea/textarea';

import { CATEGORY_OPTIONS } from '../../model/meeting-edit.constants';
import type { MeetingEditFormData } from '../../model/meeting-edit.schema';

interface TabProps {
  form: UseFormReturn<MeetingEditFormData>;
  isUploadPending: boolean;
  uploadError: Error | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ACCEPTED_IMAGE_TYPES = Object.keys(MIME_TO_EXT).join(',');

const inputClassName =
  'bg-sosoeat-gray-100 text-sm md:text-base font-normal text-sosoeat-gray-900 border border-transparent placeholder:text-sosoeat-gray-600 transition-all focus:outline-none focus:ring-0 focus:border-sosoeat-orange-500 focus-visible:ring-0 focus-visible:border-sosoeat-orange-500';

const requiredIndicator = <span className="text-destructive ml-0.5">*</span>;

/**
 * 기본정보 탭: 모임 종류, 이름, 장소, 설명, 이미지
 */
export const TabBasicInfo = ({ form, isUploadPending, uploadError, onFileChange }: TabProps) => {
  const {
    register,
    control,
    formState: { errors },
  } = form;
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const handleLocationSelect = (result: LocationSearchResult) => {
    const region = [result.region1, result.region2].filter(Boolean).join(' ');
    form.setValue('region', region, { shouldValidate: true });
    form.setValue('addressBase', result.addressName, { shouldValidate: true });
    form.setValue('address', result.placeName, { shouldValidate: true });
    form.setValue('latitude', result.latitude);
    form.setValue('longitude', result.longitude);
    setLocationModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 모임 종류 */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="edit-type"
          className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base"
        >
          모임 종류{requiredIndicator}
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => {
            const selectedLabel =
              CATEGORY_OPTIONS.find((opt) => opt.value === field.value)?.label ?? '모임 종류 선택';
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    id="edit-type"
                    type="button"
                    className={cn(
                      'flex h-10 w-full items-center justify-between rounded-[12px] px-3 text-sm md:h-12 md:text-base',
                      'bg-sosoeat-gray-100 text-sosoeat-gray-900 border border-transparent'
                    )}
                  >
                    <span className={cn(!field.value && 'text-sosoeat-gray-600')}>
                      {selectedLabel}
                    </span>
                    <Image src="/icons/arrow-down.svg" alt="" width={24} height={24} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <DropdownMenuItem
                      key={opt.value}
                      onSelect={() => field.onChange(opt.value)}
                      className={cn('h-11', opt.value === field.value && 'font-semibold')}
                    >
                      {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }}
        />
        {errors.type && <p className="text-destructive ml-1 text-xs">{errors.type.message}</p>}
      </div>

      {/* 모임 이름 */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="edit-name"
          className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base"
        >
          모임 이름{requiredIndicator}
        </label>
        <Input
          id="edit-name"
          placeholder="모임 이름을 입력해주세요"
          className={inputClassName}
          {...register('name')}
        />
        {errors.name && <p className="text-destructive ml-1 text-xs">{errors.name.message}</p>}
      </div>

      {/* 장소 */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="edit-addressBase"
          className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base"
        >
          장소{requiredIndicator}
        </label>
        <div className="flex flex-col gap-2">
          <Controller
            control={control}
            name="addressBase"
            render={({ field }) => (
              <div className="relative">
                <Input
                  id="edit-addressBase"
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
          <Input
            id="edit-address"
            placeholder="상세주소"
            className={inputClassName}
            {...register('address')}
          />
          {(errors.region || errors.addressBase) && (
            <p className="text-destructive ml-1 text-xs">
              {errors.region?.message || errors.addressBase?.message}
            </p>
          )}
        </div>
      </div>

      <LocationSearchModal
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelect={handleLocationSelect}
        mapClassName="h-24 md:h-32"
      />

      {/* 모임 설명 */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="edit-description"
          className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base"
        >
          모임 설명{requiredIndicator}
        </label>
        <Textarea
          id="edit-description"
          placeholder="모임 설명을 입력해주세요"
          className="bg-sosoeat-gray-100 text-sosoeat-gray-900 placeholder:text-sosoeat-gray-600 focus:border-sosoeat-orange-500 focus-visible:border-sosoeat-orange-500 rounded-[12px] border border-transparent text-sm font-normal transition-all focus:ring-0 focus:outline-none focus-visible:ring-0 md:text-base"
          rows={4}
          {...register('description')}
        />
        {errors.description && (
          <p className="text-destructive ml-1 text-xs">{errors.description.message}</p>
        )}
      </div>

      {/* 이미지 업로드 */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="edit-image"
          className="text-sosoeat-gray-900 ml-1 text-sm font-medium md:text-base"
        >
          이미지{requiredIndicator}
        </label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <div className="relative w-full">
              {field.value && !isUploadPending ? (
                <Image
                  src={field.value}
                  alt="모임 이미지"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full rounded-2xl"
                />
              ) : (
                <div className="bg-sosoeat-gray-100 text-sosoeat-gray-500 flex h-[147px] w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-sm">
                  {isUploadPending ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <ImagePlus className="h-6 w-6" />
                  )}
                </div>
              )}
              {!isUploadPending && (
                <label
                  htmlFor="edit-image"
                  className="absolute inset-0 cursor-pointer rounded-2xl"
                  aria-label={field.value ? '이미지 변경' : '이미지 선택'}
                />
              )}
              <input
                type="file"
                id="edit-image"
                className="sr-only"
                accept={ACCEPTED_IMAGE_TYPES}
                disabled={isUploadPending}
                onChange={onFileChange}
              />
            </div>
          )}
        />
        {(errors.image || uploadError) && (
          <p className="text-destructive ml-1 text-xs">
            {errors.image?.message ||
              (uploadError instanceof Error
                ? uploadError.message
                : '이미지 업로드에 실패했습니다.')}
          </p>
        )}
      </div>
    </div>
  );
};
