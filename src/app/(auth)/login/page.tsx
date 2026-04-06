import { Suspense } from 'react';

import { LoginForm } from '@/features/auth/ui/login-form';
import { LoginLayout } from '@/features/auth/ui/login-layout/login-layout';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </Suspense>
  );
}
