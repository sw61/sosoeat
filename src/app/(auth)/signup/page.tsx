import type { Metadata } from 'next';

import { SignupForm } from '@/widgets/auth';

export const metadata: Metadata = {
  title: '회원가입',
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <main className="bg-sosoeat-gray-100 flex flex-1 flex-col items-center justify-center px-[16px]">
      <SignupForm />
    </main>
  );
}
