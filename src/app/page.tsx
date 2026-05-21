import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, CalendarCheck, HeartPulse, Stethoscope, Settings, Camera, Target, Star, Plus, Minus, Mail, Phone, MapPin, Globe, MessageCircle, Share2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#f4d35e] selection:text-[#181d26]">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#181d26] font-bold text-xl leading-none tracking-tighter">S</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">SIGMA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
          <Link href="#beranda" className="hover:text-white transition-colors">Beranda</Link>
          <Link href="#layanan" className="hover:text-white transition-colors">Platform</Link>
          <Link href="#statistik" className="hover:text-white transition-colors">Dampak</Link>
          <Link href="#tentang" className="hover:text-white transition-colors">Tentang</Link>
        </div>
        
        <Link href="/login" className="bg-[#f4d35e] text-[#181d26] hover:bg-[#e3c14c] rounded-full px-6 py-2.5 font-semibold transition-colors inline-block text-sm">
          Masuk Sistem
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#181d26] overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] border-[60px] border-white/5 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] border-[40px] border-white/5 rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#f4d35e] animate-pulse"></span>
              Platform Gizi & Mapping Analysis
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Nutrisi <span className="text-white/80">Tepat,</span> <br />
              <span className="text-[#f4d35e] relative">
                Generasi Kuat
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.99991C49.3333 2.16658 152 -3.40009 199 5.99991" stroke="#f4d35e" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-white/80 text-lg max-w-xl leading-relaxed">
              SIGMA memastikan setiap porsi makanan bergizi gratis sampai ke tangan siswa Indonesia — terukur, transparan, dan terlacak dengan dukungan AI geospasial.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/login" className="bg-white text-[#181d26] hover:bg-white/90 rounded-full px-8 py-4 text-base font-semibold group flex items-center transition-colors">
                Lihat Dasbor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center mt-12 lg:mt-0">
            {/* Organic/Geometric background shape */}
            <div className="absolute inset-0 bg-[#f4d35e] rounded-[120px] rounded-tl-none rounded-br-[40px] transform rotate-3 scale-90 lg:scale-100"></div>
            
            {/* Floating UI Elements */}
            <div className="absolute -left-4 md:-left-8 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl text-white flex flex-col items-center gap-2 z-20 hidden sm:flex animate-bounce" style={{animationDuration: '3s'}}>
               <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-[#181d26] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" fill className="object-cover" /></div>
                 <div className="w-10 h-10 rounded-full bg-slate-300 border-2 border-[#181d26] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="Avatar" fill className="object-cover" /></div>
                 <div className="w-10 h-10 rounded-full bg-slate-400 border-2 border-[#181d26] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Avatar" fill className="object-cover" /></div>
               </div>
               <span className="text-xs font-medium px-2 py-1 bg-[#f4d35e] text-[#181d26] rounded-full mt-1">+12k Sekolah</span>
            </div>
            
            <div className="absolute -bottom-4 right-4 md:right-8 bg-[#181d26] border-2 border-white rounded-full px-4 py-2 text-white font-medium shadow-lg z-20 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#f4d35e]"></div>
              Akurasi 98%
            </div>

            {/* Main Image */}
            <div className="relative w-[85%] h-[85%] rounded-[100px] rounded-tl-none rounded-br-[32px] overflow-hidden shadow-2xl z-10 border-4 border-white/10 bg-slate-200">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Distribusi Makanan" 
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-24 px-6 lg:px-12 bg-white text-center">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181d26] text-white text-sm font-medium shadow-sm">
              <Target className="w-4 h-4 text-[#f4d35e]" /> Satu Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#181d26] tracking-tight">
              Satu Platform. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#181d26] to-[#458fff] relative">
                Tiga Peran Utama
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#f4d35e]/50 rounded-full"></div>
              </span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-lg">
              SIGMA menghubungkan Dapur SPPG, Siswa, dan Pemerintah dalam satu ekosistem data yang bersih.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 relative overflow-hidden bg-slate-200">
                <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" fill alt="Dapur SPPG Aktif" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#181d26] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Settings className="w-6 h-6 text-[#f4d35e]" />
                </div>
                <h3 className="text-xl font-bold text-[#181d26]">Dapur Memasak & Melapor</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Petugas SPPG mencatat porsi harian, kapasitas dapur, dan distribusi ke sekolah-sekolah via dasbor.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 relative overflow-hidden bg-slate-200">
                <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" fill alt="Siswa Konfirmasi" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#181d26] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Camera className="w-6 h-6 text-[#f4d35e]" />
                </div>
                <h3 className="text-xl font-bold text-[#181d26]">Siswa & Scan AI</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Siswa mengonfirmasi penerimaan dan dapat memindai makanan dengan AI untuk mendeteksi kualitas gizi.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 relative overflow-hidden bg-slate-200">
                <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" fill alt="Dashboard Pemerintah" className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#181d26] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Target className="w-6 h-6 text-[#f4d35e]" />
                </div>
                <h3 className="text-xl font-bold text-[#181d26]">Pemerintah Memonitor</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Analitik makro real-time dan rekomendasi K-Means untuk membantu pengambilan keputusan berbasis data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="statistik" className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#181d26]">
            Bukti Aksi Nyata <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#458fff] to-[#181d26]">SIGMA</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#f4d35e]/50 transition-colors">
              <div className="text-3xl lg:text-5xl font-bold text-[#181d26] mb-2">98%</div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Akurasi Data Makanan</div>
            </div>
            
            <div className="bg-[#181d26] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#f4d35e] rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="text-3xl lg:text-5xl font-bold text-white mb-2 relative z-10">+12<span className="text-lg lg:text-2xl text-[#f4d35e]">k</span></div>
              <div className="text-white/80 text-xs md:text-sm font-medium relative z-10">Cakupan Sekolah</div>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#f4d35e]/50 transition-colors">
              <div className="text-3xl lg:text-5xl font-bold text-[#181d26] mb-2">&lt;3<span className="text-lg lg:text-2xl text-slate-400">dtk</span></div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Waktu Muat Real-time</div>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#f4d35e]/50 transition-colors">
              <div className="text-3xl lg:text-5xl font-bold text-[#181d26] mb-2">3</div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Role Terintegrasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-24 px-6 lg:px-12 bg-[#181d26] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-96 h-96 border-[40px] border-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute left-0 top-1/2 w-64 h-64 border-[30px] border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="relative order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-[#f4d35e] rounded-[100px] rounded-bl-none transform -rotate-6 scale-95 origin-bottom-left"></div>
            
            <div className="relative aspect-square rounded-[80px] rounded-br-none overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-200">
               <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team discussing data" fill className="object-cover" />
            </div>
            
            {/* Badge overlay */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-full p-2 shadow-2xl hidden sm:block">
              <div className="w-full h-full border border-dashed border-[#181d26]/20 rounded-full flex flex-col items-center justify-center text-center">
                <span className="text-[#181d26] font-bold text-2xl lg:text-3xl">AI</span>
                <span className="text-slate-500 text-[10px] lg:text-xs font-medium uppercase tracking-widest mt-1">Powered</span>
              </div>
            </div>
          </div>
          
          <div className="text-white space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Laporan Biasa Menjadi <br />
              <span className="text-[#f4d35e] relative inline-block">
                Kebijakan Cerdas.
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f4d35e]"></div>
              </span>
            </h2>
            
            <p className="text-white/70 leading-relaxed text-lg">
              Di SIGMA, setiap laporan distribusi makanan diverifikasi secara otomatis — memberikan data gizi yang akurat, aman, dan dapat dipertanggungjawabkan kepada pemerintah.
            </p>
            
            <div className="bg-white rounded-2xl p-6 md:p-8 flex items-start gap-4 md:gap-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#f4d35e]"></div>
              <div className="w-12 h-12 rounded-full bg-[#181d26]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#181d26] group-hover:text-white transition-colors duration-300">
                 <Target className="w-6 h-6 text-[#181d26] group-hover:text-[#f4d35e] transition-colors" />
              </div>
              <div>
                <h4 className="text-[#181d26] font-bold text-xl mb-2">Integritas Data</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Kami mengkhususkan diri dalam mengubah kompleksitas logistik program gizi nasional menjadi insight yang dapat ditindaklanjuti.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#f4d35e]" />
                <span className="text-white/90">Gizi Terukur</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#f4d35e]" />
                <span className="text-white/90">Sistem Terpadu</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#f4d35e]" />
                <span className="text-white/90">Ketepatan Distribusi</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#f4d35e]" />
                <span className="text-white/90">Laporan Siswa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 lg:px-12 bg-[#f5e9d4]">
        <div className="max-w-7xl mx-auto space-y-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181d26] text-white text-sm font-medium shadow-sm">
            <HeartPulse className="w-4 h-4 text-[#f4d35e]" /> Kenapa SIGMA
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#181d26]">
            Sistem Terpercaya <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#458fff] to-[#181d26]">MBG Nasional</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#181d26] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#f4d35e]" />
              </div>
              <h3 className="text-lg font-bold text-[#181d26] mb-3">Transparansi Data</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Setiap laporan dan keluhan tercatat dengan aman dan dapat dilacak kapan saja oleh pemerintah.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#181d26] flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#f4d35e]" />
              </div>
              <h3 className="text-lg font-bold text-[#181d26] mb-3">Ketepatan AI</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Rekomendasi penempatan berbasis Machine Learning (K-Means clustering) agar merata.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#181d26] flex items-center justify-center mb-6">
                <CalendarCheck className="w-6 h-6 text-[#f4d35e]" />
              </div>
              <h3 className="text-lg font-bold text-[#181d26] mb-3">Monitoring Harian</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Dasbor yang real-time memberikan update harian tentang jadwal dan distribusi.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#181d26] flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6 text-[#f4d35e]" />
              </div>
              <h3 className="text-lg font-bold text-[#181d26] mb-3">Penanganan Responsif</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Sistem keluhan yang terintegrasi memastikan masalah gizi diselesaikan dengan cepat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section (New) */}
      <section className="py-24 px-6 lg:px-12 bg-white text-center">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181d26] text-white text-sm font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f4d35e]"></span> Tim Kami
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#181d26]">
            Kenalan dengan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#458fff] to-[#181d26] underline decoration-[#f4d35e] decoration-4 underline-offset-8">Profesional Kami</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            {/* Card 1 */}
            <div className="group flex flex-col items-center">
              <div className="w-full aspect-square md:aspect-[4/5] bg-[#7c83fd] rounded-3xl relative overflow-hidden mb-6 group-hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                 {/* Cutout top right */}
                 <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-bl-3xl z-20"></div>
                 {/* Socials on hover */}
                 <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><Globe className="w-4 h-4 fill-current"/></div>
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><MessageCircle className="w-4 h-4 fill-current"/></div>
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><Share2 className="w-4 h-4 fill-current"/></div>
                 </div>
                 <Image src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600" alt="Dr. Gizi" fill className="object-cover z-10" />
              </div>
              <h3 className="text-xl font-bold text-[#181d26]">Dr. Andi Pratama</h3>
              <p className="text-slate-500 text-sm mt-1">Konsultan Analisis Gizi</p>
            </div>
            
            {/* Card 2 */}
            <div className="group flex flex-col items-center">
              <div className="w-full aspect-square md:aspect-[4/5] bg-[#a3e635] rounded-3xl relative overflow-hidden mb-6 group-hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-bl-3xl z-20"></div>
                 <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><Globe className="w-4 h-4 fill-current"/></div>
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><MessageCircle className="w-4 h-4 fill-current"/></div>
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><Share2 className="w-4 h-4 fill-current"/></div>
                 </div>
                 <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" alt="Data Scientist" fill className="object-cover z-10 object-top" />
              </div>
              <h3 className="text-xl font-bold text-[#181d26]">Siti Aminah, M.Sc</h3>
              <p className="text-slate-500 text-sm mt-1">Lead Data Scientist (K-Means)</p>
            </div>

            {/* Card 3 */}
            <div className="group flex flex-col items-center">
              <div className="w-full aspect-square md:aspect-[4/5] bg-[#0ea5e9] rounded-3xl relative overflow-hidden mb-6 group-hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-bl-3xl z-20"></div>
                 <div className="absolute bottom-4 left-0 w-full flex justify-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><Globe className="w-4 h-4 fill-current"/></div>
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><MessageCircle className="w-4 h-4 fill-current"/></div>
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#181d26] hover:bg-[#f4d35e] transition-colors cursor-pointer"><Share2 className="w-4 h-4 fill-current"/></div>
                 </div>
                 <Image src="https://images.unsplash.com/photo-1537368910025-7028a4ce1766?auto=format&fit=crop&q=80&w=600" alt="Koordinator" fill className="object-cover z-10 object-top" />
              </div>
              <h3 className="text-xl font-bold text-[#181d26]">Budi Santoso</h3>
              <p className="text-slate-500 text-sm mt-1">Koordinator Logistik SPPG</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section (New) */}
      <section className="py-24 px-6 lg:px-12 bg-slate-50/50 text-center border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#181d26]">
            Apa Kata Pengguna <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#458fff] to-[#181d26] underline decoration-[#f4d35e] decoration-4 underline-offset-8">Tentang SIGMA</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Testi 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
              <div>
                <div className="text-[#f4d35e] text-5xl font-serif leading-none mb-2">"</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Aplikasi SIGMA sangat membantu kami di SPPG memantau kapasitas harian. Fitur dasbornya cepat dan mudah dimengerti! Sekarang distribusi makanan jauh lebih terukur.
                </p>
              </div>
              <div>
                <div className="flex gap-1 text-[#f4d35e] mb-5">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#181d26] text-white flex items-center justify-center font-bold text-sm">RK</div>
                  <div>
                    <h4 className="font-bold text-[#181d26] text-sm">Rina Kartika</h4>
                    <p className="text-slate-500 text-xs">Kepala Dapur SPPG - Bandung</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testi 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
              <div>
                <div className="text-[#f4d35e] text-5xl font-serif leading-none mb-2">"</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Sangat praktis! Siswa bisa cek status makanan, scan porsi dengan Vision AI, dan langsung melaporkan gizi harian dari HP. Sangat recommended untuk era digital ini.
                </p>
              </div>
              <div>
                <div className="flex gap-1 text-[#f4d35e] mb-5">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#181d26] text-white flex items-center justify-center font-bold text-sm">SW</div>
                  <div>
                    <h4 className="font-bold text-[#181d26] text-sm">Sarah Wijaya</h4>
                    <p className="text-slate-500 text-xs">Guru Koordinator - Jakarta</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testi 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between h-full hover:shadow-md transition-shadow">
              <div>
                <div className="text-[#f4d35e] text-5xl font-serif leading-none mb-2">"</div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Fitur Peta Clustering K-Means sangat membantu saya dan tim pemerintah melewati tantangan logistik titik buta. Edukasi tentang pemerataan gizi juga informatif.
                </p>
              </div>
              <div>
                <div className="flex gap-1 text-[#f4d35e] mb-5">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 text-slate-200" />
                </div>
                <div className="flex items-center gap-4 pt-5 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-[#181d26] text-white flex items-center justify-center font-bold text-sm">DS</div>
                  <div>
                    <h4 className="font-bold text-[#181d26] text-sm">Dewi Sartika</h4>
                    <p className="text-slate-500 text-xs">Tim Pengawas - Surabaya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Articles Section (New) */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6 lg:pr-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181d26] text-white text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#f4d35e]"></span> Artikel Terbaru
            </div>
            <h2 className="text-4xl font-bold text-[#181d26] leading-tight">
              Blog & Artikel Edukasi <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#458fff] to-[#181d26]">dari Data SIGMA</span>
            </h2>
            <p className="text-slate-500">
              Dapatkan insight praktis seputar optimasi K-Means, pemerataan gizi, dan inovasi distribusi makanan MBG untuk mendukung program nasional.
            </p>
            <div className="pt-4">
              <Link href="#" className="inline-flex items-center text-[#181d26] font-bold hover:text-[#458fff] transition-colors text-sm uppercase tracking-wide">
                Lihat Semua Artikel <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Article 1 */}
            <div className="flex items-center gap-6 group cursor-pointer border-b border-slate-100 pb-6">
              <div className="flex-1 space-y-3">
                <div className="flex gap-4 text-xs font-medium text-slate-400">
                  <span className="text-[#458fff] bg-blue-50 px-2 py-0.5 rounded">Teknologi</span>
                  <span>21 Feb 2026</span>
                </div>
                <h3 className="text-lg font-bold text-[#181d26] group-hover:text-[#458fff] transition-colors leading-snug">
                  Langkah Cerdas Penerapan K-Means untuk Menentukan Titik SPPG
                </h3>
              </div>
              <div className="w-32 h-24 rounded-xl relative overflow-hidden bg-slate-200 shrink-0">
                <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=300" fill className="object-cover group-hover:scale-105 transition-transform duration-300" alt="Article"/>
              </div>
            </div>
            
            {/* Article 2 */}
            <div className="flex items-center gap-6 group cursor-pointer border-b border-slate-100 pb-6">
              <div className="flex-1 space-y-3">
                <div className="flex gap-4 text-xs font-medium text-slate-400">
                  <span className="text-[#458fff] bg-blue-50 px-2 py-0.5 rounded">Gizi Siswa</span>
                  <span>10 Feb 2026</span>
                </div>
                <h3 className="text-lg font-bold text-[#181d26] group-hover:text-[#458fff] transition-colors leading-snug">
                  Pentingnya Pendataan Makanan Berkala dalam Pencegahan Stunting
                </h3>
              </div>
              <div className="w-32 h-24 rounded-xl relative overflow-hidden bg-slate-200 shrink-0">
                <Image src="https://images.unsplash.com/photo-1498837167922-41c53b4f0977?auto=format&fit=crop&q=80&w=300" fill className="object-cover group-hover:scale-105 transition-transform duration-300" alt="Article"/>
              </div>
            </div>
            
            {/* Article 3 */}
            <div className="flex items-center gap-6 group cursor-pointer">
              <div className="flex-1 space-y-3">
                <div className="flex gap-4 text-xs font-medium text-slate-400">
                  <span className="text-[#458fff] bg-blue-50 px-2 py-0.5 rounded">Nutrisi</span>
                  <span>28 Jan 2026</span>
                </div>
                <h3 className="text-lg font-bold text-[#181d26] group-hover:text-[#458fff] transition-colors leading-snug">
                  Panduan Gizi Seimbang MBG untuk Tumbuh Kembang Optimal
                </h3>
              </div>
              <div className="w-32 h-24 rounded-xl relative overflow-hidden bg-slate-200 shrink-0">
                <Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=300" fill className="object-cover group-hover:scale-105 transition-transform duration-300" alt="Article"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & Contact Form Section (New) */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181d26] text-white text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#f4d35e]"></span> FAQ
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#181d26] leading-tight">
              Pertanyaan Seputar <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#458fff] to-[#181d26]">SIGMA</span>
            </h2>
            
            <div className="space-y-4 pt-4">
              {/* Accordion Item 1 */}
              <div className="border-b border-slate-100 pb-5">
                 <div className="flex justify-between items-center cursor-pointer group">
                   <h4 className="font-semibold text-[#181d26] group-hover:text-[#458fff] transition-colors text-lg">Apa itu fitur Analisis K-Means?</h4>
                   <div className="w-8 h-8 rounded-full border border-[#181d26]/10 flex items-center justify-center shrink-0 group-hover:border-[#458fff] transition-colors">
                     <Minus className="w-4 h-4 text-[#181d26] group-hover:text-[#458fff]" />
                   </div>
                 </div>
                 <p className="text-slate-500 text-sm mt-4 leading-relaxed pr-8">
                   K-Means adalah algoritma AI yang digunakan SIGMA untuk menentukan titik paling ideal membangun Dapur SPPG, sehingga jarak distribusi ke sekolah tidak lebih dari 6km demi efisiensi waktu dan gizi makanan yang tetap segar.
                 </p>
              </div>
              
              {/* Item 2 */}
              <div className="border-b border-slate-100 py-5">
                 <div className="flex justify-between items-center cursor-pointer group opacity-80 hover:opacity-100 transition-opacity">
                   <h4 className="font-semibold text-[#181d26] group-hover:text-[#458fff] transition-colors text-lg">Apakah data porsi dan siswa aman?</h4>
                   <div className="w-8 h-8 rounded-full border border-[#181d26]/10 flex items-center justify-center shrink-0 group-hover:border-[#458fff] transition-colors">
                     <Plus className="w-4 h-4 text-[#181d26] group-hover:text-[#458fff]" />
                   </div>
                 </div>
              </div>
              
              {/* Item 3 */}
              <div className="border-b border-slate-100 py-5">
                 <div className="flex justify-between items-center cursor-pointer group opacity-80 hover:opacity-100 transition-opacity">
                   <h4 className="font-semibold text-[#181d26] group-hover:text-[#458fff] transition-colors text-lg">Bagaimana cara mengajukan pembangunan SPPG?</h4>
                   <div className="w-8 h-8 rounded-full border border-[#181d26]/10 flex items-center justify-center shrink-0 group-hover:border-[#458fff] transition-colors">
                     <Plus className="w-4 h-4 text-[#181d26] group-hover:text-[#458fff]" />
                   </div>
                 </div>
              </div>

              {/* Item 4 */}
              <div className="border-b border-slate-100 py-5">
                 <div className="flex justify-between items-center cursor-pointer group opacity-80 hover:opacity-100 transition-opacity">
                   <h4 className="font-semibold text-[#181d26] group-hover:text-[#458fff] transition-colors text-lg">Bagaimana cara kerja fitur Vision AI?</h4>
                   <div className="w-8 h-8 rounded-full border border-[#181d26]/10 flex items-center justify-center shrink-0 group-hover:border-[#458fff] transition-colors">
                     <Plus className="w-4 h-4 text-[#181d26] group-hover:text-[#458fff]" />
                   </div>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form Card */}
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl border border-slate-100 mt-8 lg:mt-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f4d35e]/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[#181d26] mb-8">Butuh bantuan? Kami siap membantu.</h3>
              <form className="space-y-5">
                <input type="text" placeholder="Nama Lengkap" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#458fff] focus:ring-2 focus:ring-[#458fff]/20 transition-all bg-slate-50 text-sm" />
                <input type="email" placeholder="Email Instansi / Pribadi" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#458fff] focus:ring-2 focus:ring-[#458fff]/20 transition-all bg-slate-50 text-sm" />
                <select className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#458fff] focus:ring-2 focus:ring-[#458fff]/20 transition-all bg-slate-50 text-slate-500 appearance-none text-sm cursor-pointer">
                  <option>Kategori Pertanyaan (Teknis / Kemitraan)</option>
                  <option>Dukungan Teknis Dashboard</option>
                  <option>Pendaftaran Dapur SPPG</option>
                  <option>Lainnya</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                   <input type="date" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#458fff] focus:ring-2 focus:ring-[#458fff]/20 transition-all bg-slate-50 text-slate-500 text-sm cursor-pointer" />
                   <input type="time" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:border-[#458fff] focus:ring-2 focus:ring-[#458fff]/20 transition-all bg-slate-50 text-slate-500 text-sm cursor-pointer" />
                </div>
                <button type="button" className="w-full bg-[#181d26] text-white font-bold py-4 rounded-xl hover:bg-[#181d26]/90 transition-colors mt-6 shadow-lg shadow-[#181d26]/10 text-sm uppercase tracking-wide">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Wavy Footer (New) */}
      <footer className="bg-[#181d26] relative mt-24 text-white pt-32 pb-12 px-6 lg:px-12 border-none">
        {/* SVG Wave at the top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full flex">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-20 lg:h-24 fill-[#181d26]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C4.38,0,8.76,0,13.14,0C93.47,0,172.93,17.2,252.12,38.83C275.46,45.2,298.54,51.81,321.39,56.44Z"></path>
          </svg>
        </div>
        
        {/* Circular decorations */}
        <div className="absolute bottom-0 right-0 w-64 h-64 border-[1px] border-white/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 border-[1px] border-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
          <div className="space-y-6 lg:pr-8">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-full bg-[#f4d35e] flex items-center justify-center text-[#181d26]">
                <span className="font-bold text-xl leading-none tracking-tighter">S</span>
              </div>
              <span className="font-semibold text-2xl tracking-tight">SIGMA</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Generasi Anti-Stunting - Platform digital untuk memantau, mendistribusikan, dan mencegah malnutrisi di Indonesia melalui program Makan Bergizi Gratis (MBG).
            </p>
            <div className="space-y-3 text-sm text-white/80 pt-2">
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#f4d35e]"/> info@sigma.id</div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#f4d35e]"/> +62 21 1234 5678</div>
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#f4d35e]"/> Jakarta, Indonesia</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">SIGMA+</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li><Link href="#" className="hover:text-[#f4d35e] transition-colors">Tentang Kami</Link></li>
              <li><Link href="#" className="hover:text-[#f4d35e] transition-colors">Blog & Insight</Link></li>
              <li><Link href="#" className="hover:text-[#f4d35e] transition-colors">Kontak Kami</Link></li>
              <li><Link href="#" className="hover:text-[#f4d35e] transition-colors">Dokumentasi API</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Layanan Utama</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              <li><Link href="#" className="hover:text-[#f4d35e] transition-colors">Dasbor Pemerintah</Link></li>
              <li><Link href="#" className="hover:text-[#f4d35e] transition-colors">Manajemen Logistik SPPG</Link></li>
              <li><Link href="#" className="hover:text-[#f4d35e] transition-colors">Pemindai AI Gizi Siswa</Link></li>
              <li><Link href="#" className="hover:text-[#f4d35e] transition-colors">Analisis K-Means Spatial</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Misi Kami</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Menciptakan Indonesia bebas gizi buruk dan stunting melalui edukasi gizi, teknologi pemantauan distribusi yang transparan, dan rekomendasi penempatan strategis berbasis AI.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 relative z-10">
          <p>© 2026 SIGMA - Hak cipta dilindungi. Dipersembahkan oleh Tim Raja Iblis.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
