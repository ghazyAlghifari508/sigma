import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

interface Footer7Props {
  logo?: {
    url: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Platform",
    links: [
      { name: "Dasbor Pemerintah", href: "#" },
      { name: "Manajemen Logistik SPPG", href: "#" },
      { name: "Pemindai AI Gizi Siswa", href: "#" },
      { name: "Analisis K-Means Spatial", href: "#" },
    ],
  },
  {
    title: "SIGMA+",
    links: [
      { name: "Tentang Kami", href: "#" },
      { name: "Blog & Insight", href: "#" },
      { name: "Kontak Kami", href: "#" },
      { name: "Dokumentasi API", href: "#" },
    ],
  },
  {
    title: "Layanan Dukungan",
    links: [
      { name: "Pusat Bantuan", href: "#" },
      { name: "Laporan Keluhan", href: "#" },
      { name: "Kemitraan", href: "#" },
      { name: "Karir", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Syarat & Ketentuan", href: "#" },
  { name: "Kebijakan Privasi", href: "#" },
];

export const Footer7 = ({
  logo = {
    url: "/",
    title: "SIGMA",
  },
  sections = defaultSections,
  description = "Strategic Intelligence for Gizi & Mapping Analysis (SIGMA) adalah platform cerdas berbasis AI K-Means Spatial untuk mengoptimalkan penempatan dapur Makan Bergizi Gratis (MBG) dan memantau distribusi logistik secara transparan.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 SIGMA. Hak cipta dilindungi. Dipersembahkan oleh Tim Raja Iblis.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-16 md:py-24 bg-[#fffbf7] border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start">
              <Link href={logo.url} className="flex items-center gap-2">
                <Image src="/logosigma.png" alt="SIGMA Logo" width={140} height={40} className="object-contain mix-blend-multiply" />
              </Link>
            </div>
            <p className="max-w-[85%] lg:max-w-[70%] text-sm text-gray-500 leading-relaxed">
              {description}
            </p>
            <ul className="flex items-center space-x-6 text-gray-400">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-[#124f97] transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid w-full gap-8 md:grid-cols-3 lg:gap-12">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-[#124f97]">{section.title}</h3>
                <ul className="space-y-3 text-sm text-gray-500">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-[#124f97] transition-colors"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-gray-200 pt-8 text-xs font-medium text-gray-400 md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row md:gap-6">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-[#124f97] transition-colors">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
