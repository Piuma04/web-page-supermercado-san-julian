import type { NextAuthConfig } from 'next-auth';
import  prisma  from '@/app/lib/prisma';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUserProfile = nextUrl.pathname.startsWith('/cart');     //podria ser cart, historial, etc.
      if (isOnUserProfile) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      return true;
    },
    async signIn({ user, account, profile }) {
      const existingUser = await prisma.user.findUnique({
      where: { email: user.email! }
      });
      if (!existingUser) {
      await prisma.user.create({
        data: {
        email: user.email!,
        }
      });
      }
      return true;
    },


    
  },
  providers: []
} satisfies NextAuthConfig;