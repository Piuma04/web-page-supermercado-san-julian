import { Suspense } from 'react';
import LoginForm from '@/app/components/LoginForm'; 

export default function LoginPage() {
  return (
    <main>
      <div>
        <div>
          <span>
            Login
          </span>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}