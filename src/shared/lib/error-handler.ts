import { NextResponse } from 'next/server';

export interface ErrorResponse {
  message: string;
}

/**
 * API 에러 응답을 생성합니다.
 */
export function createErrorResponse(
  error: unknown,
  defaultMessage: string,
  statusCode: number = 500
): NextResponse<ErrorResponse> {
  const message = getErrorMessage(error, defaultMessage);
  console.error(`[BFF Error] ${statusCode}:`, error);
  return NextResponse.json({ message }, { status: statusCode });
}

/**
 * 에러 객체에서 메시지를 추출합니다.
 */
function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return defaultMessage;
}
