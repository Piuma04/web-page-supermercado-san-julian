import type { NextAuthConfig } from 'next-auth';
import  prisma  from '@/app/lib/prisma';

 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnUserProfile = nextUrl.pathname.startsWith('/profile');
      const isOnCart =  nextUrl.pathname.startsWith('/cart');
      const isOnAdmin = nextUrl.pathname.startsWith('/cart');
      if (isOnUserProfile || isOnCart || isOnAdmin) {
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
      const dbUser = await prisma.user.create({
        data: {
        email: user.email!,
        }
      });
      await prisma.cart.create({
        data: {
          userId: dbUser.id,
        }
      });
      }
      return true;
    },

    
  },
  providers: []
} satisfies NextAuthConfig;