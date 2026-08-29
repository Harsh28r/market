"use client";

import { ProductCard } from "@/components/product-card";
import { useCatalog } from "@/context/catalog";
import { families, type Family } from "@/lib/products";
import { useMemo, useState } from "react";

export function ShopGrid({ initial }: { initial?: Family | "all" }) {
  const { products } = useCatalog();
  const [fam, setFam] = useState<Family | "all">(initial ?? "all");
  const list = useMemo(
    () =>
      (fam === "all" ? products : products.filter((p) => p.family === fam)).filter(
        (p) => p.active,
      ),
    [fam, products],
  );

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {families.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFam(f.id)}
            className={`px-4 py-2 text-[12px] tracking-[0.14em] uppercase ${
              fam === f.id
                ? "bg-ink text-ivory"
                : "border border-ink/15 hover:border-saffron"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </>
  );
}
