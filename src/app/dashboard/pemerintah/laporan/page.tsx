import { getLaporanForPemerintah } from "@/app/actions/pemerintah";
import LaporanClient from "./laporan-client";

export const metadata = {
  title: "Keluhan & Laporan | Pemerintah | SIGMA",
};

export default async function LaporanPemerintahPage() {
  const laporan = await getLaporanForPemerintah();

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
      <LaporanClient initialLaporan={laporan} />
    </div>
  );
}
