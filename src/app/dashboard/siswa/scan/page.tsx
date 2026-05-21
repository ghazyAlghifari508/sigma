import { getScanHistory } from "@/app/actions/scan-makanan";
import ScanClient from "./scan-client";

export const metadata = {
  title: "Scan Makanan MBG | SIGMA",
};

export default async function ScanMakananPage() {
  const history = await getScanHistory();

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <ScanClient initialHistory={history} />
    </div>
  );
}
