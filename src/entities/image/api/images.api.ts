import { fetchClient } from '@/shared/api/fetch-client';
import { parseResponse } from '@/shared/api/parse-response';
import {
  PresignedUrlRequestContentTypeEnum,
  PresignedUrlRequestFolderEnum,
} from '@/shared/types/generated-client/models/PresignedUrlRequest';
import type { PresignedUrlResponse } from '@/shared/types/generated-client/models/PresignedUrlResponse';

export type { PresignedUrlResponse };
export { PresignedUrlRequestFolderEnum };

/**
 * 지원하는 이미지 MIME 타입과 확장자 매핑.
 * ACCEPTED_IMAGE_TYPES(input accept 속성)와 fileName 생성에 공통으로 사용합니다.
 */
export const MIME_TO_EXT: Record<PresignedUrlRequestContentTypeEnum, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

/**
 * [Service Layer] imagesApi
 * S3 presigned URL 발급 및 이미지 업로드를 처리합니다.
 */
export const imagesApi = {
  /**
   * presigned URL 발급 요청
   * POST /images
   */
  async getPresignedUrl(
    file: File,
    folder: PresignedUrlRequestFolderEnum
  ): Promise<PresignedUrlResponse> {
    const mimeType = file.type.trim();
    if (!(mimeType in MIME_TO_EXT)) {
      throw new Error(`지원하지 않는 이미지 형식입니다. (${mimeType})`);
    }
    const contentType = mimeType as PresignedUrlRequestContentTypeEnum;

    const response = await fetchClient.post('/images', {
      fileName: `image.${MIME_TO_EXT[contentType]}`,
      contentType,
      folder,
    });
    return parseResponse<PresignedUrlResponse>(response, '이미지 업로드에 실패했습니다.');
  },

  /**
   * S3에 이미지 직접 업로드
   * PUT presignedUrl
   * S3 presigned URL은 에러 응답이 JSON이 아니므로 parseResponse 미사용
   */
  async uploadToS3(presignedUrl: string, file: File): Promise<void> {
    const response = await fetch(presignedUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type.trim() },
      body: file,
    });
    if (!response.ok) {
      throw new Error('이미지 업로드에 실패했습니다.');
    }
  },
};
