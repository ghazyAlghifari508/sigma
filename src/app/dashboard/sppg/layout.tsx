"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SppgSidebar } from "@/components/shared/SppgSidebar";
import { usePathname } from "next/navigation";

export default function SppgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Helper for generating page title based on route
  const getPageTitle = () => {
    if (pathname === "/dashboard/sppg") return "Dashboard Dapur";
    if (pathname === "/dashboard/sppg/distribusi") return "Distribusi Harian";
    if (pathname === "/dashboard/sppg/keluhan") return "Laporan & Keluhan";
    if (pathname === "/dashboard/sppg/status-pengajuan") return "Status Pendaftaran";
    return "SPPG Area";
  };

  // Kita cek apakah ini halaman status-pengajuan
  // Jika ya, kita tidak menampilkan Sidebar sama sekali agar SPPG tidak bisa akses menu
  const isStatusPage = pathname === "/dashboard/sppg/status-pengajuan";

  if (isStatusPage) {
    return (
      <div className="flex min-h-screen w-full bg-canvas text-ink font-sans">
        <main className="flex-1 flex items-center justify-center p-6 w-full">
          {children}
        </main>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-canvas text-ink font-sans">
        <SppgSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
          <header className="h-16 flex items-center px-6 border-b border-hairline/50 bg-canvas/80 backdrop-blur-sm sticky top-0 z-10 w-full shrink-0">
            <SidebarTrigger className="text-body hover:text-ink mr-4" />
            <h1 className="text-lg font-medium text-ink">{getPageTitle()}</h1>
            <div className="ml-auto flex items-center space-x-4">
              <div className="text-sm text-body hidden sm:block">
                Petugas: <span className="text-indigo-600 font-medium">Budi Santoso</span>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6 md:p-8 lg:p-10 w-full overflow-y-auto">
            <div className="mx-auto max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
