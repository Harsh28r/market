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
  const hideWa =
    path.startsWith("/product/") || path === "/cart" || path.startsWith("/checkout");
  return (
    <div className="flex min-h-full flex-1 flex-col pb-24 md:pb-20">
      <Clarity />
      <Header />
      {children}
      <Footer />
      {!hideWa && <WhatsAppFloat />}
    </div>
  );
}
