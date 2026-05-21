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
    <Sidebar variant="sidebar" className="border-r border-gray-100 bg-[#fffbf7]">
      <SidebarHeader className="flex items-center h-16 border-b border-gray-100 px-6 bg-white">
        <Link href="/dashboard/pemerintah" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-[#124f97]" />
          <span className="font-bold tracking-wider uppercase text-lg text-[#124f97]">Pemerintah</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-[#fffbf7]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 uppercase tracking-widest text-xs mb-2 font-semibold">
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
                      className={isActive ? "!bg-[#124f97] !text-white shadow-md font-medium rounded-xl transition-all" : "text-gray-500 hover:!text-[#124f97] hover:!bg-[#e7edf4] rounded-xl transition-all"}
                      render={<Link href={item.url} />}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4 bg-[#fffbf7]">
        <div className="mb-4 px-2">
          <div className="text-xs font-medium text-gray-400 mb-1">Role Aktif</div>
          <div className="text-sm text-[#124f97] font-semibold truncate">Dinas Pendidikan</div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Keluar
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
