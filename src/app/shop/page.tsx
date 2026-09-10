import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ShopGrid } from "@/components/shop-grid";
import { families, type Family } from "@/lib/products";
import { absUrl } from "@/lib/seo";
import { getSeo, listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

function famFrom(raw?: string): Family | "all" {
  if (raw && families.some((f) => f.id === raw)) return raw as Family;
  return "all";
}

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

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ fam?: string }>;
}) {
  const { fam } = await searchParams;
  const initial = famFrom(fam);
  const [catalog, seo] = await Promise.all([
    listProducts({ activeOnly: true }),
    getSeo(),
  ]);
  const shown =
    initial === "all" ? catalog : catalog.filter((p) => p.family === initial);
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name:
            initial === "all"
              ? "ARPAN charcoal-free agarbatti"
              : `${families.find((f) => f.id === initial)?.label} agarbatti`,
          itemListElement: shown.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absUrl(`/product/${p.slug}`, seo.siteUrl),
            name: p.name,
          })),
        }}
      />
      <p className="kicker text-ember">The sanctum shelf</p>
      <h1 className="font-display mt-2 text-4xl sm:text-6xl">
        {initial === "all"
          ? "Buy agarbatti online"
          : families.find((f) => f.id === initial)?.label}
      </h1>
      <p className="mt-3 max-w-xl text-mist">
        {catalog.length} listings. Hand-rolled, charcoal-free. 40–50 min burn. COD India.
      </p>
      <div className="mt-10">
        <ShopGrid key={initial} initial={initial} />
      </div>
    </main>
  );
}
