'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { STORAGE_KEYS } from '@/shared/lib/storage-keys';
import { isSafeCallbackUrl } from '@/shared/utils/url';

interface LoginLayoutProps {
  children: React.ReactNode;
}

/**
 * 인증 관련 페이지(로그인, 회원가입 등)에서 공통으로 사용되는 레이아웃 컴포넌트입니다.
 * 중앙 정렬된 카드 형태의 디자인과 SNS 로그인 섹션, 하단 링크를 포함합니다.
 *
 * @param {LoginLayoutProps} props - 컴포넌트 Props
 * @param {React.ReactNode} props.children - 레이아웃 내부의 폼 또는 본문 콘텐츠
 */
export const LoginLayout = ({ children }: LoginLayoutProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl');

  const buildSocialUrl = (provider: string) =>
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auth/${provider}`;

  const handleSocialLogin = () => {
    if (callbackUrl && isSafeCallbackUrl(callbackUrl)) {
      sessionStorage.setItem(STORAGE_KEYS.SOCIAL_LOGIN_CALLBACK_URL, callbackUrl);
    }
  };

  return (
    <div className="bg-sosoeat-gray-100 flex min-h-screen items-center justify-center px-4 py-10">
      <div className="flex w-full max-w-[568px] flex-col rounded-[24px] bg-white px-4 py-6 shadow-sm md:rounded-[40px] md:px-14 md:pt-12 md:pb-11">
        <h1 className="text-sosoeat-gray-900 mb-10 text-center text-2xl font-bold">로그인</h1>

        {children}

        <div className="px-4 md:px-0">
          <div className="relative mt-10 flex items-center justify-center">
            <div className="border-sosoeat-gray-400 absolute w-full border-t"></div>
            <span className="text-sosoeat-gray-600 relative bg-white px-4 text-sm font-medium duration-200 md:text-base">
              SNS 계정으로 로그인
            </span>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:gap-4">
            <Link
              href={buildSocialUrl('google')}
              onClick={handleSocialLogin}
              className="flex h-[48px] w-full items-center justify-center gap-[12px] rounded-[12px] border border-gray-300 bg-white text-base font-semibold text-slate-800 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:ring-offset-1 focus:outline-none md:flex-1"
            >
              <Image src="/icons/google-icon.svg" alt="Google Logo" width={24} height={24} />
              구글로 계속하기
            </Link>

            <Link
              href={buildSocialUrl('kakao')}
              onClick={handleSocialLogin}
              className="flex h-[48px] w-full items-center justify-center gap-[12px] rounded-[12px] bg-[#FEE500] text-base font-semibold text-[rgba(0,0,0,0.85)] opacity-90 hover:opacity-100 focus:ring-2 focus:ring-[#FFEE01] focus:ring-offset-1 focus:outline-none md:flex-1"
            >
              <Image src="/icons/kakao-icon.svg" alt="Kakao Logo" width={24} height={24} />
              카카오로 계속하기
            </Link>
          </div>
        </div>

        <div className="flex justify-center pt-10">
          <Link
            href="/signup"
            className="group text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 md:text-base"
          >
            <span className="duration-200">소소잇이 처음이신가요?</span>{' '}
            <span className="text-sosoeat-orange-600 font-bold duration-200 group-hover:underline">
              회원가입
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
