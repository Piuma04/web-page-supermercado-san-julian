
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';


export default async function middleware(req: NextRequest) {

  const session = await auth();

  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  const privateRoutes = ['/admin', '/cart', '/profile',];


  const isPrivate = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );


  if (!isPrivate) {
    return NextResponse.next();
  }


  if (!session) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }


  if (pathname.startsWith('/admin') && session?.user?.role !== 'ADMIN') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  
  matcher: [
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    
  ], 
};