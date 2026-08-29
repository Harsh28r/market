import type { Metadata } from "next";
import { ShopGrid } from "@/components/shop-grid";
import { listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop agarbatti",
  description:
    "Nag champa, chandan, rose, loban, kits. Handmade agarbatti for daily pooja.",
};

export default async function ShopPage() {
  const catalog = await listProducts({ activeOnly: true });
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-14">
      <p className="text-[11px] tracking-[0.28em] uppercase text-ember">
        Catalog
      </p>
      <h1 className="font-display mt-2 text-5xl">All the smoke</h1>
      <p className="mt-3 max-w-xl text-mist">
        {catalog.length} listings. Curated, not a kirana wall. New lots appear
        the moment we pack them.
      </p>
      <div className="mt-10">
        <ShopGrid />
      </div>
    </main>
  );
}
