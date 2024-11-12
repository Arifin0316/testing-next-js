/* eslint-disable @typescript-eslint/no-explicit-any */
import { signIn, signInWithGoogle } from '@/lib/firebase/servis';
import { compare } from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'name', type: 'text' },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        // Authentikasi menggunakan Firebase
        const user: any = await signIn({ email });
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user; // Mengembalikan user jika login sukses
          }
          return null; // Jika password salah, kembalikan null
        }
        return null; // Jika user tidak ditemukan, kembalikan null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.email = user.email;
        token.name = user.name; // Menggunakan fullname, bukan fulname
        token.role = user.role;
        token.image = user.image // Jika ada role, simpan di token
      }

      if (account?.provider === 'google') {
        // Perbaikan pengecekan provider
        const data: any = {
          name: user.name,
          email: user.email,
          image: user.image,
          type: 'google',
        };

        await signInWithGoogle(data, (Result: {status?: boolean, massage?: string, data?: any}) => {
          if (Result.status) {
            token.email = Result.data.email;
            token.fullname = Result.data.name;
            token.image = Result.data.image;
            token.type = Result.data.type;
            token.role = Result.data.role;
          }
        });
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token.email) {
        session.user.email = token.email;
        session.user.name = token.name; // Menambahkan fullname ke sesi
        session.user.role = token.role; // Menambahkan role ke sesi jika ada
        session.user.image = token.image; // Menambahkan image ke sesi jika ada
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login', // Menentukan halaman login
  },
};

export default NextAuth(authOption);
