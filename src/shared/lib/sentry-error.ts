import * as Sentry from '@sentry/nextjs';

type SentryCaptureContext = {
  tags?: Record<string, string>;
  extra?: Record<string, unknown>;
};

type ErrorWithStatus = {
  status?: number;
  response?: {
    status?: number;
  };
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function getErrorStatus(error: unknown): number | undefined {
  if (error && typeof error === 'object') {
    const { status, response } = error as ErrorWithStatus;

    if (typeof status === 'number') {
      return status;
    }

    if (response && typeof response.status === 'number') {
      return response.status;
    }
  }

  return undefined;
}

export function captureSentryException(error: unknown, context?: SentryCaptureContext) {
  Sentry.captureException(error, context);
}

export function capture5xxException(error: unknown, context?: SentryCaptureContext) {
  if ((getErrorStatus(error) ?? 0) >= 500) {
    captureSentryException(error, context);
  }
}

export function capture5xxOrUnexpectedException(error: unknown, context?: SentryCaptureContext) {
  const status = getErrorStatus(error);

  if (status == null || status >= 500) {
    captureSentryException(error, context);
  }
}
