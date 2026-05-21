"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface InputProps {
  label?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  type?: string;
  [key: string]: any;
}

const AppInput = (props: InputProps) => {
  const { label, placeholder, icon, ...rest } = props;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full min-w-[200px] relative text-left">
      {label && <label className="block mb-2 text-sm text-[#124f97] font-medium">{label}</label>}
      <div className="relative w-full">
        <input
          className="peer relative z-10 border-2 border-gray-200 h-12 w-full rounded-md bg-[#fffbf7] px-4 text-[#124f97] font-normal outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#fffbf7] focus:border-[#124f97] placeholder:text-gray-400 placeholder:font-medium"
          placeholder={placeholder}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          {...rest}
        />
        {isHovering && (
          <>
            <div
              className="absolute pointer-events-none top-0 left-0 right-0 h-[2px] z-20 rounded-t-md overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 0px, #124f97 0%, transparent 70%)`,
              }}
            />
            <div
              className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-md overflow-hidden"
              style={{
                background: `radial-gradient(30px circle at ${mousePosition.x}px 2px, #124f97 0%, transparent 70%)`,
              }}
            />
          </>
        )}
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-20 text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { AlertCircle, Loader2 } from "lucide-react";
import { useTransition } from "react";

const ROLE_DASHBOARD: Record<string, string> = {
  SISWA: "/dashboard/siswa",
  SPPG: "/dashboard/sppg",
  PEMERINTAH: "/dashboard/pemerintah",
};

const Login1 = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const leftSection = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - leftSection.left,
      y: e.clientY - leftSection.top,
    });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  function onSubmit(values: LoginInput) {
    setError(null);
    startTransition(async () => {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah. Coba lagi.");
        return;
      }

      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session?.user?.role as string | undefined;
      const dest = role ? (ROLE_DASHBOARD[role] ?? "/") : "/";
      router.push(dest);
      router.refresh();
    });
  }



  return (
    <div className="h-screen w-full bg-[#fffbf7] flex font-sans overflow-hidden">
      {/* Kiri - Form */}
      <div
        className="w-full lg:w-1/2 px-6 lg:px-16 xl:px-24 py-10 relative overflow-y-auto flex flex-col justify-center"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background wrapper to prevent scroll expansion */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute w-[500px] h-[500px] bg-gradient-to-r from-[#124f97]/10 via-[#dbda16]/10 to-[#124f97]/10 rounded-full blur-3xl transition-opacity duration-200 ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: `translate(${mousePosition.x - 250}px, ${mousePosition.y - 250}px)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>

          <div className="relative z-10 w-full max-w-sm mx-auto">
            <div className="text-center mb-6 flex flex-col items-center">
              <Image src="/logosigma.png" alt="SIGMA Logo" width={180} height={60} className="object-contain mb-4 mix-blend-multiply" />
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#124f97] tracking-tight mb-2">
                Masuk
              </h1>
              <p className="text-gray-500 text-sm font-medium">Platform optimasi distribusi gizi</p>
            </div>



            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)} noValidate>
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid gap-4">
                <AppInput 
                  label="Email" 
                  placeholder="nama@sigma.id" 
                  type="email" 
                  disabled={isPending}
                  {...form.register("email")}
                />
                <AppInput 
                  label="Password" 
                  placeholder="••••••••" 
                  type="password" 
                  disabled={isPending}
                  {...form.register("password")}
                />
              </div>

              <div className="flex justify-between items-center text-sm mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="rounded border-gray-300 text-[#124f97] focus:ring-[#124f97]" />
                  <span className="text-gray-600 group-hover:text-[#124f97] transition-colors">Ingat saya</span>
                </label>
                <a href="#" className="font-medium text-[#124f97] hover:text-[#dbda16] transition-colors">
                  Lupa password?
                </a>
              </div>

              <button 
                type="submit"
                disabled={isPending}
                className="group relative inline-flex justify-center items-center overflow-hidden rounded-md bg-[#124f97] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#124f97] focus:ring-offset-2 mt-4 disabled:opacity-70 disabled:hover:scale-100"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isPending && <Loader2 size={16} className="animate-spin" />}
                  {isPending ? "Memproses..." : "Masuk"}
                </span>
                {!isPending && (
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-13deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-[#fffbf7]/20" />
                  </div>
                )}
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                Belum punya akun?{" "}
                <Link href="/register" className="font-bold text-[#124f97] hover:text-[#dbda16] transition-colors underline underline-offset-4">
                  Daftar di sini
                </Link>
              </p>
            </form>
          </div>
        </div>

        {/* Kanan - Gambar */}
        <div className="hidden lg:block w-1/2 relative h-full">
          <Image
            src="/mbg.jpg"
            fill
            priority
            alt="Dashboard SIGMA"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#fffbf7]"></div>
          
          <div className="absolute bottom-10 left-10 right-10 text-white p-6 bg-[#124f97]/80 backdrop-blur-md rounded-xl border border-white/20">
            <div className="bg-white/90 inline-block p-2 rounded-lg mb-3">
              <Image src="/logosigma.png" alt="SIGMA Logo" width={120} height={35} className="object-contain mix-blend-multiply" />
            </div>
            <p className="text-sm text-white/90 leading-relaxed">
              Strategic Intelligence for Gizi & Mapping Analysis. 
              Platform cerdas berbasis AI K-Means Clustering untuk optimasi penempatan dapur MBG.
            </p>
          </div>
        </div>
    </div>
  );
};

export default Login1;

