import { getSekolahSasaranSppg, getDistribusiSppg } from "@/app/actions/sppg";
import DistribusiClient from "./distribusi-client";

export default async function DistribusiPage() {
  const sekolahSasaran = await getSekolahSasaranSppg();
  const riwayatDistribusi = await getDistribusiSppg();

  return (
    <DistribusiClient 
      sekolahSasaran={sekolahSasaran} 
      riwayatDistribusi={riwayatDistribusi} 
    />
  );
}
