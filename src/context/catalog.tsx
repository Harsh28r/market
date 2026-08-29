"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { products as seed, type Product } from "@/lib/products";

type CatalogCtx = {
  products: Product[];
  ready: boolean;
  refresh: () => Promise<void>;
  get: (slug: string) => Product | undefined;
};

const CatalogContext = createContext<CatalogCtx | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(seed);
  const [ready, setReady] = useState(false);
  const path = usePathname();

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = (await res.json()) as { products?: Product[] };
      if (data.products?.length) setProducts(data.products);
    } catch {
      /* keep seed */
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh, path]);

  const value = useMemo<CatalogCtx>(
    () => ({
      products,
      ready,
      refresh,
      get: (slug) => products.find((p) => p.slug === slug),
    }),
    [products, ready, refresh],
  );

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog outside provider");
  return ctx;
}
