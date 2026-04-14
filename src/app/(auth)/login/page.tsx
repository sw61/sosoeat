import { Suspense } from 'react';

import type { Metadata } from 'next';

import { LoginForm, LoginLayout } from '@/widgets/auth';

export const metadata: Metadata = {
  title: '로그인',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </Suspense>
  );
}
