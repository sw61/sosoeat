'use client';

import { SignupForm, SignupFormValues } from './_components/signup-form';

export default function SignupPage() {
  const handleSignup = async (data: SignupFormValues) => {
    // 실질적인 가입 로직은 나중에 구현 (API 연동 등)
    console.log('Signup Data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('회원가입이 완료되었습니다!');
  };

  return (
    <main className="bg-sosoeat-gray-100 flex min-h-screen flex-col items-center justify-center px-[16px]">
      <SignupForm onSubmit={handleSignup} />
    </main>
  );
}
