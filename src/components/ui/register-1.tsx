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
  name?: string;
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

const AppSelect = (props: { label?: string; options: {value: string, label: string}[]; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; placeholder?: string; required?: boolean; name?: string }) => {
  const { label, options, value, onChange, placeholder, required, name } = props;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLSelectElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div className="w-full relative text-left mb-4">
      {label && <label className="block mb-1.5 text-sm text-[#124f97] font-semibold">{label}</label>}
      <div className="relative w-full">
        <select
          name={name}
          required={required}
          className={`peer relative z-10 border-2 border-gray-200 h-12 w-full rounded-md bg-[#fffbf7] px-4 text-[#124f97] font-normal outline-none drop-shadow-sm transition-all duration-200 ease-in-out focus:bg-[#fffbf7] focus:border-[#124f97] appearance-none ${!value ? 'text-gray-400 font-medium' : ''}`}
          value={value}
          onChange={onChange}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {options.map((opt, i) => (
            <option key={i} value={opt.value} className="text-[#124f97] font-normal">{opt.label}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none text-[#124f97]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
        
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

import { registerUser } from "@/app/actions/auth";
import { AlertCircle } from "lucide-react";

export function Register1({ schoolData = {} }: { schoolData?: Record<string, {id: string, nama: string}[]> }) {
  const [role, setRole] = useState<'siswa' | 'sppg'>('siswa');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    formData.append('role', role);

    const result = await registerUser(formData);
    
    if (result.success) {
      window.location.href = '/login';
    } else {
      setError(result.error || "Terjadi kesalahan saat mendaftar");
      setIsPending(false);
    }
  };

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

        <div className="relative z-10 w-full max-w-sm mx-auto my-8">
          <div className="text-center mb-6 flex flex-col items-center">
            <Image src="/logosigma.png" alt="SIGMA Logo" width={180} height={60} className="object-contain mb-4 mix-blend-multiply" />
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#124f97] tracking-tight mb-2">
              Daftar Akun
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
            {error && (
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 border border-red-100 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {role === 'siswa' ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <AppInput name="namaLengkap" label="Nama Lengkap" placeholder="Masukkan nama lengkap" required />
                <div className="grid grid-cols-2 gap-4">
                  <AppInput name="usia" label="Usia" placeholder="Contoh: 15" type="number" required />
                  <AppInput name="kelas" label="Kelas" placeholder="Contoh: X IPA" required />
                </div>
                <AppSelect 
                  name="provinsi"
                  label="Lokasi Provinsi" 
                  value={selectedProvince} 
                  onChange={(e) => {
                    setSelectedProvince(e.target.value);
                    setSelectedSchool('');
                  }}
                  options={Object.keys(schoolData).map(k => ({ value: k, label: k }))}
                  placeholder="Pilih Provinsi"
                  required
                />
                <AppSelect 
                  name="sekolah"
                  label="Asal Sekolah" 
                  value={selectedSchool} 
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  options={selectedProvince && schoolData[selectedProvince] ? schoolData[selectedProvince].map(s => ({ value: s.id, label: s.nama })) : []}
                  placeholder={selectedProvince ? "Pilih Sekolah" : "Pilih provinsi terlebih dahulu"}
                  required
                />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <AppInput name="namaDapur" label="Nama Dapur / Instansi" placeholder="Masukkan nama dapur SPPG" required />
                <AppSelect 
                    name="provinsi"
                    label="Lokasi Provinsi" 
                    value={selectedProvince} 
                    onChange={(e) => {
                      setSelectedProvince(e.target.value);
                      setSelectedSchool('');
                    }}
                    options={Object.keys(schoolData).map(k => ({ value: k, label: k }))}
                    placeholder="Pilih Provinsi"
                    required
                  />
                  <AppSelect 
                    name="sekolah"
                    label="Nama Sekolah" 
                    value={selectedSchool} 
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    options={selectedProvince && schoolData[selectedProvince] ? schoolData[selectedProvince].map(s => ({ value: s.id, label: s.nama })) : []}
                    placeholder={selectedProvince ? "Pilih Sekolah" : "Pilih provinsi terlebih dahulu"}
                    required
                  />
              </div>
            )}

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-100 mt-2">
              <AppInput name="email" label="Email" type="email" placeholder="contoh@sigma.id" required />
              <AppInput name="password" label="Password" type="password" placeholder="••••••••" required />
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
      <div className="hidden lg:block w-1/2 relative bg-[#fffbf7] h-full">
        <Image
          src={role === 'siswa' ? "/mbg_pak_prabowo.jpg" : "/dapur.jpeg"}
          fill
          priority
          alt="Registrasi SIGMA"
          className="object-cover transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-white/90"></div>
        
        <div className="absolute bottom-10 left-10 right-10 text-white p-6 bg-[#124f97]/90 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-white/90 p-1.5 rounded-md flex items-center justify-center">
              <Image src="/logosigma.png" alt="SIGMA Logo" width={100} height={25} className="object-contain mix-blend-multiply" />
            </div>
            <h2 className="text-2xl font-bold">{role === 'siswa' ? 'Siswa' : 'SPPG'}</h2>
          </div>
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

