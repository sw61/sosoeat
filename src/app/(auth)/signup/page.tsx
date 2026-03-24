'use client';

import { useState } from 'react';

import { SignupApiPayload, SignupForm } from './_components/signup-form';

export default function SignupPage() {
  // 테스트를 위한 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  // TODO: API 연동
  const handleSignup = async (data: SignupApiPayload) => {
    setIsLoading(true); // 로딩 시작
    try {
      console.log('Signup Data:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-sosoeat-gray-100 flex min-h-screen flex-col items-center justify-center px-[16px]">
      <SignupForm onSubmit={handleSignup} isLoading={isLoading} />
    </main>
  );
}
