import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { rituals } from "@/lib/products";
import { listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Shop by Pooja | Ganesh, Lakshmi, Shiva Agarbatti",
  description:
    "Pick agarbatti by ritual — daily aarti, Lakshmi Friday, Shiva Monday, Ganesh utsav. Charcoal-free temple incense mapped to the pooja, not the aisle.",
  alternates: { canonical: "/rituals" },
};

export default async function RitualsPage() {
  const catalog = await listProducts({ activeOnly: true });
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-5 sm:py-14">
      <p className="text-[11px] tracking-[0.28em] uppercase text-ember">
        Merchandizing
      </p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Shop the pooja, not the aisle</h1>
      <p className="mt-3 max-w-xl text-mist">
        People don’t wake up wanting “SKU-04 rose 35 sticks.” They want Friday
        to smell like Lakshmi showed up.
      </p>
      <div className="mt-14 space-y-20">
        {rituals.map((r) => {
          const list = r.slugs
            .map((s) => catalog.find((p) => p.slug === s))
            .filter(Boolean);
          if (!list.length) return null;
          return (
            <section key={r.id}>
              <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink/10 pb-4">
                <div>
                  <p className="font-deva text-gold">{r.hindi}</p>
                  <h2 className="font-display text-3xl">{r.name}</h2>
                  <p className="mt-1 text-sm text-mist">{r.blurb}</p>
                </div>
                <Link
                  href="/shop"
                  className="text-[11px] tracking-[0.16em] uppercase text-ember"
                >
                  Browse all
                </Link>
              </div>
              <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <ProductCard key={p!.slug} product={p!} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
