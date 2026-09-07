import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop-grid";
import { families, type Family } from "@/lib/products";
import { listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop Agarbatti Online | Charcoal-Free Incense & Dhoop",
  description:
    "Buy hand-rolled charcoal-free agarbatti online. Nag Champa, Mysore Chandan, Gulab Raj, Loban dhoop, pooja kits. COD across India.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop ARPAN Agarbatti",
    description: "Charcoal-free temple incense. 40–50 min burn. Nashik packed.",
  },
};

function famFrom(raw?: string): Family | "all" {
  if (raw && families.some((f) => f.id === raw)) return raw as Family;
  return "all";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ fam?: string }>;
}) {
  const { fam } = await searchParams;
  const initial = famFrom(fam);
  const catalog = await listProducts({ activeOnly: true });
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-[11px] tracking-[0.28em] uppercase text-ember">
        Catalog
      </p>
      <h1 className="font-display mt-2 text-5xl">
        {initial === "all"
          ? "All the smoke"
          : families.find((f) => f.id === initial)?.label}
      </h1>
      <p className="mt-3 max-w-xl text-mist">
        {catalog.length} listings. Hand-rolled, charcoal-free. 40–50 min burn.
        Filter like a mandir shelf, not a kirana wall.
      </p>
      <div className="mt-10">
        <ShopGrid key={initial} initial={initial} />
      </div>
    </main>
  );
}
