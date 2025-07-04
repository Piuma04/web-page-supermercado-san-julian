import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
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
    },
    async signIn({ user }) {
      if (!user?.email) return false;

      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          const dbUser = await prisma.user.create({ data: { email: user.email } });
          await prisma.cart.create({ data: { userId: dbUser.id } });
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },

    async jwt({ token, user }) {
      try {
        if (user?.email) {
          const userDB = await prisma.user.findUnique({
            where: { email: user.email },
            select: { role: true },
          });
          if (userDB) token.role = userDB.role;
        }
      } catch (error) {
        console.error('Error in jwt callback:', error);
      }
      return token;
    },

    session({ session, token }) {
      try {
        if (token.role) session.user.role = token.role;
      } catch (error) {
        console.error('Error in session callback:', error);
      }
      return session;
    },
  },

  providers: [], // Se agregan en el auth.ts
};
