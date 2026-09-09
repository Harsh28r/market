"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { SmokeField } from "@/components/smoke-field";

const LOT = [
  { slug: "nag-champa-aarti", hi: "नाग चंपा", en: "Sunday aarti · Nag Champa" },
  { slug: "mysore-chandan", hi: "चंदन", en: "Shiva Monday · Mysore Chandan" },
  { slug: "tulsi-vana", hi: "तुलसी", en: "Tuesday · Tulsi Vana" },
  { slug: "loban-resin", hi: "लोबान", en: "Wednesday · Loban dhoop" },
  { slug: "kewra-ghar", hi: "केवड़ा", en: "Thursday · Kewra Ghar" },
  { slug: "gulab-raj", hi: "गुलाब", en: "Lakshmi Friday · Gulab Raj" },
  { slug: "mogra-raat", hi: "मोगरा", en: "Saturday night · Mogra Raat" },
];

function TodayLot() {
  const lot = LOT[new Date().getDay()];
  return (
    <Link
      href={`/product/${lot.slug}`}
      className="mt-8 flex max-w-md items-center justify-between gap-4 border border-gold/30 bg-ink/50 px-4 py-3 backdrop-blur-md transition hover:border-gold"
    >
      <span>
        <span className="block text-[10px] tracking-[0.2em] uppercase text-gold/70">Today’s stick</span>
        <span className="font-deva text-gold">{lot.hi}</span>
        <span className="mt-0.5 block text-sm text-ivory/75">{lot.en}</span>
      </span>
      <span className="shrink-0 text-[11px] tracking-[0.16em] uppercase text-gold">Light it →</span>
    </Link>
  );
}

export function HeroSanctum() {
  const stage = useRef<HTMLElement>(null);

  function parallax(e: MouseEvent<HTMLElement>) {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", `${x * 18}px`);
    el.style.setProperty("--py", `${y * 10}px`);
  }

  return (
    <section
      ref={stage}
      onMouseMove={parallax}
      className="grain hero-stage relative min-h-[88svh] overflow-hidden bg-ink text-ivory md:min-h-[100svh]"
    >
      <Image
        src="/vedasakti_hero.jpg"
        alt="Buy charcoal-free agarbatti online — ARPAN temple incense from Nashik"
        fill
        priority
        sizes="100vw"
        className="hero-ken object-cover object-[center_42%] opacity-[0.72] md:object-[70%_40%] md:opacity-80"
      />
      <div className="god-rays" />
      <div className="absolute inset-0 bg-linear-to-r from-ink/95 via-ink/55 to-ink/15 md:via-ink/40 md:to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent" />
      <SmokeField origin="right" count={48} />

      <p className="hero-watermark font-display" aria-hidden>
        ARPAN
      </p>

      <div className="filigree filigree-tl" />
      <div className="filigree filigree-tr" />
      <div className="filigree filigree-bl" />
      <div className="filigree filigree-br" />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-6xl items-end px-4 pb-14 pt-24 sm:px-5 md:min-h-[100svh] md:items-center md:pb-24 md:pt-28">
        <div className="hero-copy max-w-2xl">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/40 bg-ink/60 px-3 py-1 text-[11px] text-gold shadow-[0_0_40px_rgba(232,201,106,0.22)] backdrop-blur-md sm:px-3.5 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-saffron" />
            <span className="font-deva font-bold leading-snug">अर्पण · Nashik masala</span>
          </div>
          <p className="mt-5 text-[11px] tracking-[0.22em] uppercase text-gold/80">
            Buy charcoal-free agarbatti
          </p>
          <h1 className="font-display mt-2 text-[2.7rem] leading-[0.9] sm:text-6xl md:text-7xl lg:text-[5.6rem]">
            Light a stick.
            <span className="mt-1 block text-gold">The room becomes a mandir.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ivory/82 sm:text-base md:text-lg">
            Nag Champa, Mysore Chandan, Gulab Raj, loban dhoop. Cream smoke. 40–50 min burn. COD + UPI across India.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/shop" className="btn-gold">
              Shop agarbatti
            </Link>
            <Link href="/rituals" className="btn-ghost">
              Order by pooja
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] tracking-[0.16em] uppercase text-ivory/65">
            <li>Hand-rolled masala</li>
            <li>Zero charcoal</li>
            <li>40–50 min burn</li>
            <li>COD India</li>
          </ul>
          <TodayLot />
        </div>
      </div>
    </section>
  );
}
