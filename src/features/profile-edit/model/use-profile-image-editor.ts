'use client';

import { useRef, useState } from 'react';
import type { Area } from 'react-easy-crop';

import { useUploadImage } from '@/entities/image';
import { getCroppedImg } from '@/shared/lib/image-crop';
import { PresignedUrlRequestFolderEnum } from '@/shared/types/generated-client';

export function useProfileImageEditor(onChange: (url: string) => void) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = useUploadImage(PresignedUrlRequestFolderEnum.Users);

  const [rawSrc, setRawSrc] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const openFileDialog = () => inputRef.current?.click();

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

  return {
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
  };
}
