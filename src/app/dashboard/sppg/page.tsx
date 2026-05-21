import { getSppgProfile, getSekolahSasaranSppg, getSekolahByLokasiSppg } from "@/app/actions/sppg";
import SppgOverviewClient from "./sppg-overview-client";
import { Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function SppgOverviewPage() {
  const sppg = await getSppgProfile();
  
  // Jika profil SPPG tidak ada, arahkan untuk login/daftar
  if (!sppg) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl font-bold text-[#124f97] mb-2">Profil Tidak Ditemukan</h2>
        <p className="text-gray-500 mb-6">Sistem tidak dapat menemukan data SPPG Anda.</p>
        <Link href="/login">
          <Button className="bg-[#124f97] text-white">Kembali ke Login</Button>
        </Link>
      </div>
    );
  }

  // Jika status DITOLAK
  if (sppg.status === "DITOLAK") {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <XCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Pendaftaran Ditolak</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-4 leading-relaxed">
          Mohon maaf, pengajuan pendaftaran dapur SPPG Anda <b>({sppg.namaDapur})</b> tidak disetujui oleh Pemerintah.
        </p>
        <div className="bg-red-100/50 border border-red-200 rounded-xl px-6 py-4 max-w-md mb-8 w-full text-left">
          <p className="text-xs font-semibold text-red-800 uppercase tracking-wider mb-1">Alasan Penolakan:</p>
          <p className="text-sm text-red-900 font-medium">
            {sppg.alasanPenolakan || "Lokasi kurang strategis atau tidak memenuhi kriteria standardisasi."}
          </p>
        </div>
        <Link href="/login">
          <Button variant="outline" className="border-gray-300 text-gray-700">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    );
  }

  // Jika status PENDING (belum di-acc)
  if (sppg.status === "PENDING") {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
          <Clock className="w-10 h-10 text-amber-500 animate-pulse" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">Menunggu Verifikasi</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
          Pengajuan pendaftaran dapur SPPG <b>{sppg.namaDapur}</b> sedang dalam proses peninjauan oleh Pemerintah Daerah. Silakan menunggu persetujuan (ACC) yang biasanya memakan waktu 1-3 hari kerja.
        </p>
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl px-6 py-4 max-w-md">
          <p className="text-sm text-blue-800 font-medium">
            Kami akan memberitahukan Anda apabila status pengajuan berubah menjadi Aktif.
          </p>
        </div>
      </div>
    );
  }

  // Jika status AKTIF atau lainnya
  const sekolahSasaran = await getSekolahSasaranSppg();
  const sekolahTersedia = await getSekolahByLokasiSppg();

  return <SppgOverviewClient sppg={sppg} sekolahSasaran={sekolahSasaran} sekolahTersedia={sekolahTersedia} />;
}
