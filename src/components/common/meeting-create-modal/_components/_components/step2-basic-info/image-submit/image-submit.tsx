import { use, useEffect, useState } from 'react';

import Image from 'next/image';

import { ImagePlus } from 'lucide-react';

import { StepProps } from '@/components/common/meeting-create-modal/meeting-create-modal.types';
import { fetchClient } from '@/lib/http/fetch-client';
import { TeamIdImagesPostRequest } from '@/types/generated-client/apis/ImagesApi';
import { PresignedUrlRequest } from '@/types/generated-client/models/PresignedUrlRequest';

export const ImageSubmit = ({ form }: StepProps) => {
  const { setValue } = form;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [publicUrl, setPublicUrl] = useState<string>('');

  const handleUploadImage = async () => {
    if (uploadedImage) {
      const response = await fetchClient.post(`/images`, {
        fileName: uploadedImage.name,
        contentType: uploadedImage.type,
        folder: 'meetings',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      //사진 업로드
      try {
        await fetch(data.presignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': uploadedImage.type,
          },
          body: uploadedImage,
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Failed to upload image to S3');
      }
      //사진 url 저장
      setValue('image', data.publicUrl);
      setPublicUrl(data.publicUrl);
    }
  };

  return publicUrl ? (
    <Image src={publicUrl} alt="image" width={147} height={147} className="rounded-2xl" />
  ) : (
    <div className="bg-sosoeat-gray-100 text-sosoeat-gray-500 flex h-[147px] w-[147px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-sm">
      <label htmlFor="image" className="text-center text-xs font-medium">
        <ImagePlus className="h-6 w-6" />
      </label>
      <input
        type="file"
        id="image"
        className="sr-only"
        onChange={(e) => setUploadedImage(e.target.files?.[0] || null)}
      />
    </div>
  );
};
