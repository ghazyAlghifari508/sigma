import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck, CalendarCheck, HeartPulse, Stethoscope, Settings, Camera, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-[#c9e74a] selection:text-[#1a453b]">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-[#1a453b] font-bold text-xl leading-none tracking-tighter">S</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">SIGMA</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-white/90 text-sm font-medium">
          <Link href="#beranda" className="hover:text-white transition-colors">Beranda</Link>
          <Link href="#layanan" className="hover:text-white transition-colors">Layanan</Link>
          <Link href="#statistik" className="hover:text-white transition-colors">Statistik</Link>
          <Link href="#tentang" className="hover:text-white transition-colors">Tentang</Link>
        </div>
        
        <Link href="/login">
          <Button className="bg-[#c9e74a] text-[#1a453b] hover:bg-[#b8d639] rounded-full px-6 font-semibold border-none">
            Login
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 lg:px-12 bg-[#1a453b] overflow-hidden">
        {/* Background shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] border-[60px] border-white/5 rounded-full -translate-y-1/4 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] border-[40px] border-white/5 rounded-full translate-y-1/4 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          <div className="text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#c9e74a] animate-pulse"></span>
              Platform AI K-Means
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Rekomendasi <br />
              Cerdas <br />
              <span className="text-white/80">Penempatan</span> <br />
              <span className="text-[#c9e74a] relative">
                Dapur MBG
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.99991C49.3333 2.16658 152 -3.40009 199 5.99991" stroke="#C9E74A" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-white/80 text-lg max-w-xl leading-relaxed">
              Strategic Intelligence for Gizi & Mapping Analysis (SIGMA) menggunakan algoritma K-Means untuk menentukan penempatan ideal Satuan Pelayanan Pemenuhan Gizi (SPPG).
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <Link href="/login">
                <Button className="bg-white text-[#1a453b] hover:bg-white/90 rounded-full px-8 py-6 text-base font-semibold group">
                  Lihat Dasbor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center mt-12 lg:mt-0">
            {/* Organic/Geometric background shape */}
            <div className="absolute inset-0 bg-[#c9e74a] rounded-[120px] rounded-tl-none rounded-br-[40px] transform rotate-3 scale-90 lg:scale-100"></div>
            
            {/* Floating UI Elements */}
            <div className="absolute -left-4 md:-left-8 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-xl text-white flex flex-col items-center gap-2 z-20 hidden sm:flex animate-bounce" style={{animationDuration: '3s'}}>
               <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-[#1a453b] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Avatar" layout="fill" objectFit="cover" /></div>
                 <div className="w-10 h-10 rounded-full bg-slate-300 border-2 border-[#1a453b] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" alt="Avatar" layout="fill" objectFit="cover" /></div>
                 <div className="w-10 h-10 rounded-full bg-slate-400 border-2 border-[#1a453b] overflow-hidden relative"><Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Avatar" layout="fill" objectFit="cover" /></div>
               </div>
               <span className="text-xs font-medium px-2 py-1 bg-[#c9e74a] text-[#1a453b] rounded-full mt-1">+25k</span>
            </div>
            
            <div className="absolute -bottom-4 right-4 md:right-8 bg-[#1a453b] border-2 border-white rounded-full px-4 py-2 text-white font-medium shadow-lg z-20 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#c9e74a]"></div>
              Efisiensi 90%
            </div>

            {/* Main Image */}
            <div className="relative w-[85%] h-[85%] rounded-[100px] rounded-tl-none rounded-br-[32px] overflow-hidden shadow-2xl z-10 border-4 border-white/10 bg-slate-200">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Professional Analyst" 
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="layanan" className="py-24 px-6 lg:px-12 bg-white text-center">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a453b] text-white text-sm font-medium shadow-sm">
              <Target className="w-4 h-4 text-[#c9e74a]" /> Layanan Kami
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a453b] tracking-tight">
              Solusi Profesional untuk <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a453b] to-[#2a705f] relative">
                Penempatan Dapur MBG
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#c9e74a]/50 rounded-full"></div>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 relative overflow-hidden bg-slate-200">
                <Image src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" layout="fill" objectFit="cover" alt="Map mapping" className="group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1a453b] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Settings className="w-6 h-6 text-[#c9e74a]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a453b]">Manajemen Distribusi</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Kelola data distribusi harian, kapasitas dapur, dan sekolah yang dilayani dengan mudah dan terpusat.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 relative overflow-hidden bg-slate-200">
                <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" layout="fill" objectFit="cover" alt="Data Analytics" className="group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1a453b] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Target className="w-6 h-6 text-[#c9e74a]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a453b]">Rekomendasi K-Means</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Analisis data cerdas untuk penentuan cluster optimal dan identifikasi zona rawan atau tidak efisien.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group rounded-3xl bg-slate-50 border border-slate-100 overflow-hidden text-left hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 relative overflow-hidden bg-slate-200">
                <Image src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" layout="fill" objectFit="cover" alt="Dashboard" className="group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1a453b] flex items-center justify-center -mt-14 relative z-10 shadow-lg">
                  <Camera className="w-6 h-6 text-[#c9e74a]" />
                </div>
                <h3 className="text-xl font-bold text-[#1a453b]">Pemantauan Real-time</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Dasbor interaktif bagi pemerintah untuk memantau sebaran dapur, peringatan dini, dan keluhan siswa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="statistik" className="py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a453b]">
            Ketika Data Bertemu <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2a705f] to-[#1a453b]">Aksi Nyata</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#c9e74a]/50 transition-colors">
              <div className="text-3xl lg:text-5xl font-bold text-[#1a453b] mb-2">90%</div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Akurasi Rekomendasi</div>
            </div>
            
            <div className="bg-[#1a453b] rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#c9e74a] rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="text-3xl lg:text-5xl font-bold text-white mb-2 relative z-10">6<span className="text-lg lg:text-2xl text-[#c9e74a]">km</span></div>
              <div className="text-white/80 text-xs md:text-sm font-medium relative z-10">Radius Maksimal</div>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#c9e74a]/50 transition-colors">
              <div className="text-3xl lg:text-5xl font-bold text-[#1a453b] mb-2">&lt;3<span className="text-lg lg:text-2xl text-slate-400">dtk</span></div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Waktu Muat Cepat</div>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 hover:border-[#c9e74a]/50 transition-colors">
              <div className="text-3xl lg:text-5xl font-bold text-[#1a453b] mb-2">3</div>
              <div className="text-slate-500 text-xs md:text-sm font-medium">Role Terintegrasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-24 px-6 lg:px-12 bg-[#1a453b] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-96 h-96 border-[40px] border-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute left-0 top-1/2 w-64 h-64 border-[30px] border-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="relative order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-[#c9e74a] rounded-[100px] rounded-bl-none transform -rotate-6 scale-95 origin-bottom-left"></div>
            
            <div className="relative aspect-square rounded-[80px] rounded-br-none overflow-hidden shadow-2xl border-4 border-white/10 bg-slate-200">
               <Image src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Team discussing data" layout="fill" objectFit="cover" />
            </div>
            
            {/* Badge overlay */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 w-32 h-32 lg:w-40 lg:h-40 bg-white rounded-full p-2 shadow-2xl hidden sm:block">
              <div className="w-full h-full border border-dashed border-[#1a453b]/20 rounded-full flex flex-col items-center justify-center text-center">
                <span className="text-[#1a453b] font-bold text-2xl lg:text-3xl">AI</span>
                <span className="text-slate-500 text-[10px] lg:text-xs font-medium uppercase tracking-widest mt-1">Powered</span>
              </div>
            </div>
          </div>
          
          <div className="text-white space-y-8 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Kami Paham Setiap Dapur Itu Unik & <br />
              <span className="text-[#c9e74a] relative inline-block">
                Perlu Strategi Tepat.
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c9e74a]"></div>
              </span>
            </h2>
            
            <p className="text-white/70 leading-relaxed text-lg">
              SIGMA hadir sebagai platform cerdas yang membantu pemerintah memantau, merencanakan, dan mengoptimalkan penempatan dapur Makan Bergizi Gratis (MBG) untuk jangkauan yang lebih merata.
            </p>
            
            <div className="bg-white rounded-2xl p-6 md:p-8 flex items-start gap-4 md:gap-6 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c9e74a]"></div>
              <div className="w-12 h-12 rounded-full bg-[#1a453b]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#1a453b] group-hover:text-white transition-colors duration-300">
                 <Target className="w-6 h-6 text-[#1a453b] group-hover:text-[#c9e74a] transition-colors" />
              </div>
              <div>
                <h4 className="text-[#1a453b] font-bold text-xl mb-2">Misi Kami</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Mendukung program SDGs (Zero Hunger, Sustainable Cities) dengan teknologi AI untuk distribusi gizi yang lebih adil dan efisien.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c9e74a]" />
                <span className="text-white/90">Clustering Optimal</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c9e74a]" />
                <span className="text-white/90">Sistem Peringatan Dini</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c9e74a]" />
                <span className="text-white/90">Laporan Transparan</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#c9e74a]" />
                <span className="text-white/90">Dasbor Interaktif</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 lg:px-12 bg-[#f4f7e1]">
        <div className="max-w-7xl mx-auto space-y-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a453b] text-white text-sm font-medium shadow-sm">
            <HeartPulse className="w-4 h-4 text-[#c9e74a]" /> Kenapa SIGMA
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a453b]">
            Kenapa Memilih <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2a705f] to-[#1a453b]">SIGMA</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-[#fcfeef] rounded-3xl p-8 shadow-sm border border-[#e8ecc5] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#1a453b] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#c9e74a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a453b] mb-3">Keamanan Data</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Proteksi role-based access dan enkripsi yang kuat untuk melindungi data distribusi.
              </p>
            </div>
            
            <div className="bg-[#fcfeef] rounded-3xl p-8 shadow-sm border border-[#e8ecc5] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#1a453b] flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#c9e74a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a453b] mb-3">Ketepatan AI</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Rekomendasi penempatan berbasis Machine Learning dengan K-Means clustering.
              </p>
            </div>
            
            <div className="bg-[#fcfeef] rounded-3xl p-8 shadow-sm border border-[#e8ecc5] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#1a453b] flex items-center justify-center mb-6">
                <CalendarCheck className="w-6 h-6 text-[#c9e74a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a453b] mb-3">Monitoring Harian</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Dasbor yang real-time memberikan update harian tentang jadwal dan distribusi.
              </p>
            </div>
            
            <div className="bg-[#fcfeef] rounded-3xl p-8 shadow-sm border border-[#e8ecc5] hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-[#1a453b] flex items-center justify-center mb-6">
                <Stethoscope className="w-6 h-6 text-[#c9e74a]" />
              </div>
              <h3 className="text-lg font-bold text-[#1a453b] mb-3">Penanganan Responsif</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Sistem keluhan yang terintegrasi memastikan masalah diselesaikan dengan cepat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 px-6 lg:px-12 text-center">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-2 text-[#1a453b]">
             <div className="w-8 h-8 rounded-full bg-[#1a453b] flex items-center justify-center">
               <span className="text-white font-bold text-lg leading-none tracking-tighter">S</span>
             </div>
             <span className="font-semibold text-lg tracking-tight">SIGMA</span>
           </div>
           
           <p className="text-slate-400 text-sm">
             © 2026 Tim Raja Iblis. IN:NOVATE CodeUp! 2026.
           </p>
         </div>
      </footer>
    </div>
  );
}
