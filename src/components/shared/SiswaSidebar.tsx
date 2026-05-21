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
    <Sidebar variant="sidebar" className="border-r border-gray-100 bg-[#fffbf7]">
      <SidebarHeader className="flex items-center h-16 border-b border-gray-100 px-6 bg-white">
        <Link href="/dashboard/siswa" className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-[#124f97]" />
          <span className="font-bold tracking-wider uppercase text-lg text-[#124f97]">Sigma Siswa</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-[#fffbf7]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 uppercase tracking-widest text-xs mb-2 font-semibold">
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
