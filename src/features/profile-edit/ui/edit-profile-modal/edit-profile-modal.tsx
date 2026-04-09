'use client';

import { useRef, useState } from 'react';
import type { Area } from 'react-easy-crop';
import Cropper from 'react-easy-crop';

import Image from 'next/image';

import { Loader2, Pencil, PencilLine, XIcon } from 'lucide-react';

import { useUploadImage } from '@/entities/image';
import { PresignedUrlRequestFolderEnum } from '@/shared/types/generated-client';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Field, FieldContent, FieldGroup, FieldLabel } from '@/shared/ui/field';
import { Input } from '@/shared/ui/input';

import type {
  EditProfileModalProps,
  ProfileFieldProps,
  ProfileImageEditorProps,
} from './edit-profile-modal.types';

const styles = {
  input: 'focus:border-sosoeat-gray-700 border border-transparent focus:ring-0 focus:outline-none',
  fieldLabel: 'text-sm font-semibold',
  actionButton:
    'w-fill h-12 md:h-15 flex-1 md:rounded-2xl rounded-xl py-3 text-base md:text-xl font-semibold',
} as const;

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', reject);
    image.crossOrigin = 'anonymous';
    image.src = url;
  });
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context를 가져올 수 없습니다.');
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Canvas is empty'));
    }, 'image/jpeg');
  });
}

function ProfileImageEditor({ imageUrl, onChange }: ProfileImageEditorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = useUploadImage(PresignedUrlRequestFolderEnum.Users);

  const [rawSrc, setRawSrc] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRawSrc(URL.createObjectURL(file));
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCropModalOpen(true);
    e.target.value = '';
  };

  const handleCropConfirm = async () => {
    if (!rawSrc || !croppedAreaPixels) return;
    try {
      const blob = await getCroppedImg(rawSrc, croppedAreaPixels);
      const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
      const publicUrl = await mutateAsync(file);
      if (publicUrl) onChange(publicUrl);
      setCropModalOpen(false);
    } catch (error) {
      console.error('프로필 이미지 처리 중 오류가 발생했습니다:', error);
    } finally {
      URL.revokeObjectURL(rawSrc);
      setRawSrc(null);
    }
  };

  const handleCropCancel = () => {
    if (rawSrc) URL.revokeObjectURL(rawSrc);
    setRawSrc(null);
    setCropModalOpen(false);
  };

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
          onClick={() => inputRef.current?.click()}
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
              className={`${styles.actionButton} border-sosoeat-gray-300 hover:bg-sosoeat-gray-100 cursor-pointer border bg-white text-gray-700`}
              onClick={handleCropCancel}
            >
              취소
            </Button>
            <Button
              disabled={isPending}
              onClick={handleCropConfirm}
              className={`${styles.actionButton} bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 cursor-pointer text-white`}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : '적용하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProfileField({ id, label, type = 'text', value, onChange }: ProfileFieldProps) {
  return (
    <Field orientation="vertical" className="gap-2">
      <FieldLabel htmlFor={id} className={styles.fieldLabel}>
        {label}
      </FieldLabel>
      <FieldContent>
        <Input id={id} type={type} value={value} onChange={onChange} className={styles.input} />
      </FieldContent>
    </Field>
  );
}

export function EditProfileModal({
  initialName = '',
  initialEmail = '',
  initialImageUrl = '',
  onSubmit,
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: EditProfileModalProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [internalOpen, setInternalOpen] = useState(false);

  const open = externalOpen ?? internalOpen;
  const setOpen = externalOnOpenChange ?? setInternalOpen;

  const handleSubmit = () => {
    onSubmit?.({ name, email, imageUrl });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-sosoeat-gray-200 text-sosoeat-gray-700 ring-sosoeat-gray-300 hidden h-[34.45px] w-[104.04px] cursor-pointer flex-row items-center justify-center gap-1 rounded-xl text-xs font-bold ring-1 md:flex">
          <PencilLine className="h-[12.99px] w-[12.99px]" />
          프로필 수정
        </button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="h-124.75 w-85.75 max-w-none rounded-4xl bg-white p-9 shadow-xl sm:max-w-none md:h-156.75 md:w-136"
      >
        <DialogHeader className="flex w-full flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-gray-900">프로필 수정하기</DialogTitle>
          <DialogClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-8 shrink-0 cursor-pointer text-[#737373] hover:bg-transparent hover:text-[#737373]"
              aria-label="닫기"
            >
              <XIcon className="size-6" strokeWidth={1.8} />
            </Button>
          </DialogClose>
        </DialogHeader>

        <ProfileImageEditor imageUrl={imageUrl} onChange={setImageUrl} />

        <FieldGroup className="gap-4">
          <ProfileField
            id="name"
            label="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <ProfileField
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FieldGroup>

        <DialogFooter className="flex flex-row gap-3 border-0 bg-white">
          <DialogClose asChild>
            <Button
              className={`${styles.actionButton} border-sosoeat-gray-300 hover:bg-sosoeat-gray-100 cursor-pointer border bg-white text-gray-700`}
            >
              취소
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className={`${styles.actionButton} bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 cursor-pointer text-white`}
          >
            수정하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
