'use client';

import Cropper from 'react-easy-crop';

import Image from 'next/image';

import { Loader2, Pencil, XIcon } from 'lucide-react';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';

import { useProfileImageEditor } from '../../../model/use-profile-image-editor';
import type { ProfileImageEditorProps } from '../edit-profile-modal.types';

const actionButtonClassName =
  'w-fill h-12 md:h-15 flex-1 md:rounded-2xl rounded-xl py-3 text-base md:text-xl font-semibold';

export function ProfileImageEditor({ imageUrl, onChange }: ProfileImageEditorProps) {
  const {
    inputRef,
    isPending,
    rawSrc,
    cropModalOpen,
    crop,
    zoom,
    openFileDialog,
    handleFileChange,
    handleCropConfirm,
    handleCropCancel,
    setCrop,
    setZoom,
    setCroppedAreaPixels,
  } = useProfileImageEditor(onChange);

  return (
    <div className="flex justify-center">
      <div className="relative h-[116px] w-[116px]">
        <Image
          src={imageUrl || '/images/basic-profile.svg'}
          alt="프로필 이미지"
          fill
          className="ring-sosoeat-gray-300 rounded-full object-cover ring-1"
        />
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
        <Button
          type="button"
          size="icon"
          disabled={isPending}
          onClick={openFileDialog}
          className="border-sosoeat-gray-300 absolute right-1 bottom-1 cursor-pointer rounded-full border bg-white text-gray-600 md:right-1 md:bottom-0"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Pencil className="h-6 w-6" />
          )}
        </Button>
      </div>

      <Dialog open={cropModalOpen} onOpenChange={(open) => !open && handleCropCancel()}>
        <DialogContent
          showCloseButton={false}
          className="w-85.75 max-w-none rounded-4xl bg-white p-9 shadow-xl sm:max-w-none md:w-136"
        >
          <DialogHeader className="flex w-full flex-row items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">미리 보기</DialogTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-8 shrink-0 cursor-pointer text-[#737373] hover:bg-transparent hover:text-[#737373]"
              aria-label="닫기"
              onClick={handleCropCancel}
            >
              <XIcon className="size-6" strokeWidth={1.8} />
            </Button>
          </DialogHeader>

          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-white">
            {rawSrc && (
              <Cropper
                image={rawSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">확대/축소</span>
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="h-1 w-full cursor-pointer accent-orange-500"
            />
          </div>

          <DialogFooter className="flex flex-row gap-3 border-0 bg-white">
            <Button
              className={`${actionButtonClassName} border-sosoeat-gray-300 hover:bg-sosoeat-gray-100 cursor-pointer border bg-white text-gray-700`}
              onClick={handleCropCancel}
            >
              취소
            </Button>
            <Button
              disabled={isPending}
              onClick={handleCropConfirm}
              className={`${actionButtonClassName} bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 cursor-pointer text-white`}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : '적용하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
