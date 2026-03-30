import { fetchClient } from '@/lib/http/fetch-client';

export interface PresignedUrlResponse {
  presignedUrl: string;
  publicUrl: string;
}

/**
 * 지원하는 이미지 MIME 타입과 확장자 매핑.
 * ACCEPTED_IMAGE_TYPES(input accept 속성)와 fileName 생성에 공통으로 사용합니다.
 */
export const MIME_TO_EXT: Record<string, string> = {
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
   *
   * 백엔드로부터 S3 직접 업로드용 presignedUrl과 업로드 완료 후 저장할 publicUrl을 발급받습니다.
   * fileName은 한글 등 특수문자로 인한 확장자 파싱 오류를 방지하기 위해 MIME 타입 기반으로 생성합니다.
   *
   * @param file - 업로드할 이미지 파일
   * @param folder - S3 저장 폴더 경로 (예: 'meetings', 'profiles')
   * @throws 서버 에러 메시지 또는 기본 에러
   */
  async getPresignedUrl(file: File, folder: string): Promise<PresignedUrlResponse> {
    const response = await fetchClient.post('/images', {
      fileName: `image.${MIME_TO_EXT[file.type.trim()] ?? 'jpg'}`,
      contentType: file.type.trim(),
      folder,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || '이미지 업로드에 실패했습니다.');
    }

    return response.json();
  },

  /**
   * S3에 이미지 직접 업로드
   * PUT presignedUrl
   *
   * 발급받은 presignedUrl로 파일을 직접 S3에 업로드합니다.
   * presignedUrl에 인증 정보가 포함되어 있으므로 fetchClient(프록시) 대신 fetch를 직접 사용합니다.
   *
   * @param presignedUrl - getPresignedUrl에서 발급받은 S3 업로드용 URL (유효시간 5분)
   * @param file - 업로드할 이미지 파일
   * @throws S3 업로드 실패 시 에러
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
