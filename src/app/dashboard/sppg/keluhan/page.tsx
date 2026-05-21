import { getKeluhanSppg } from "@/app/actions/sppg";
import KeluhanClient from "./keluhan-client";

export default async function SppgKeluhanPage() {
  const keluhan = await getKeluhanSppg();

  return <KeluhanClient initialKeluhan={keluhan} />;
}
