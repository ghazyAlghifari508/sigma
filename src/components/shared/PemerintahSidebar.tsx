"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, LayoutDashboard, Map, BrainCircuit, LineChart, ShieldCheck, BookOpen, MessageSquareWarning } from "lucide-react";
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
    url: "/dashboard/pemerintah",
    icon: LayoutDashboard,
  },
  {
    title: "Keluhan & Laporan",
    url: "/dashboard/pemerintah/laporan",
    icon: MessageSquareWarning,
  },
  {
    title: "Peta Wilayah",
    url: "/dashboard/pemerintah/peta",
    icon: Map,
  },
  {
    title: "Analitik Makro",
    url: "/dashboard/pemerintah/analitik",
    icon: LineChart,
  },
  {
    title: "Edukasi Gizi",
    url: "/dashboard/pemerintah/edukasi",
    icon: BookOpen,
  },
];

export function PemerintahSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" className="border-r border-hairline bg-surface-soft text-ink">
      <SidebarHeader className="flex items-center h-16 border-b border-hairline px-6 bg-white">
        <Link href="/dashboard/pemerintah" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-indigo-600" />
          <span className="font-bold tracking-wider uppercase text-lg text-indigo-600">Pemerintah</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-surface-soft">
        <SidebarGroup>
          <SidebarGroupLabel className="text-body uppercase tracking-widest text-xs mb-2">
            Panel Kontrol
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
        <div className="mb-4 px-2">
          <div className="text-xs font-medium text-body mb-1">Role Aktif</div>
          <div className="text-sm text-ink font-semibold truncate">Dinas Pendidikan</div>
        </div>
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
