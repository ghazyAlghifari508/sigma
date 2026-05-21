import type { DefaultSession } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: "SISWA" | "SPPG" | "PEMERINTAH";
    } & DefaultSession["user"];
  }
  interface User {
    role: "SISWA" | "SPPG" | "PEMERINTAH";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: "SISWA" | "SPPG" | "PEMERINTAH";
  }
}
