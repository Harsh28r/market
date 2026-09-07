"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductArt } from "@/components/product-art";
import { useCatalog } from "@/context/catalog";
import { getProduct, inr, rituals } from "@/lib/products";

export function RitualFinder() {
  const { get, products } = useCatalog();
  const [id, setId] = useState<(typeof rituals)[number]["id"]>("ganesh");
  const ritual = rituals.find((r) => r.id === id)!;
  const picks = useMemo(
    () =>
      ritual.slugs
        .map((s) => get(s) ?? getProduct(s, products) ?? getProduct(s))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    [get, products, ritual],
  );

  return (
    <section className="bg-ink px-5 py-20 text-ivory">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
          Creative sell · start from the pooja, not the SKU
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-3xl leading-tight md:text-5xl">
          What are you lighting for?
        </h2>
        <p className="mt-3 max-w-xl text-ivory/60">
          Pick the ritual. We’ll put the right smoke in the tray — no 40-pack
          guesswork at the kirana.
        </p>
        <div className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {rituals.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setId(r.id)}
              className={`shrink-0 border px-4 py-2.5 text-[12px] tracking-[0.12em] uppercase transition ${
                id === r.id
                  ? "border-saffron bg-saffron text-ink"
                  : "border-ivory/20 text-ivory/80 hover:border-gold"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="font-deva text-2xl text-gold">{ritual.hindi}</p>
            <p className="mt-2 text-lg text-ivory/80">{ritual.blurb}</p>
            <Link
              href="/rituals"
              className="mt-6 inline-block text-[12px] tracking-[0.18em] uppercase text-gold underline-offset-4 hover:underline"
            >
              All pooja maps →
            </Link>
          </div>
          <ul className="space-y-4">
            {picks.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/product/${p.slug}`}
                  className="flex gap-4 border border-ivory/10 bg-ivory/[0.03] p-3 transition hover:border-gold/50"
                >
                  <ProductArt
                    slug={p.slug}
                    image={p.image}
                    productName={p.name}
                    hindiName={p.hindi}
                    compact
                    className="h-32 w-24 shrink-0"
                  />
                  <div className="min-w-0 flex-1 self-center">
                    <p className="font-deva text-xs text-gold">{p.hindi}</p>
                    <p className="font-display text-lg leading-tight sm:text-xl">{p.name}</p>
                    <p className="mt-1 truncate text-sm text-ivory/50">{p.tagline}</p>
                    <p className="mt-2 text-sm text-gold">{inr(p.price)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
