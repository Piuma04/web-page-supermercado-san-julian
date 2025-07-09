import LoginForm from '@/app/components/LoginForm';
import { Suspense } from 'react';

export default function LoginPage() {
  return (
    <main>
      <div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}