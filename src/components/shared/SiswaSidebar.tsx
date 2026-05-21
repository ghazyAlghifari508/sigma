"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Home, FileText, Clock, Utensils, BookOpen, Camera } from "lucide-react";
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Overview",
    url: "/dashboard/siswa",
    icon: Home,
  },
  {
    title: "AI Scan Makanan",
    url: "/dashboard/siswa/scan",
    icon: Camera,
  },
  {
    title: "Buat Laporan",
    url: "/dashboard/siswa/laporan",
    icon: FileText,
  },
  {
    title: "Riwayat Laporan",
    url: "/dashboard/siswa/riwayat",
    icon: Clock,
  },
  {
    title: "Edukasi",
    url: "/dashboard/siswa/edukasi",
    icon: BookOpen,
  },
];

export function SiswaSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" className="border-r border-hairline bg-surface-soft text-ink">
      <SidebarHeader className="flex items-center h-16 border-b border-hairline px-6 bg-white">
        <Link href="/dashboard/siswa" className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-indigo-600" />
          <span className="font-bold tracking-wider uppercase text-lg text-indigo-600">Sigma</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-surface-soft">
        <SidebarGroup>
          <SidebarGroupLabel className="text-body uppercase tracking-widest text-xs mb-2">
            Menu Siswa
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      isActive={isActive} 
                      className={isActive ? "bg-white text-indigo-600 shadow-sm border border-hairline" : "text-body hover:text-ink hover:bg-white/60"}
                      render={<Link href={item.url} />}
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

      <SidebarFooter className="border-t border-hairline p-4 bg-white">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-body hover:text-destructive hover:bg-destructive/10"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Keluar
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
