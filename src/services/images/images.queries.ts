import { useMutation } from '@tanstack/react-query';

import { imagesApi, PresignedUrlRequestFolderEnum } from './images.api';

/**
 * [Hook] useUploadImage
 * S3 presigned URL 발급 → S3 직접 업로드를 순차 처리하는 Mutation 훅입니다.
 * mutateAsync를 사용하는 쪽에서 onSuccess/onError를 제어합니다.
 */
export const useUploadImage = (folder: PresignedUrlRequestFolderEnum) =>
  useMutation({
    mutationFn: async (file: File) => {
      const { presignedUrl, publicUrl } = await imagesApi.getPresignedUrl(file, folder);
      await imagesApi.uploadToS3(presignedUrl, file);
      return publicUrl;
    },
  });
