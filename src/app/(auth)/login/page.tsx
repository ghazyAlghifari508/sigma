import Login1 from "@/components/ui/login-1";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk | SIGMA",
  description: "Masuk ke sistem informasi gizi makro",
};

export default function LoginPage() {
  return <Login1 />;
}
