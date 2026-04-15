'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="bg-sosoeat-gray-100 flex min-h-[calc(100vh-124px)] items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-[568px] flex-col items-center rounded-[24px] bg-white px-4 py-10 shadow-sm sm:rounded-[40px] sm:px-[56px] sm:py-[64px]">
        <Image src="/images/logo.svg" alt="sosoeat" width={96} height={31} priority />

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <span className="text-sosoeat-orange-500 text-7xl leading-none font-bold">500</span>
          <h1 className="text-sosoeat-gray-900 text-2xl font-bold">일시적인 오류가 발생했어요</h1>
          <p className="text-sosoeat-gray-600 text-sm leading-relaxed font-medium sm:text-base">
            잠시 후 다시 시도해주세요.
          </p>
        </div>

        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="bg-sosoeat-orange-600 hover:bg-sosoeat-orange-700 flex h-12 w-full items-center justify-center rounded-xl text-base font-semibold text-white transition-colors"
          >
            다시 시도
          </button>
          <Link
            href="/"
            className="border-sosoeat-gray-300 text-sosoeat-gray-700 hover:bg-sosoeat-gray-100 flex h-12 w-full items-center justify-center rounded-xl border text-base font-semibold transition-colors"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
