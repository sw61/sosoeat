import { Suspense } from 'react';

import { LoginForm } from './_components/login-form';
import { LoginLayout } from './_components/login-layout/login-layout';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </Suspense>
  );
}
