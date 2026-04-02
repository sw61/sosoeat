'use client';

import Image from 'next/image';

import { X } from 'lucide-react';

import { cn } from '@/lib/utils';

import { ImageUploadFieldProps } from './image-upload-field.types';

export function ImageUploadField({
  className,
  imageUrl,
  imageName,
  disabled = false,
  onRemove,
}: ImageUploadFieldProps) {
  if (!imageUrl) {
    return null;
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="relative h-[134px] w-[134px] overflow-hidden rounded-[14px] bg-[#D9D9D9]">
        <Image
          src={imageUrl}
          alt={imageName ?? '업로드한 이미지'}
          fill
          unoptimized
          className="object-cover"
        />
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white transition-opacity hover:opacity-85 disabled:pointer-events-none disabled:opacity-50"
          aria-label="업로드한 이미지 삭제"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
