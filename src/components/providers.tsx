"use client";

import { CartProvider } from "@/context/cart";
import { CatalogProvider } from "@/context/catalog";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CatalogProvider>
      <CartProvider>
        <AppShell>{children}</AppShell>
      </CartProvider>
    </CatalogProvider>
  );
}
