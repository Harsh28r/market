import Image from "next/image";
import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { ProductCard } from "@/components/product-card";
import { RitualFinder } from "@/components/ritual-finder";
import { inr, products, reviews } from "@/lib/products";
import { listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const catalog = await listProducts({ activeOnly: true });
  const featured = catalog.filter((p) =>
    [
      "nag-champa-aarti",
      "mysore-chandan",
      "gulab-raj",
      "ganesh-utsav-kit",
    ].includes(p.slug),
  );
  const kit =
    catalog.find((p) => p.slug === "ganesh-utsav-kit") ??
    products.find((p) => p.slug === "ganesh-utsav-kit")!;
  const box =
    catalog.find((p) => p.slug === "nitya-box") ??
    products.find((p) => p.slug === "nitya-box")!;
  return (
    <main>
      <section className="grain relative min-h-[92vh] overflow-hidden bg-ink text-ivory">
        <Image
          src="/hero-diya.jpg"
          alt="Oil lamp glowing in a dark pooja room"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/40 via-ink/55 to-ink" />
        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-end px-5 pb-20 pt-28 md:justify-center md:pb-24">
          <p className="font-deva text-gold">धूप · अर्पण · आरती</p>
          <h1 className="font-display mt-3 max-w-3xl text-5xl leading-[0.95] md:text-7xl">
            Light it.
            <br />
            Offer it.
            <br />
            Keep the house still.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/75 md:text-lg">
            Handmade agarbatti for people who still do aarti before tea. No
            charcoal cough. No mall perfume. Just temple smoke, packed in Nashik.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="bg-saffron px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ink"
            >
              Shop the smoke
            </Link>
            <Link
              href="/rituals"
              className="border border-ivory/30 px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory hover:border-gold"
            >
              Shop by pooja
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ivory">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
          {[
            ["Charcoal-light paste", "No black throat, no cheap ash"],
            ["Temple-grade oils", "Chandan, mogra, loban — not spray"],
            ["COD · India-wide", "WhatsApp the tray if you’d rather"],
            ["24-hr dispatch", "Nashik lot, packed same evening"],
          ].map(([t, s]) => (
            <li key={t} className="px-5 py-7">
              <p className="text-[12px] tracking-[0.16em] uppercase">{t}</p>
              <p className="mt-1 text-sm text-mist">{s}</p>
            </li>
          ))}
        </ul>
      </section>

      <RitualFinder />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-ember">
              The tray
            </p>
            <h2 className="font-display mt-2 text-4xl md:text-5xl">
              What sells because it burns right
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-[12px] tracking-[0.18em] uppercase text-ember md:inline"
          >
            Full catalog →
          </Link>
        </div>
        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="bg-wine text-ivory">
        <div className="mx-auto grid max-w-6xl md:grid-cols-2">
          <div className="relative min-h-[380px]">
            <Image
              src="/craft-bazaar.jpg"
              alt="Indian spice and attar bazaar"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div id="story" className="flex flex-col justify-center px-8 py-16 md:px-14">
            <p className="text-[11px] tracking-[0.28em] uppercase text-gold">
              Why Arpan, not the kirana bundle
            </p>
            <h2 className="font-display mt-3 text-4xl leading-tight">
              We sell a ritual that doesn’t smell like burning cardboard.
            </h2>
            <p className="mt-5 text-ivory/70 leading-relaxed">
              Most agarbatti is charcoal dust + a squirt of oil. It catches, it
              stinks, you open a window. Ours is a masala paste — wood powder,
              halmaddi, real attar — rolled by hand in small lots. The smoke is
              cream, not grey. The house stays.
            </p>
            <p className="mt-4 text-ivory/70 leading-relaxed">
              Creative bit: we don’t merchandize “50 fragrances.” We merchandize
              the pooja. Ganesh kit. Friday Lakshmi. Monday Shiva. A monthly box
              so your parents never run out. That’s the whole business.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-20 md:grid-cols-2">
        <article className="grain relative overflow-hidden bg-ink p-8 text-ivory md:min-h-[420px]">
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold">
            Limited · 14 Sept
          </p>
          <h3 className="font-display mt-3 text-4xl">{kit.name}</h3>
          <p className="font-deva text-gold">{kit.hindi}</p>
          <p className="mt-4 max-w-sm text-ivory/70">{kit.story}</p>
          <p className="mt-6 text-2xl">
            {inr(kit.price)}{" "}
            <span className="text-base text-ivory/40 line-through">
              {inr(kit.mrp)}
            </span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCart
              slug={kit.slug}
              className="bg-saffron px-5 py-3 text-[12px] tracking-[0.16em] uppercase text-ink"
            />
            <Link
              href={`/product/${kit.slug}`}
              className="border border-ivory/25 px-5 py-3 text-[12px] tracking-[0.16em] uppercase"
            >
              What’s inside
            </Link>
          </div>
        </article>
        <article className="border border-ink/10 bg-ivory p-8 md:min-h-[420px]">
          <p className="text-[11px] tracking-[0.24em] uppercase text-ember">
            Set and forget
          </p>
          <h3 className="font-display mt-3 text-4xl">{box.name}</h3>
          <p className="font-deva text-ember">{box.hindi}</p>
          <p className="mt-4 max-w-sm text-mist">{box.story}</p>
          <p className="mt-6 text-2xl">
            {inr(box.price)}
            <span className="text-base text-mist"> / month</span>
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCart
              slug={box.slug}
              label="Start the box"
              className="bg-ink px-5 py-3 text-[12px] tracking-[0.16em] uppercase text-ivory"
            />
            <Link
              href={`/product/${box.slug}`}
              className="border border-ink/20 px-5 py-3 text-[12px] tracking-[0.16em] uppercase"
            >
              How it works
            </Link>
          </div>
        </article>
      </section>

      <section className="bg-ivory py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-[11px] tracking-[0.28em] uppercase text-ember">
            From houses that still ring a bell
          </p>
          <h2 className="font-display mt-2 text-4xl">Not influencer quotes</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {reviews.map((r) => (
              <blockquote
                key={r.name}
                className="border border-ink/10 bg-paper p-6"
              >
                <p className="font-display text-2xl leading-snug">“{r.quote}”</p>
                <footer className="mt-5 text-sm text-mist">
                  {r.name} · {r.city} · {r.product}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-16 text-center text-ivory">
        <p className="font-deva text-gold">नित्य धूप</p>
        <h2 className="font-display mx-auto mt-2 max-w-xl text-4xl">
          Don’t overthink the stick. Pick the pooja.
        </h2>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/shop"
            className="bg-saffron px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ink"
          >
            Open the shop
          </Link>
          <Link
            href="/rituals"
            className="border border-ivory/30 px-6 py-3 text-[12px] tracking-[0.18em] uppercase"
          >
            Map a ritual
          </Link>
        </div>
      </section>
    </main>
  );
}
