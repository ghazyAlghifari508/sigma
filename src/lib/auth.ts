import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations/auth";

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        // js-early-exit: validate input dulu sebelum query DB
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
        });
        if (!user) return null; // js-early-exit

        const valid = await bcrypt.compare(parsed.data.password, user.password);
        if (!valid) return null; // js-early-exit

        // server-serialization: hanya return field yang dibutuhkan session
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Embed role ke JWT agar tidak perlu DB round-trip di setiap request
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // Expose role ke session object yang diakses client
    session({ session, token }) {
      session.user.role = token.role as any;
      if (token.id) {
        session.user.id = token.id as string;
      } else if (token.sub) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
