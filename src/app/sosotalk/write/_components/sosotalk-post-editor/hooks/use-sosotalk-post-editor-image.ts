'use client';

import type { ChangeEvent, RefObject } from 'react';
import { useEffect, useState } from 'react';

interface UseSosoTalkPostEditorImageParams {
  fileInputRef: RefObject<HTMLInputElement | null>;
  initialImageUrl?: string;
}

export function useSosoTalkPostEditorImage({
  fileInputRef,
  initialImageUrl = '',
}: UseSosoTalkPostEditorImageParams) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  // Preview URL is UI-only state for local rendering and should not be sent to the API.
  const [imagePreviewUrl, setImagePreviewUrl] = useState(initialImageUrl);

  useEffect(() => {
    setImagePreviewUrl(initialImageUrl);
  }, [initialImageUrl]);

  useEffect(() => {
    if (!imageFile) {
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setImageFile(nextFile);

    if (!nextFile) {
      setImagePreviewUrl('');
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreviewUrl('');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    handleImageChange,
    handleImageRemove,
    imageFile,
    imagePreviewUrl,
  };
}
