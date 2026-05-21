"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SiswaSidebar } from "@/components/shared/SiswaSidebar";
import { usePathname } from "next/navigation";

export default function SiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Helper for generating page title based on route
  const getPageTitle = () => {
    if (pathname === "/dashboard/siswa") return "Overview";
    if (pathname === "/dashboard/siswa/laporan") return "Buat Laporan";
    if (pathname === "/dashboard/siswa/riwayat") return "Riwayat Laporan";
    return "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-canvas text-ink font-sans">
        <SiswaSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-16 flex items-center px-6 border-b border-hairline bg-white/80 backdrop-blur-sm sticky top-0 z-10 w-full shrink-0">
            <SidebarTrigger className="text-body hover:text-ink mr-4" />
            <h1 className="text-lg font-medium text-ink">{getPageTitle()}</h1>
            <div className="ml-auto flex items-center space-x-4">
              <div className="text-sm text-body">
                Halo, <span className="text-ink font-medium">Siswa Sigma</span>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
