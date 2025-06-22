import { Suspense } from 'react';
import LoginForm from '@/app/components/LoginForm';
import { signIn } from '@/auth';

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