'use client';

import { useSignUp } from '@/services/auth';

import { SignupForm } from './_components/signup-form';

export default function SignupPage() {
  const { mutateAsync: signUp, isPending } = useSignUp();

  return (
    <main className="bg-sosoeat-gray-100 flex min-h-screen flex-col items-center justify-center px-[16px]">
      <SignupForm onSubmit={signUp} isLoading={isPending} />
    </main>
  );
}
