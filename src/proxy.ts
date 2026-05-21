import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Map role ke base path dashboard masing-masing
const ROLE_DASHBOARD: Record<string, string> = {
  SISWA: "/dashboard/siswa",
  SPPG: "/dashboard/sppg",
  PEMERINTAH: "/dashboard/pemerintah",
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // js-early-exit: lewati route yang tidak memerlukan auth check
  if (!pathname.startsWith("/dashboard")) return NextResponse.next();

  // Belum login → redirect ke halaman login
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = session.user?.role;
  if (!role) return NextResponse.redirect(new URL("/login", req.url));

  const allowedBase = ROLE_DASHBOARD[role];

  // Salah role → redirect ke dashboard yang sesuai rolenya
  if (!pathname.startsWith(allowedBase)) {
    return NextResponse.redirect(new URL(allowedBase, req.url));
  }

  return NextResponse.next();
});

export const config = {
  // Hanya proteksi route /dashboard/*
  matcher: ["/dashboard/:path*"],
};
