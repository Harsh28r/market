import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { CategoryGrid } from "@/components/category-grid";
import { FestivalBanner } from "@/components/festival-banner";
import { ProcessSteps } from "@/components/process-steps";
import { RitualFinder } from "@/components/ritual-finder";
import { JsonLd } from "@/components/json-ld";
import { absUrl, homeLandingMetadata, landingFaqs, landingJsonLd } from "@/lib/seo";
import { inr, products, reviews } from "@/lib/products";
import { getSeo, listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  return homeLandingMetadata(seo);
}

export default async function Home() {
  const [catalog, seo] = await Promise.all([
    listProducts({ activeOnly: true }),
    getSeo(),
  ]);
  const featured = catalog.filter((p) =>
    [
      "nag-champa-aarti",
      "mysore-chandan",
      "gulab-raj",
      "ganesh-utsav-kit",
    ].includes(p.slug),
  );
  const fresh = catalog.filter((p) =>
    ["mogra-raat", "kewra-ghar", "tulsi-vana", "loban-resin"].includes(p.slug),
  );
  const kit =
    catalog.find((p) => p.slug === "ganesh-utsav-kit") ??
    products.find((p) => p.slug === "ganesh-utsav-kit")!;
  const box =
    catalog.find((p) => p.slug === "nitya-box") ??
    products.find((p) => p.slug === "nitya-box")!;
  return (
    <main>
      {landingJsonLd(
        seo,
        catalog.slice(0, 12).map((p) => ({
          name: p.name,
          url: absUrl(`/product/${p.slug}`, seo.siteUrl),
        })),
      ).map((block, i) => (
        <JsonLd key={i} data={block} />
      ))}
      {/* ARPAN Hero Section */}
      <section className="grain relative min-h-[92vh] overflow-hidden bg-ink text-ivory">
        <Image
          src="/vedasakti_hero.jpg"
          alt="Buy charcoal-free agarbatti online — ARPAN temple incense from Nashik"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-55 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/60 via-ink/75 to-ink" />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 md:justify-center md:pb-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-ink/70 px-3.5 py-1 text-xs text-gold backdrop-blur-md max-w-max">
            <span className="font-deva font-bold">अर्पण · 100% 🌿 Organically Hand-Rolled</span>
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] md:text-7xl">
            Buy charcoal-free
            <br />
            agarbatti online.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/80 md:text-lg">
            ARPAN temple incense from Nashik — hand-rolled Nag Champa, Mysore Chandan, Gulab Raj rose, and loban dhoop. Zero charcoal, 40–50 min burn, COD across India.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="bg-linear-to-r from-saffron to-gold px-8 py-3.5 text-[12px] font-bold tracking-[0.2em] uppercase text-ink shadow-lg hover:brightness-110 transition"
            >
              Shop Agarbatti
            </Link>
            <Link
              href="/rituals"
              className="border border-gold/50 bg-ink/40 backdrop-blur-md px-8 py-3.5 text-[12px] tracking-[0.2em] uppercase text-ivory hover:border-gold hover:text-gold transition"
            >
              Shop by Ritual (पूजा)
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] tracking-[0.16em] uppercase text-ivory/70">
            <li>Hand-rolled masala</li>
            <li>Charcoal-free · non-toxic</li>
            <li>40–50 min burn</li>
            <li>COD across India</li>
          </ul>
        </div>
      </section>

      {/* ARPAN Guarantee Bar */}
      <section className="border-y border-gold/20 bg-ivory">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
          {[
            ["Hand-rolled", "Masala paste, not charcoal dip"],
            ["Charcoal-free", "Clean cream smoke, no cough"],
            ["40–50 min burn", "Longer than kirana sticks"],
            ["Free ship ₹499", "Brass holder included too"],
          ].map(([t, s]) => (
            <li key={t} className="px-5 py-7 text-center md:text-left">
              <p className="text-[12px] tracking-[0.18em] uppercase font-bold text-ink">{t}</p>
              <p className="mt-1 text-sm text-mist">{s}</p>
            </li>
          ))}
        </ul>
      </section>

      <FestivalBanner />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-4xl">Charcoal-free agarbatti for daily pooja</h2>
        <p className="mt-4 max-w-3xl text-mist leading-relaxed">
          ARPAN is a Nashik agarbatti brand for people who want to buy agarbatti online without supermarket charcoal paste. Every stick is hand-rolled masala — sandalwood, dried flowers, and halmaddi — then packed the same day we dispatch. Shop Nag Champa, Mysore Chandan, rose, mogra, tulsi, kewra, and loban dhoop. COD and UPI across India.
        </p>
      </section>

      {/* Shop by Category */}
      <CategoryGrid />

      {/* Interactive Ritual Finder */}
      <RitualFinder />

      {/* Product Catalog Showcase */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-6 border-b border-ink/10 pb-6">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-ember font-bold">
              Devotees’ favourite
            </p>
            <h2 className="font-display mt-2 text-4xl md:text-5xl">
              Best-sellers
            </h2>
            <p className="mt-2 text-sm text-mist">Hand-rolled purity, crafted for aarti.</p>
          </div>
          <Link
            href="/shop"
            className="hidden text-[12px] tracking-[0.18em] uppercase font-bold text-ember hover:text-ink md:inline transition"
          >
            View All Products →
          </Link>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {fresh.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <p className="text-[11px] tracking-[0.28em] uppercase text-ember font-bold">
            Our new sellers
          </p>
          <h2 className="font-display mt-2 text-4xl md:text-5xl">New arrivals</h2>
          <p className="mt-2 max-w-xl text-sm text-mist">
            Fresh Nashik lots. Natural luxury incense, no toxin dip.
          </p>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {fresh.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Brand Craft Story */}
      <section className="bg-wine text-ivory">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <div className="relative min-h-[420px]">
            <Image
              src="/vedasakti_craft.jpg"
              alt="ARPAN Traditional Incense Masala Hand-Rolling Craft"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div id="story" className="flex flex-col justify-center px-8 py-16 md:px-14">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold font-bold">
              The ARPAN Difference
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight">
              We hand-roll real flowers & tree resins into sacred masala sticks.
            </h2>
            <p className="mt-5 text-ivory/80 leading-relaxed">
              Standard commercial agarbatti is made from cheap black charcoal paste dipped in chemical fragrance sprays. ARPAN is crafted using ancient Vedic recipes — natural wood powders, halmaddi, and copper-distilled flower attar.
            </p>
            <p className="mt-4 text-ivory/80 leading-relaxed">
              The result? Thick, sweet, soothing white smoke that purifies the air and lifts the home atmosphere during aarti.
            </p>
          </div>
        </div>
      </section>

      <ProcessSteps />

      {/* Featured Sets */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2">
        <article className="grain relative overflow-hidden bg-ink p-8 text-ivory md:min-h-[420px] rounded border border-gold/30">
          <Image
            src={kit.image || `/products/${kit.slug}.jpg`}
            alt={kit.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-35"
          />
          <div className="relative z-10">
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold font-bold">
            Limited Festive Box
          </p>
          <h3 className="font-display mt-3 text-4xl">{kit.name}</h3>
          <p className="font-deva text-gold mt-1">{kit.hindi}</p>
          <p className="mt-4 max-w-sm text-ivory/75 leading-relaxed">{kit.story}</p>
          <p className="mt-6 text-3xl font-semibold">
            {inr(kit.price)}{" "}
            <span className="text-base text-ivory/40 line-through">
              {inr(kit.mrp)}
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCart
              slug={kit.slug}
              className="bg-saffron px-6 py-3 text-[12px] font-bold tracking-[0.16em] uppercase text-ink hover:bg-gold transition"
            />
            <Link
              href={`/product/${kit.slug}`}
              className="border border-ivory/30 px-6 py-3 text-[12px] tracking-[0.16em] uppercase hover:border-gold transition"
            >
              View Box Details
            </Link>
          </div>
          </div>
        </article>
        <article className="relative overflow-hidden border border-ink/15 bg-ivory p-8 md:min-h-[420px] rounded">
          <Image
            src={box.image || `/products/${box.slug}.jpg`}
            alt={box.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-25"
          />
          <div className="relative z-10">
          <p className="text-[11px] tracking-[0.24em] uppercase text-ember font-bold">
            ARPAN Monthly Subscription
          </p>
          <h3 className="font-display mt-3 text-4xl">{box.name}</h3>
          <p className="font-deva text-ember mt-1">{box.hindi}</p>
          <p className="mt-4 max-w-sm text-mist leading-relaxed">{box.story}</p>
          <p className="mt-6 text-3xl font-semibold">
            {inr(box.price)}
            <span className="text-base text-mist font-normal"> / month</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCart
              slug={box.slug}
              label="Subscribe Nitya Box"
              className="bg-ink px-6 py-3 text-[12px] font-bold tracking-[0.16em] uppercase text-ivory hover:bg-wine transition"
            />
            <Link
              href={`/product/${box.slug}`}
              className="border border-ink/20 px-6 py-3 text-[12px] tracking-[0.16em] uppercase hover:border-ink transition"
            >
              How It Works
            </Link>
          </div>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-[11px] tracking-[0.28em] uppercase text-ember font-bold">
          FAQ
        </p>
        <h2 className="font-display mt-2 text-4xl">Agarbatti online — common questions</h2>
        <dl className="mt-10 grid gap-6 md:grid-cols-2">
          {landingFaqs.map((f) => (
            <div key={f.q} className="border border-ink/10 bg-ivory p-6">
              <dt className="font-display text-2xl leading-snug">{f.q}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-mist">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Testimonials */}
      <section className="bg-ivory py-20 border-t border-ink/10">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-ember font-bold">
            Customer Testimonials
          </p>
          <h2 className="font-display mt-2 text-4xl">From Homes Across India</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {reviews.map((r) => (
              <blockquote
                key={r.name}
                className="border border-gold/30 bg-paper p-6 rounded shadow-xs"
              >
                <div className="text-gold text-sm mb-2">★★★★★</div>
                <p className="font-display text-xl leading-snug">“{r.quote}”</p>
                <footer className="mt-5 text-xs tracking-wider uppercase text-mist font-medium">
                  {r.name} · {r.city} · Verified Purchase ({r.product})
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-ink px-5 py-20 text-center text-ivory border-t border-gold/30">
        <p className="font-deva text-gold text-lg">अर्पण · पवित्र धूप</p>
        <h2 className="font-display mx-auto mt-3 max-w-xl text-4xl leading-tight">
          Buy agarbatti online — same-day Nashik pack
        </h2>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/shop"
            className="bg-saffron px-8 py-3.5 text-[12px] font-bold tracking-[0.18em] uppercase text-ink hover:bg-gold transition"
          >
            Explore ARPAN Catalog
          </Link>
          <Link
            href="/rituals"
            className="border border-ivory/30 px-8 py-3.5 text-[12px] tracking-[0.18em] uppercase hover:border-gold hover:text-gold transition"
          >
            Select Your Pooja
          </Link>
        </div>
      </section>
    </main>
  );
}
