import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { HeroSanctum } from "@/components/hero-sanctum";
import { ProductCard } from "@/components/product-card";
import { CategoryGrid } from "@/components/category-grid";
import { FestivalBanner } from "@/components/festival-banner";
import { ProcessSteps } from "@/components/process-steps";
import { RitualFinder } from "@/components/ritual-finder";
import { ScentMarquee } from "@/components/scent-marquee";
import { FestivalPulse } from "@/components/festival-pulse";
import { ScentChamber } from "@/components/scent-chamber";
import { JsonLd } from "@/components/json-ld";
import { LotusRule } from "@/components/ornament";
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
      <HeroSanctum />
      <ScentMarquee />
      <FestivalPulse />

      <section className="relative z-10 border-y border-white/10 bg-ink text-ivory">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
          {[
            ["Hand-rolled", "Masala paste, not charcoal dip"],
            ["Charcoal-free", "Clean cream smoke, no cough"],
            ["40–50 min burn", "Longer than kirana sticks"],
            ["Free ship ₹499", "Brass holder included too"],
          ].map(([t, s]) => (
            <li key={t} className="px-5 py-6 text-center md:py-8 md:text-left">
              <p className="text-[11px] tracking-[0.2em] uppercase font-bold text-gold">{t}</p>
              <p className="mt-1 text-sm text-ivory/55">{s}</p>
            </li>
          ))}
        </ul>
      </section>

      <FestivalBanner />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="kicker text-ember">Nashik, not the kirana wall</p>
        <h2 className="font-display mt-3 text-3xl sm:text-5xl">Charcoal-free agarbatti for daily pooja</h2>
        <LotusRule className="mt-5 max-w-44" />
        <p className="mt-5 max-w-3xl text-mist leading-relaxed">
          ARPAN is a Nashik agarbatti brand for people who want to buy agarbatti online without supermarket charcoal paste. Every stick is hand-rolled masala — sandalwood, dried flowers, and halmaddi — then packed the same day we dispatch. Shop Nag Champa, Mysore Chandan, rose, mogra, tulsi, kewra, and loban dhoop. COD and UPI across India.
        </p>
      </section>

      <CategoryGrid />

      <section className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="kicker text-ember">Order today</p>
            <h2 className="font-display mt-2 text-3xl sm:text-4xl md:text-5xl">Best-selling agarbatti</h2>
            <p className="mt-2 text-sm text-mist">Hand-rolled. COD India. Nashik pack in 24 hrs.</p>
            <LotusRule className="mt-5 max-w-36" />
          </div>
          <Link
            href="/shop"
            className="shrink-0 text-[12px] tracking-[0.18em] uppercase font-bold text-ember hover:text-ink transition"
          >
            Shop all →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <ScentChamber />

      <RitualFinder />

      {fresh.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <p className="kicker text-ember">Our new sellers</p>
          <h2 className="font-display mt-2 text-4xl md:text-5xl">New arrivals</h2>
          <p className="mt-2 max-w-xl text-sm text-mist">
            Fresh Nashik lots. Natural luxury incense, no toxin dip.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {fresh.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Brand Craft Story */}
      <section className="relative overflow-hidden bg-wine text-ivory">
        <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
          <span className="absolute -left-4 top-2 font-display text-[clamp(4.5rem,14vw,11rem)] font-black tracking-[0.14em] leading-none text-gold/10">
            ARPAN
          </span>
          <span className="absolute -right-6 bottom-[-0.6rem] font-deva text-[clamp(6rem,18vw,13rem)] leading-none text-gold/10">
            धूप
          </span>
        </div>
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <div className="relative min-h-[260px] sm:min-h-[420px] md:min-h-[560px]">
            <Image
              src="/vedasakti_craft.jpg"
              alt="ARPAN Traditional Incense Masala Hand-Rolling Craft"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-[center_58%]"
            />
          </div>
          <div id="story" className="relative flex flex-col justify-center px-5 py-14 sm:px-8 md:px-14 md:py-16">
            <p className="kicker text-gold">The ARPAN difference</p>
            <h2 className="font-display mt-3 text-4xl leading-tight md:text-5xl">
              Real flowers &amp; tree resins. Rolled like an offering, not a factory dip.
            </h2>
            <LotusRule className="mt-6 max-w-36" />
            <p className="mt-5 text-ivory/80 leading-relaxed">
              Standard commercial agarbatti is cheap black charcoal paste dipped in chemical fragrance sprays. ARPAN uses Vedic masala — wood powders, halmaddi, copper-distilled flower attar.
            </p>
            <p className="mt-4 text-ivory/80 leading-relaxed">
              Thick, sweet, cream smoke. The house should smell expensive after aarti.
            </p>
          </div>
        </div>
      </section>

      <ProcessSteps />

      {/* Featured Sets */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2">
        <article className="relative overflow-hidden bg-ink p-5 text-ivory sm:p-8 md:min-h-[440px]">
          <Image
            src={kit.image || `/products/${kit.slug}.jpg`}
            alt={kit.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-transparent" />
          <div className="relative z-10">
          <p className="kicker text-gold">Limited festive box</p>
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
              className="btn-gold !px-6 !py-3"
            />
            <Link
              href={`/product/${kit.slug}`}
              className="btn-ghost !px-6 !py-3"
            >
              View box
            </Link>
          </div>
          </div>
        </article>
        <article className="relative overflow-hidden border border-ink/10 bg-ivory p-5 sm:p-8 md:min-h-[440px]">
          <Image
            src={box.image || `/products/${box.slug}.jpg`}
            alt={box.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-20"
          />
          <div className="relative z-10">
          <p className="kicker text-ember">Monthly subscription</p>
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
              How it works
            </Link>
          </div>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="kicker text-ember">FAQ</p>
        <h2 className="font-display mt-2 text-3xl sm:text-4xl">Agarbatti online — common questions</h2>
        <dl className="mt-10 grid gap-6 md:grid-cols-2">
          {landingFaqs.map((f) => (
            <div key={f.q} className="border border-ink/10 bg-ivory p-6">
              <dt className="font-display text-2xl leading-snug">{f.q}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-mist">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="relative overflow-hidden bg-ink py-20 text-ivory">
        <div className="absolute inset-0 opacity-40">
          <div className="god-rays !opacity-20" />
        </div>
        <div className="relative mx-auto max-w-6xl px-5">
          <p className="kicker text-gold">From homes across India</p>
          <h2 className="font-display mt-2 text-3xl sm:text-5xl">They lit one stick. Then they reordered.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {reviews.map((r) => (
              <blockquote
                key={r.name}
                className="border border-gold/25 bg-ivory/[0.04] p-7 backdrop-blur-sm"
              >
                <div className="mb-3 text-gold tracking-[0.2em]">★★★★★</div>
                <p className="font-display text-2xl leading-snug">“{r.quote}”</p>
                <footer className="mt-5 text-xs tracking-wider uppercase text-ivory/45 font-medium">
                  {r.name} · {r.city} · {r.product}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-wine px-5 py-24 text-center text-ivory">
        <p className="font-deva text-gold text-2xl">अर्पण · पवित्र धूप</p>
        <h2 className="font-display mx-auto mt-4 max-w-2xl text-4xl leading-tight sm:text-6xl">
          Same-day Nashik pack. Tomorrow it smells like home.
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Link href="/shop" className="btn-gold">
            Order agarbatti
          </Link>
          <Link href="/rituals" className="btn-ghost">
            Select your pooja
          </Link>
        </div>
      </section>
    </main>
  );
}
