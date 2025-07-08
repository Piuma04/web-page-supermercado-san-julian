
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';


export default async function middleware(req: NextRequest) {

  const token = await getToken({ req , secret: process.env.AUTH_SECRET});

  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;

  const privateRoutes = ['/admin', '/cart', '/profile',];
  if (!privateRoutes.includes(pathname)) {
    return NextResponse.next();
  }


  if (!token) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }


  if (pathname.startsWith('/admin') && token.role !== 'ADMIN') {
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