import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { inr } from "@/lib/products";
import { findProduct, listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await findProduct(slug);
  return { title: p?.name ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await findProduct(slug);
  if (!p || !p.active) notFound();
  const catalog = await listProducts({ activeOnly: true });
  const related = catalog
    .filter((x) => x.family === p.family && x.slug !== p.slug)
    .slice(0, 3);
  const out = p.stock <= 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12">
      <Link
        href="/shop"
        className="text-[11px] tracking-[0.16em] uppercase text-mist"
      >
        ← Shop
      </Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductArt
          scent={p.scent}
          image={p.image}
          productName={p.name}
          hindiName={p.hindi}
          className="min-h-[480px] w-full rounded border border-gold/30 shadow-md"
        />
        <div>
          <p className="font-deva text-ember">{p.hindi}</p>
          <h1 className="font-display mt-1 text-5xl leading-tight">{p.name}</h1>
          <p className="mt-3 text-lg text-mist">{p.tagline}</p>
          <p className="mt-6">
            <span className="text-3xl">{inr(p.price)}</span>
            {p.mrp > p.price && (
              <span className="ml-3 text-mist line-through">{inr(p.mrp)}</span>
            )}
          </p>
          <p className="mt-2 text-sm text-mist">
            {p.sticks} · burns {p.burn} · COD available
            {out
              ? " · sold out"
              : p.stock < 12
                ? ` · last ${p.stock} in Nashik`
                : ` · ${p.stock} in lot`}
          </p>
          <p className="mt-6 leading-relaxed">{p.story}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.bestFor.map((b) => (
              <li
                key={b}
                className="border border-ink/15 px-3 py-1 text-[11px] tracking-[0.12em] uppercase"
              >
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-mist">Notes · {p.notes.join(" · ")}</p>
          <AddToCart
            slug={p.slug}
            disabled={out}
            label={out ? "Sold out" : "Add to aarti tray"}
            className="mt-8 bg-ink px-8 py-4 text-[12px] tracking-[0.2em] uppercase text-ivory hover:bg-wine disabled:opacity-40"
          />
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl">Burns well with</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.slug} product={r} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
