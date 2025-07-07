import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUserProfile = nextUrl.pathname.startsWith('/profile');
      const isOnCart = nextUrl.pathname.startsWith('/cart');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnUserProfile || isOnCart || isOnAdmin) {
        return isLoggedIn;
      }
      return true;
    }
  },

  providers: [], 
};
