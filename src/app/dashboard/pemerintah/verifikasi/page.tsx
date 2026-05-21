import { getAllSppgForVerification } from "@/app/actions/pemerintah";
import VerifikasiClient from "./verifikasi-client";

export default async function VerifikasiDapurPage() {
  const sppgList = await getAllSppgForVerification();

  return <VerifikasiClient sppgList={JSON.parse(JSON.stringify(sppgList))} />;
}
