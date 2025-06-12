'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <>
    <form action={formAction} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-black">
          Log in
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="block w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-500"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="block w-full rounded-md border border-gray-300 p-2 text-sm text-black placeholder-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          type="submit"
          name='action'
          value="credentials"
          className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          aria-disabled={isPending}
        >
          Log in
        </button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="redirectTo" value={callbackUrl} />
      <button
        type="submit"
        name='action'
        value="google"
        className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        aria-disabled={isPending}
      >
        Log in with Google
      </button>
    </form>
    </>
  );
}

