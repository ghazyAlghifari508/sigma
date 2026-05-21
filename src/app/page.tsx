import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, CalendarCheck, HeartPulse, Stethoscope, Settings, Camera, Target, Star, Plus, Minus, Mail, Phone, MapPin, Globe, MessageCircle, Share2 } from 'lucide-react';
import { Footer7 } from "@/components/ui/footer-7";

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#dbda16] selection:text-[#124f97]">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#124f97]">
          <div className="w-8 h-8 rounded-full bg-[#124f97] flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none tracking-tighter">S</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">SIGMA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[#124f97]/80 text-sm font-medium">
          <Link href="#beranda" className="hover:text-[#124f97] transition-colors">Beranda</Link>
          <Link href="#layanan" className="hover:text-[#124f97] transition-colors">Platform</Link>
          <Link href="#statistik" className="hover:text-[#124f97] transition-colors">Dampak</Link>
          <Link href="#tentang" className="hover:text-[#124f97] transition-colors">Tentang</Link>
        </div>
        
        <Link href="/login" className="bg-[#dbda16] text-[#124f97] hover:bg-[#dbda16]/90 rounded-full px-6 py-2.5 font-semibold transition-colors inline-block text-sm shadow-sm">
          Masuk Sistem
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#fffbf7] overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] border-[60px] border-[#124f97]/5 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] border-[40px] border-[#124f97]/5 rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          <div className="text-[#124f97] space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#124f97]/10 text-sm font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#dbda16] animate-pulse"></span>
              Platform Gizi & Mapping Analysis
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Nutrisi <span className="text-[#124f97]/80">Tepat,</span> <br />
              <span className="text-[#dbda16] relative">
                Generasi Kuat
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.99991C49.3333 2.16658 152 -3.40009 199 5.99991" stroke="#dbda16" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg max-w-xl leading-relaxed">
              SIGMA memastikan setiap porsi makanan bergizi gratis sampai ke tangan siswa Indonesia — terukur, transparan, dan terlacak dengan dukungan AI geospasial.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/login" className="bg-[#124f97] text-white hover:bg-[#124f97]/90 shadow-lg shadow-[#124f97]/20 rounded-full px-8 py-4 text-base font-semibold group flex items-center transition-colors">
                Lihat Dasbor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center mt-12 lg:mt-0">
            {/* Organic/Geometric background shape */}
            <div className="absolute inset-0 bg-[#dbda16] rounded-[120px] rounded-tl-none rounded-br-[40px] transform rotate-3 scale-90 lg:scale-100 opacity-90"></div>
            
            {/* Floating UI Elements */}
            <div className="absolute -left-4 md:-left-8 top-1/4 bg-white border border-gray-100 rounded-2xl p-4 shadow-xl text-[#124f97] flex flex-col items-center gap-2 z-20 hidden sm:flex animate-bounce" style={{animationDuration: '3s'}}>
               <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" fill className="object-cover" /></div>
                 <div className="w-10 h-10 rounded-full bg-slate-300 border-2 border-white overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="Avatar" fill className="object-cover" /></div>
                 <div className="w-10 h-10 rounded-full bg-slate-400 border-2 border-white overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Avatar" fill className="object-cover" /></div>
               </div>
               <span className="text-xs font-bold px-2 py-1 bg-[#dbda16] text-[#124f97] rounded-full mt-1">+12k Sekolah</span>
            </div>
            
            <div className="absolute -bottom-4 right-4 md:right-8 bg-white border-2 border-[#124f97]/10 rounded-full px-4 py-2 text-[#124f97] font-bold shadow-lg z-20 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#124f97]"></div>
              Akurasi 98%
            </div>

            {/* Main Image */}
            <div className="relative w-[85%] h-[85%] rounded-[100px] rounded-tl-none rounded-br-[32px] overflow-hidden shadow-2xl z-10 border-8 border-white bg-slate-200">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#124f97] text-white text-sm font-medium shadow-sm">
              <Target className="w-4 h-4 text-[#dbda16]" /> Satu Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#124f97] tracking-tight">
              Satu Platform. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#124f97] to-[#124f97]/70 relative">
                Tiga Peran Utama
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#dbda16]/50 rounded-full"></div>
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
                <div className="w-12 h-12 rounded-2xl bg-[#124f97] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Settings className="w-6 h-6 text-[#dbda16]" />
                </div>
                <h3 className="text-xl font-bold text-[#124f97]">Dapur Memasak & Melapor</h3>
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
                <div className="w-12 h-12 rounded-2xl bg-[#124f97] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Camera className="w-6 h-6 text-[#dbda16]" />
                </div>
                <h3 className="text-xl font-bold text-[#124f97]">Siswa & Scan AI</h3>
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
                <div className="w-12 h-12 rounded-2xl bg-[#124f97] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Target className="w-6 h-6 text-[#dbda16]" />
                </div>
                <h3 className="text-xl font-bold text-[#124f97]">Pemerintah Memonitor</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Analitik makro real-time dan rekomendasi K-Means untuk membantu pengambilan keputusan berbasis data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="statistik" className="py-20 px-6 lg:px-12 bg-[#fffbf7]">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#124f97]">
            Bukti Aksi Nyata <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#124f97] to-[#124f97]/60">SIGMA</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#dbda16]/50 transition-colors shadow-sm">
              <div className="text-3xl lg:text-5xl font-bold text-[#124f97] mb-2">98%</div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Akurasi Data Makanan</div>
            </div>
            
            <div className="bg-[#124f97] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#dbda16] rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="text-3xl lg:text-5xl font-bold text-white mb-2 relative z-10">+12<span className="text-lg lg:text-2xl text-[#dbda16]">k</span></div>
              <div className="text-white/90 text-xs md:text-sm font-medium relative z-10">Cakupan Sekolah</div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#dbda16]/50 transition-colors shadow-sm">
              <div className="text-3xl lg:text-5xl font-bold text-[#124f97] mb-2">&lt;3<span className="text-lg lg:text-2xl text-slate-400">dtk</span></div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Waktu Muat Real-time</div>
            </div>
            
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#dbda16]/50 transition-colors shadow-sm">
              <div className="text-3xl lg:text-5xl font-bold text-[#124f97] mb-2">3</div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Role Terintegrasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-24 px-6 lg:px-12 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-96 h-96 border-[40px] border-[#124f97]/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute left-0 top-1/2 w-64 h-64 border-[30px] border-[#124f97]/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="relative order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-[#dbda16] rounded-[100px] rounded-bl-none transform -rotate-6 scale-95 origin-bottom-left"></div>
            
            <div className="relative aspect-square rounded-[80px] rounded-br-none overflow-hidden shadow-2xl border-8 border-white bg-slate-200">
               <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team discussing data" fill className="object-cover" />
            </div>
            
            {/* Badge overlay */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-full p-2 shadow-2xl hidden sm:block border-2 border-slate-50">
              <div className="w-full h-full border border-dashed border-[#124f97]/30 rounded-full flex flex-col items-center justify-center text-center">
                <span className="text-[#124f97] font-bold text-2xl lg:text-3xl">AI</span>
                <span className="text-slate-500 text-[10px] lg:text-xs font-medium uppercase tracking-widest mt-1">Powered</span>
              </div>
            </div>
          </div>
          
          <div className="text-[#124f97] space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Laporan Biasa Menjadi <br />
              <span className="text-[#dbda16] relative inline-block">
                Kebijakan Cerdas.
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#dbda16]"></div>
              </span>
            </h2>
            
            <p className="text-slate-600 leading-relaxed text-lg">
              Di SIGMA, setiap laporan distribusi makanan diverifikasi secara otomatis — memberikan data gizi yang akurat, aman, dan dapat dipertanggungjawabkan kepada pemerintah.
            </p>
            
            <div className="bg-[#fffbf7] rounded-2xl p-6 md:p-8 flex items-start gap-4 md:gap-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#dbda16]"></div>
              <div className="w-12 h-12 rounded-full bg-[#124f97]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#124f97] group-hover:text-white transition-colors duration-300">
                 <Target className="w-6 h-6 text-[#124f97] group-hover:text-[#dbda16] transition-colors" />
              </div>
              <div>
                <h4 className="text-[#124f97] font-bold text-xl mb-2">Integritas Data</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Kami mengkhususkan diri dalam mengubah kompleksitas logistik program gizi nasional menjadi insight yang dapat ditindaklanjuti.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dbda16]" />
                <span className="text-slate-700 font-medium">Gizi Terukur</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dbda16]" />
                <span className="text-slate-700 font-medium">Sistem Terpadu</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dbda16]" />
                <span className="text-slate-700 font-medium">Ketepatan Distribusi</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#dbda16]" />
                <span className="text-slate-700 font-medium">Laporan Siswa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 lg:px-12 bg-[#fffbf7]">
        <div className="max-w-7xl mx-auto space-y-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#124f97] text-white text-sm font-medium shadow-sm">
            <HeartPulse className="w-4 h-4 text-[#dbda16]" /> Kenapa SIGMA
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#124f97]">
            Sistem Terpercaya <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#124f97] to-[#124f97]/60">MBG Nasional</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#124f97]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#124f97] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#dbda16]" />
              </div>
              <h3 className="text-lg font-bold text-[#124f97] mb-3">Transparansi Data</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Setiap laporan dan keluhan tercatat dengan aman dan dapat dilacak kapan saja oleh pemerintah.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#124f97]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#124f97] flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#dbda16]" />
              </div>
              <h3 className="text-lg font-bold text-[#124f97] mb-3">Ketepatan AI</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Rekomendasi penempatan berbasis Machine Learning (K-Means clustering) agar merata.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#124f97]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#124f97] flex items-center justify-center mb-6">
                <CalendarCheck className="w-6 h-6 text-[#dbda16]" />
              </div>
              <h3 className="text-lg font-bold text-[#124f97] mb-3">Monitoring Harian</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Dasbor yang real-time memberikan update harian tentang jadwal dan distribusi.
              </p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#124f97]/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#124f97] flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6 text-[#dbda16]" />
              </div>
              <h3 className="text-lg font-bold text-[#124f97] mb-3">Penanganan Responsif</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Sistem keluhan yang terintegrasi memastikan masalah gizi diselesaikan dengan cepat.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Footer Component */}
      <Footer7 />
    </div>
  );
}
