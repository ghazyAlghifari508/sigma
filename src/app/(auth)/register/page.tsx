import { Register1 } from "@/components/ui/register-1";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar | SIGMA",
  description: "Daftar akun baru di SIGMA",
};

export default function RegisterPage() {
  return <Register1 />;
}
