import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

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

});
