import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

// Map role ke base path dashboard masing-masing
const ROLE_DASHBOARD: Record<string, string> = {
  SISWA: "/dashboard/siswa",
  SPPG: "/dashboard/sppg",
  PEMERINTAH: "/dashboard/pemerintah",
};

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // js-early-exit: lewati route yang tidak memerlukan auth check
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  // Gunakan getToken dari next-auth/jwt (kompatibel Edge runtime, tanpa Prisma)
  const token = await getToken({ req, secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET });

  // Belum login → redirect ke halaman login
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role as string;
  if (!role) return NextResponse.redirect(new URL("/login", req.url));

  const allowedBase = ROLE_DASHBOARD[role];

  // Salah role → redirect ke dashboard yang sesuai rolenya
  if (allowedBase && !pathname.startsWith(allowedBase)) {
    return NextResponse.redirect(new URL(allowedBase, req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Hanya proteksi route /dashboard/*
  matcher: ["/dashboard/:path*"],
};
