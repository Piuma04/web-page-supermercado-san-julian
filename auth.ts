import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

async function getUser(email: string) {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
 
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user || !user.passwd) return null;

        const passwordMatch = await bcrypt.compare(password, user.passwd);
        if (!passwordMatch) return null;

        return { ...user, id: user.id.toString() };
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
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
  }

});
