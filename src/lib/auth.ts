import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma, isDbConfigured } from "./prisma";

// Fallback admin used in demo mode (no database connected).
const DEMO_ADMIN = {
  id: "demo-admin",
  name: "SESO Admin",
  email: process.env.ADMIN_EMAIL || "admin@sesoautos.com",
  password: process.env.ADMIN_PASSWORD || "seso-admin-2026",
};

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const email = credentials.email.toLowerCase().trim();

        // Demo mode: validate against env-configured admin.
        if (!isDbConfigured) {
          if (
            email === DEMO_ADMIN.email.toLowerCase() &&
            credentials.password === DEMO_ADMIN.password
          ) {
            return { id: DEMO_ADMIN.id, name: DEMO_ADMIN.name, email: DEMO_ADMIN.email };
          }
          return null;
        }

        try {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) return null;
          const valid = await bcrypt.compare(credentials.password, user.password);
          if (!valid) return null;
          return { id: user.id, name: user.name, email: user.email };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "seso-autos-dev-secret-change-me",
};
