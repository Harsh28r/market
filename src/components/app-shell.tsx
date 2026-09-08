"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { Clarity } from "@/components/clarity";

export function AppShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  if (path.startsWith("/admin")) return <>{children}</>;
  return (
    <div className="flex min-h-full flex-1 flex-col pb-24 md:pb-20">
      <Clarity />
      <Header />
      {children}
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
