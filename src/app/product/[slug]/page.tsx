import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductArt } from "@/components/product-art";
import { ProductCard } from "@/components/product-card";
import { Stars } from "@/components/stars";
import { inr, productRating } from "@/lib/products";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, productJsonLd, productMetadata } from "@/lib/seo";
import { EMAIL, WHATSAPP_DISPLAY, whatsappHref } from "@/lib/site";
import { findProduct, getSeo, listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [p, seo] = await Promise.all([findProduct(slug), getSeo()]);
  if (!p || !p.active) return { title: "Product", robots: { index: false } };
  return productMetadata(p, seo.siteUrl);
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await findProduct(slug);
  if (!p || !p.active) notFound();
  const [catalog, seo] = await Promise.all([
    listProducts({ activeOnly: true }),
    getSeo(),
  ]);
  const related = catalog
    .filter((x) => x.family === p.family && x.slug !== p.slug)
    .slice(0, 3);
  const out = p.stock <= 0;
  const rating = productRating(p.slug);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-5 sm:py-12">
      <JsonLd data={productJsonLd(p, seo.siteUrl)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: p.name, path: `/product/${p.slug}` },
          ],
          seo.siteUrl,
        )}
      />
      <Link
        href="/shop"
        className="text-[11px] tracking-[0.16em] uppercase text-mist"
      >
        ← Shop
      </Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <ProductArt
          slug={p.slug}
          scent={p.scent}
          image={p.image}
          productName={p.name}
          hindiName={p.hindi}
          className="min-h-[280px] w-full rounded border border-gold/30 shadow-md sm:min-h-[380px] md:min-h-[480px]"
        />
        <div>
          <p className="font-deva text-ember">{p.hindi}</p>
          <h1 className="font-display mt-1 text-4xl leading-tight sm:text-5xl">{p.name}</h1>
          <div className="mt-3">
            <Stars score={rating.score} n={rating.n} />
          </div>
          <p className="mt-3 text-lg text-mist">{p.tagline}</p>
          <p className="mt-6">
            <span className="text-3xl">{inr(p.price)}</span>
            {p.mrp > p.price && (
              <span className="ml-3 text-mist line-through">{inr(p.mrp)}</span>
            )}
          </p>
          <p className="text-xs text-mist">Inclusive of tax · Free shipping over ₹499</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Country of origin", "India · Nashik lot"],
              ["Pack content", p.sticks],
              ["Item form", p.family === "resin" || p.scent === "loban" ? "Dhoop / sticks" : "Agarbatti sticks"],
              ["Burn time", p.burn],
              ["Stick length", "10 inch (approx)"],
              ["Charcoal", "0% · masala paste"],
            ].map(([k, v]) => (
              <div key={k} className="border border-ink/10 bg-ivory px-3 py-2">
                <dt className="text-[10px] tracking-[0.16em] uppercase text-mist">{k}</dt>
                <dd className="mt-0.5 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-mist">
            {out
              ? "Sold out"
              : p.stock < 12
                ? `Last ${p.stock} in the Nashik lot`
                : `${p.stock} in lot · 24-hr dispatch`}
          </p>
          <p className="mt-6 leading-relaxed">{p.story}</p>
          <p className="mt-4 text-sm font-medium">In this pack</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-mist">
            <li>{p.sticks} · ~{p.burn} burn each</li>
            <li>Hand-rolled bamboo masala, 0% charcoal</li>
            <li>Notes: {p.notes.join(", ")}</li>
            {p.price >= 499 || p.family === "kit" ? (
              <li>Festive box / holder included on kit lots</li>
            ) : (
              <li>Free brass holder when cart is over ₹499</li>
            )}
          </ul>
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
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <AddToCart
              slug={p.slug}
              disabled={out}
              picker
              label={out ? "Sold out" : "ADD"}
              className="bg-ink px-8 py-4 text-[12px] tracking-[0.2em] uppercase text-ivory hover:bg-wine disabled:opacity-40"
            />
            <a
              href={whatsappHref(
                `Namaste — I want to order ${p.name} (${p.slug}). Please confirm pack + COD.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="border border-[#25D366] px-6 py-4 text-center text-[12px] tracking-[0.16em] uppercase text-[#128C4A] hover:bg-[#25D366] hover:text-white"
            >
              <span className="sm:hidden">WhatsApp us</span>
              <span className="hidden sm:inline">WhatsApp {WHATSAPP_DISPLAY}</span>
            </a>
          </div>
          <p className="mt-3 text-xs text-mist">
            Or email {EMAIL} · same-day Nashik pack.
          </p>
          <div className="mt-8 border-t border-ink/10 pt-6">
            <h2 className="text-[11px] tracking-[0.16em] uppercase text-ember">How to light</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-mist">
              <li>Hold the coated tip in a flame for 8–10 seconds.</li>
              <li>Blow out the flame. A red ember + cream smoke is correct.</li>
              <li>Stand in a brass / clay holder, away from draft and kids.</li>
              <li>Ventilate after aarti. Never leave a burning stick unattended.</li>
            </ol>
          </div>
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
