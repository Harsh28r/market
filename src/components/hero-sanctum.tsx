"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { IncenseStick } from "@/components/incense-stick";
import { SmokeField } from "@/components/smoke-field";

export function HeroSanctum() {
  const stage = useRef<HTMLElement>(null);

  function parallax(e: MouseEvent<HTMLElement>) {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--px", `${x * 24}px`);
    el.style.setProperty("--py", `${y * 16}px`);
    el.style.setProperty("--rx", `${y * -4}deg`);
    el.style.setProperty("--ry", `${x * 6}deg`);
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
        className="hero-ken object-cover opacity-50"
      />
      <div className="god-rays" />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/78 to-ink/40" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent" />
      <SmokeField origin="stick" count={56} />

      <p className="hero-watermark font-display" aria-hidden>
        ARPAN
      </p>

      <div className="filigree filigree-tl" />
      <div className="filigree filigree-tr" />
      <div className="filigree filigree-bl" />
      <div className="filigree filigree-br" />

      <div className="relative z-10 mx-auto grid min-h-[88svh] max-w-6xl items-end gap-8 px-4 pb-16 pt-24 sm:px-5 md:min-h-[100svh] md:grid-cols-[1.15fr_0.85fr] md:items-center md:pb-24 md:pt-28">
        <div className="hero-copy">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/35 bg-ink/55 px-3 py-1 text-[11px] text-gold shadow-[0_0_40px_rgba(232,201,106,0.18)] backdrop-blur-md sm:px-3.5 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-saffron" />
            <span className="font-deva font-bold leading-snug">अर्पण · hand-rolled in Nashik</span>
          </div>
          <h1 className="font-display mt-5 max-w-3xl text-[2.6rem] leading-[0.92] sm:text-6xl md:text-7xl lg:text-[5.4rem]">
            Light a stick.
            <span className="mt-1 block text-gold">The room becomes a mandir.</span>
          </h1>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ivory/78 sm:mt-6 sm:text-base md:text-lg">
            Charcoal-free agarbatti — Nag Champa, Mysore Chandan, Gulab Raj, loban dhoop. Cream smoke, 40–50 min burn, COD across India.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/shop" className="btn-gold">
              Enter the shop
            </Link>
            <Link href="/rituals" className="btn-ghost">
              Shop by pooja
            </Link>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] tracking-[0.16em] uppercase text-ivory/65">
            <li>Hand-rolled masala</li>
            <li>Zero charcoal</li>
            <li>40–50 min burn</li>
            <li>COD India</li>
          </ul>
        </div>

        <div className="hero-altar relative mx-auto hidden h-[420px] w-full max-w-md md:block lg:h-[520px]">
          <div className="altar-plate" />
          <IncenseStick className="absolute bottom-16 left-1/2 z-20" />
        </div>
      </div>
    </section>
  );
}
