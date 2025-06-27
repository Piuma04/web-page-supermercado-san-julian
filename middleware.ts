import { NextResponse } from 'next/server';
import { auth } from './auth';
import type { NextRequest } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { userRole } from '@prisma/client';

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Check if user is trying to access /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // If not logged in, let NextAuth handle it (redirect to login)
    if (!session?.user) {
      return NextResponse.next();
    }
    // If logged in but not admin, redirect to main page
    if (session.user.role !== userRole.ADMIN) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};