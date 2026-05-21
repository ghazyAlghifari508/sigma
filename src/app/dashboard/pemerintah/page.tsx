import { getMakroAnalitik } from "@/app/actions/pemerintah";
import PemerintahClient from "./pemerintah-client";

export default async function PemerintahOverviewPage() {
  const makro = await getMakroAnalitik();

  return <PemerintahClient makro={makro} />;
}
