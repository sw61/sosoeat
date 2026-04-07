import { Suspense } from 'react';

import { LoginForm, LoginLayout } from '@/widgets/auth';

export default function LoginPage() {
  return (
    <Suspense>
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    </Suspense>
  );
}
