"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Truck, MessageSquareWarning, Building2 } from "lucide-react";
import { signOut } from "next-auth/react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Overview",
    url: "/dashboard/sppg",
    icon: LayoutDashboard,
  },
  {
    title: "Distribusi Harian",
    url: "/dashboard/sppg/distribusi",
    icon: Truck,
  },
  {
    title: "Keluhan Siswa",
    url: "/dashboard/sppg/keluhan",
    icon: MessageSquareWarning,
  },
];

export function SppgSidebar() {
  const pathname = usePathname();

  // Jika di halaman status pengajuan, kita bisa menyembunyikan menu atau mendisable
  const isStatusPage = pathname === "/dashboard/sppg/status-pengajuan";

  return (
    <Sidebar variant="sidebar" className="border-r border-border/40 bg-zinc-950 text-zinc-100">
      <SidebarHeader className="flex items-center h-16 border-b border-border/40 px-6">
        <Link href="/dashboard/sppg" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-amber-500" />
          <span className="font-bold tracking-wider uppercase text-lg text-amber-500">Dapur</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-zinc-500 uppercase tracking-widest text-xs mb-2">
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                const isDisabled = isStatusPage; // disable jika belum di-approve
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive}
                      disabled={isDisabled}
                      className={isActive ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"}
                      render={isDisabled ? <span /> : <Link href={item.url} />}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 p-4">
        <div className="mb-4 px-2">
          <div className="text-xs font-medium text-zinc-500 mb-1">Dapur Aktif</div>
          <div className="text-sm text-zinc-300 font-semibold truncate">Dapur Sentral Telkom</div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
