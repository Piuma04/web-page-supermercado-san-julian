import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUserProfile = nextUrl.pathname.startsWith('/userSettings');
      if (isOnUserProfile) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/userSettings', nextUrl));
      }
      return true;
    },
  },
  providers: [], // aca iria google y esas cosas

} satisfies NextAuthConfig;