import type { Metadata } from "next";
import { AdminShell } from "@/components/admin/shell";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Seller admin",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
