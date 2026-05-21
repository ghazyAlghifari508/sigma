'use client'

import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

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

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="w-full relative text-left mb-4">
      {label && <label className="block mb-1.5 text-sm text-[#124f97] font-semibold">{label}</label>}
      <div className="relative w-full">
        <input
          className="peer relative z-10 border-2 border-gray-200 h-12 w-full rounded-md bg-[#fffbf7] px-4 text-[#124f97] font-normal outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-white focus:border-[#124f97] placeholder:text-gray-400 placeholder:font-medium"
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
              style={{ background: `radial-gradient(30px circle at ${mousePosition.x}px 0px, #124f97 0%, transparent 70%)` }}
            />
            <div
              className="absolute pointer-events-none bottom-0 left-0 right-0 h-[2px] z-20 rounded-b-md overflow-hidden"
              style={{ background: `radial-gradient(30px circle at ${mousePosition.x}px 2px, #124f97 0%, transparent 70%)` }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export function Register1() {
  const [role, setRole] = useState<'siswa' | 'sppg'>('siswa');
  const [isPending, setIsPending] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    // Mock registration process
    setTimeout(() => {
      setIsPending(false);
      window.location.href = '/login';
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-white flex font-sans">
      {/* Kiri - Form */}
      <div
        className="w-full lg:w-1/2 px-6 lg:px-16 xl:px-24 py-10 relative overflow-hidden flex flex-col justify-center overflow-y-auto"
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

        <div className="relative z-10 w-full max-w-sm mx-auto my-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#124f97] tracking-tight mb-2">
              Daftar SIGMA
            </h1>
            <p className="text-gray-500 text-sm font-medium">Buat akun untuk bergabung dalam ekosistem</p>
          </div>

          {/* Toggle Role */}
          <div className="flex bg-[#fffbf7] border border-gray-200 rounded-lg p-1 mb-8 shadow-sm">
            <button
              type="button"
              onClick={() => setRole('siswa')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                role === 'siswa' ? 'bg-[#124f97] text-white shadow-sm' : 'text-gray-500 hover:text-[#124f97]'
              }`}
            >
              Sebagai Siswa
            </button>
            <button
              type="button"
              onClick={() => setRole('sppg')}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${
                role === 'sppg' ? 'bg-[#124f97] text-white shadow-sm' : 'text-gray-500 hover:text-[#124f97]'
              }`}
            >
              Sebagai SPPG
            </button>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col">
            {role === 'siswa' ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <AppInput label="Nama Lengkap" placeholder="Masukkan nama lengkap" required />
                <div className="grid grid-cols-2 gap-4">
                  <AppInput label="Usia" placeholder="Contoh: 15" type="number" required />
                  <AppInput label="Kelas" placeholder="Contoh: X IPA" required />
                </div>
                <AppInput label="Asal Sekolah" placeholder="Masukkan nama sekolah" required />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <AppInput label="Nama Dapur / Instansi" placeholder="Masukkan nama dapur SPPG" required />
                <AppInput label="Penanggung Jawab" placeholder="Nama koordinator" required />
                <AppInput label="Lokasi SPPG" placeholder="Alamat lengkap lokasi dapur" required />
              </div>
            )}

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 mt-2">
              <AppInput label="Email" type="email" placeholder="contoh@sigma.id" required />
              <AppInput label="Password" type="password" placeholder="••••••••" required />
            </div>

            <button 
              type="submit"
              disabled={isPending}
              className="group relative inline-flex justify-center items-center overflow-hidden rounded-md bg-[#124f97] px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#124f97]/20 focus:outline-none focus:ring-2 focus:ring-[#124f97] focus:ring-offset-2 mt-6 disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isPending && <Loader2 size={16} className="animate-spin" />}
                {isPending ? "Mendaftarkan..." : "Daftar Sekarang"}
              </span>
            </button>

            <p className="text-center text-sm text-gray-500 mt-8">
              Sudah punya akun?{" "}
              <Link href="/login" className="font-bold text-[#124f97] hover:text-[#dbda16] transition-colors underline underline-offset-4">
                Masuk di sini
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Kanan - Gambar */}
      <div className="hidden lg:block w-1/2 relative bg-[#fffbf7]">
        <Image
          src={role === 'siswa' ? "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1260&h=750" : "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1260&h=750"}
          width={1000}
          height={1000}
          priority
          alt="Registrasi SIGMA"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/90"></div>
        
        <div className="absolute bottom-10 left-10 right-10 text-white p-6 bg-[#124f97]/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">SIGMA {role === 'siswa' ? 'Siswa' : 'SPPG'}</h2>
          <p className="text-sm text-white/90 leading-relaxed">
            {role === 'siswa' 
              ? "Bergabunglah untuk memindai asupan gizi harianmu menggunakan AI dan pastikan setiap makanan yang kamu terima memenuhi standar kesehatan."
              : "Daftarkan dapur Anda untuk menjadi bagian dari jaringan suplai gizi nasional yang terukur, transparan, dan terdistribusi secara cerdas dengan K-Means."}
          </p>
        </div>
      </div>
    </div>
  );
}
