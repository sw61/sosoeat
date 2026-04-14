'use client';

import Image from 'next/image';

import { ImagePlus, Loader2, XIcon } from 'lucide-react';

import { MIME_TO_EXT } from '@/entities/image';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { BaseImageCropper } from '@/shared/ui/image-editor/base-image-cropper';

import { useMeetingImageEditor } from '../../model/use-meeting-image-editor';

import sliderStyles from '@/shared/ui/image-editor/image-editor-slider.module.css';

const ACCEPTED_IMAGE_TYPES = Object.keys(MIME_TO_EXT).join(',');

const actionButtonClassName =
  'w-fill h-12 md:h-15 flex-1 md:rounded-2xl rounded-xl py-3 text-base md:text-xl font-semibold';

interface MeetingImageEditorProps {
  imageUrl?: string;
  onChange: (url: string) => void;
  error?: string;
}

export function MeetingImageEditor({ imageUrl, onChange, error }: MeetingImageEditorProps) {
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
  } = useMeetingImageEditor(onChange);

  return (
    <>
      <div className={imageUrl && !isPending ? 'relative w-full' : 'relative w-36.75'}>
        {imageUrl && !isPending ? (
          <Image
            src={imageUrl}
            alt="모임 이미지"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full rounded-2xl"
          />
        ) : (
          <div className="bg-sosoeat-gray-100 text-sosoeat-gray-500 flex h-36.75 w-36.75 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-sm">
            {isPending ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <ImagePlus className="h-6 w-6" />
            )}
          </div>
        )}
        {!isPending && (
          <button
            type="button"
            onClick={openFileDialog}
            className="absolute inset-0 cursor-pointer rounded-2xl"
            aria-label="이미지 선택"
          />
        )}
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={ACCEPTED_IMAGE_TYPES}
          disabled={isPending}
          onChange={handleFileChange}
        />
      </div>
      {error && (
        <p className="animate-in fade-in slide-in-from-top-1 text-destructive text-xs">{error}</p>
      )}

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

          <div className="relative h-72 w-full overflow-hidden rounded-3xl bg-white">
            {rawSrc && (
              <BaseImageCropper
                image={rawSrc}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                showGrid={true}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={(_, pixels) => setCroppedAreaPixels(pixels)}
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className={sliderStyles.slider}
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
    </>
  );
}
