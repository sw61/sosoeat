/**
 * fetch Response를 파싱하는 공통 유틸입니다.
 * - 응답 실패 시 에러 메시지를 추출해 throw합니다.
 * - 응답 성공 시 JSON을 파싱해 반환합니다.
 */
import { ApiError } from '../lib/sentry-error';

export async function parseResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(errorData.message || fallbackMessage, response.status);
  }
  return response.json();
}

/**
 * 응답 본문이 없는 요청(DELETE, PUT 등)에 사용합니다.
 */
export async function parseVoidResponse(
  response: Response,
  fallbackMessage: string
): Promise<void> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(errorData.message || fallbackMessage, response.status);
  }
}
