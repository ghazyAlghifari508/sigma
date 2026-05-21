"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, MapPin, AlertCircle, Loader2 } from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ROLE_DASHBOARD: Record<string, string> = {
  SISWA: "/dashboard/siswa",
  SPPG: "/dashboard/sppg",
  PEMERINTAH: "/dashboard/pemerintah",
};

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

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

      // Fetch session untuk mendapatkan role setelah login berhasil
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session?.user?.role as string | undefined;
      const dest = role ? (ROLE_DASHBOARD[role] ?? "/") : "/";
      router.push(dest);
      router.refresh();
    });
  }

  return (
    <div className="min-h-screen w-full bg-surface-soft flex flex-col md:flex-row font-sans">
      
      {/* Left panel - Brand */}
      <aside className="hidden md:flex flex-col flex-1 bg-surface-dark text-white p-12 lg:p-20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center gap-2 mb-16">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-medium tracking-tight">SIGMA</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-normal leading-tight tracking-tight max-w-md mb-6">
              Strategic Intelligence for Gizi & Mapping Analysis
            </h1>
            
            <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
              Platform cerdas berbasis AI K-Means Clustering untuk optimasi
              penempatan dapur MBG — memastikan setiap anak Indonesia mendapat
              makanan bergizi tepat waktu.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8 border-t border-zinc-800 pt-8 mt-12">
            <div>
              <p className="text-3xl font-medium text-white mb-1">≤ 6km</p>
              <p className="text-sm text-zinc-500 uppercase tracking-wider">Radius Optimal</p>
            </div>
            <div>
              <p className="text-3xl font-medium text-white mb-1">3 Role</p>
              <p className="text-sm text-zinc-500 uppercase tracking-wider">Pengguna</p>
            </div>
            <div>
              <p className="text-3xl font-medium text-white mb-1">AI</p>
              <p className="text-sm text-zinc-500 uppercase tracking-wider">K-Means</p>
            </div>
          </div>
        </div>

        {/* Decorative elements - Subtle Signature Coral Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/10 to-transparent pointer-events-none" />
      </aside>

      {/* Right panel - Form */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-canvas">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center md:text-left">
            <h2 className="text-[32px] md:text-[40px] font-normal text-ink mb-2 tracking-tight">Masuk ke SIGMA</h2>
            <p className="text-body">Gunakan akun yang telah terdaftar</p>
          </div>

          <div className="bg-surface-soft border border-hairline rounded-[10px] p-5">
            <h3 className="text-xs font-medium text-body uppercase tracking-widest mb-4">Akun Demo</h3>
            <div className="flex flex-col gap-2">
              {[
                { role: "Siswa", email: "siswa@sigma.id" },
                { role: "SPPG", email: "sppg@sigma.id" },
                { role: "Pemerintah", email: "gov@sigma.id" },
              ].map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  className="flex items-center justify-between px-3 py-2 rounded-[6px] hover:bg-white hover:shadow-sm border border-transparent hover:border-hairline transition-all text-left"
                  onClick={() => {
                    form.setValue("email", acc.email);
                    form.setValue("password", "sigma123");
                  }}
                >
                  <span className="text-sm font-medium text-ink w-24">{acc.role}</span>
                  <span className="text-sm text-body font-mono flex-1">{acc.email}</span>
                </button>
              ))}
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {error && (
                <div className="flex items-center gap-2 p-4 rounded-[6px] bg-destructive/10 text-destructive border border-destructive/20 text-sm">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <label className="text-sm font-medium text-ink" htmlFor="email">Email</label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="nama@sigma.id"
                        className="bg-white border-hairline text-ink focus-visible:ring-indigo-600/20 h-11"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-destructive text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <label className="text-sm font-medium text-ink" htmlFor="password">Password</label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="••••••••"
                          className="bg-white border-hairline text-ink focus-visible:ring-indigo-600/20 h-11 pr-10"
                          disabled={isPending}
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-body hover:text-ink transition-colors"
                          aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                          onClick={() => setShowPassword((v) => !v)}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-destructive text-xs" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                id="btn-login"
                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-pill transition-all mt-4"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  "Masuk ke Dashboard"
                )}
              </Button>
            </form>
          </Form>

          <p className="text-center text-xs text-body/70 pt-8">
            IN:NOVATE – CodeUp! 2026 &middot; Politeknik Astra
          </p>
        </div>
      </main>
    </div>
  );
}
