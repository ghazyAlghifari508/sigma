"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PemerintahSidebar } from "@/components/shared/PemerintahSidebar";
import { usePathname } from "next/navigation";

export default function PemerintahLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  const getPageTitle = () => {
    if (pathname === "/dashboard/pemerintah") return "Dashboard Utama";
    if (pathname === "/dashboard/pemerintah/peta") return "Peta Wilayah — Geospasial Nasional";
    if (pathname === "/dashboard/pemerintah/analitik") return "Analitik & Laporan Makro";
    return "Pemerintah Area";
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-surface-soft text-ink font-sans">
        <PemerintahSidebar />
        
        <div className="flex-1 flex flex-col min-h-screen max-w-full overflow-hidden">
          <header className="h-16 flex items-center px-6 border-b border-hairline/50 bg-canvas/80 backdrop-blur-sm sticky top-0 z-10 w-full shrink-0">
            <SidebarTrigger className="text-body hover:text-ink mr-4" />
            <h1 className="text-lg font-medium text-ink">{getPageTitle()}</h1>
            <div className="ml-auto flex items-center space-x-4">
              <div className="text-sm text-body hidden sm:block">
                Region: <span className="text-ink font-medium">Kab. Bandung</span>
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
