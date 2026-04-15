import { NextResponse } from 'next/server';

import * as Sentry from '@sentry/nextjs';

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

/**
 * 클라이언트에 노출하는 BFF 에러 응답 포맷
 */
export interface BffErrorResponse {
  message: string;
}

/**
 * 요청 컨텍스트 (로깅용)
 */
export interface RequestContext {
  method: string;
  path: string;
}

/**
 * HTTP 상태 코드별 기본 에러 메시지 맵
 */
const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
};

/**
 * HTTP 상태 코드별 기본 에러 메시지 반환
 */
function getDefaultMessageForStatus(statusCode: number): string {
  return HTTP_STATUS_MESSAGES[statusCode] ?? 'Internal Server Error';
}

/**
 * 5xx 에러 메시지 마스킹 (프로덕션에서만)
 */
function sanitizeMessage(message: string, statusCode: number): string {
  if (statusCode >= 500 && !IS_DEVELOPMENT) {
    return 'Internal Server Error';
  }
  return message;
}

/**
 * 상세 로깅 (method, path, statusCode, stack trace 포함)
 */
function logBffError(statusCode: number, error: unknown, context?: RequestContext): void {
  console.error('[BFF Error]', {
    method: context?.method,
    path: context?.path,
    statusCode,
    error: error instanceof Error ? error.message : error,
    ...(IS_DEVELOPMENT && error instanceof Error ? { stack: error.stack } : {}),
  });
}

function captureBffError(statusCode: number, error: unknown, context?: RequestContext): void {
  if (statusCode < 500) {
    return;
  }

  Sentry.captureException(error, {
    tags: {
      area: 'bff',
      method: context?.method ?? 'UNKNOWN',
      path: context?.path ?? 'unknown',
    },
    extra: {
      statusCode,
    },
  });
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

/**
 * BFF catch 블록에서 사용 - 기존 시그니처 하위 호환 유지 (+ context 추가)
 */
export function createErrorResponse(
  error: unknown,
  defaultMessage: string,
  statusCode: number = 500,
  context?: RequestContext
): NextResponse<BffErrorResponse> {
  const rawMessage = getErrorMessage(error, defaultMessage);
  const message = sanitizeMessage(rawMessage, statusCode);
  logBffError(statusCode, error, context);
  captureBffError(statusCode, error, context);
  return NextResponse.json({ message }, { status: statusCode });
}

/**
 * 백엔드 Response를 클라이언트에 포워딩 - { message }로 통일
 * login의 !response.ok, proxy-handler의 !response.ok에서 사용
 */
export async function forwardBackendError(
  response: Response,
  context?: RequestContext
): Promise<NextResponse<BffErrorResponse>> {
  const statusCode = response.status;
  let rawMessage = getDefaultMessageForStatus(statusCode);

  try {
    const body = await response.json();
    if (body?.message) rawMessage = body.message;
  } catch {
    // JSON 파싱 실패 시 기본 메시지 사용
  }

  const message = sanitizeMessage(rawMessage, statusCode);
  logBffError(statusCode, { backendStatus: statusCode, rawMessage }, context);
  captureBffError(statusCode, new Error(rawMessage), context);
  return NextResponse.json({ message }, { status: statusCode });
}

/**
 * BFF 라우트 핸들러용 에러 응답 헬퍼
 * catch 블록에서 사용 - context 정보를 간편하게 전달
 *
 * @example
 * } catch (error) {
 *   return createBffErrorResponse(error, '/api/auth/login');
 * }
 */
export function createBffErrorResponse(
  error: unknown,
  path: string,
  statusCode: number = 500,
  defaultMessage: string = 'Internal Server Error'
): NextResponse<BffErrorResponse> {
  return createErrorResponse(error, defaultMessage, statusCode, {
    method: 'POST',
    path,
  });
}
