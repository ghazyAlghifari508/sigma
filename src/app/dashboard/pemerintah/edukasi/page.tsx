import { getSemuaEdukasi } from "@/app/actions/edukasi";
import { EdukasiClient } from "./edukasi-client";
import { auth } from "@/lib/auth";

export default async function EdukasiPemerintahPage() {
  const session = await auth();
  const authorId = session?.user?.id || "";
  
  const result = await getSemuaEdukasi();
  const data = result.success ? result.data : [];

  // @ts-ignore
  return <EdukasiClient initialData={data} authorId={authorId} />;
}
