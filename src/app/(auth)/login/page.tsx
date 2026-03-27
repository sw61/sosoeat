'use client';

import { useLogin } from '@/services/auth';

import { LoginForm } from './_components/login-form';
import { LoginLayout } from './_components/login-layout/login-layout';

export default function LoginPage() {
  const { mutateAsync: login, isPending } = useLogin();

  return (
    <LoginLayout>
      <LoginForm onSubmit={login} isLoading={isPending} />
    </LoginLayout>
  );
}
