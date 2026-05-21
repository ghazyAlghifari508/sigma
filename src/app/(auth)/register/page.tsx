import { Register1 } from "@/components/ui/register-1";
import type { Metadata } from "next";
import provinceSchools from "@/lib/province_schools.json";

export const metadata: Metadata = {
  title: "Daftar | SIGMA",
  description: "Daftar akun baru di SIGMA",
};

export default function RegisterPage() {
  const schoolData: Record<string, {id: string, nama: string}[]> = {};
  
  // Baca data dari GeoJSON yang sudah diekstrak ke province_schools.json
  Object.keys(provinceSchools).forEach(prov => {
    // Karena kita tidak punya UUID, kita pakai nama sekolah sebagai ID
    schoolData[prov] = (provinceSchools as Record<string, string[]>)[prov].map(nama => ({
      id: nama,
      nama: nama
    }));
  });

  return <Register1 schoolData={schoolData} />;
}
