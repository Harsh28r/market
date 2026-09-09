"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";

import { ArpanLogo } from "@/components/brand-logo";
import { whatsappHref } from "@/lib/site";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?fam=kit", label: "Combos" },
  { href: "/rituals", label: "By pooja" },
  { href: "/#story", label: "The craft" },
];

export function Header() {
  const { count } = useCart();
  const { user, ready } = useAuth();
  const [open, setOpen] = useState(false);
  const accountHref = user ? "/account" : "/login";
  const accountLabel = user ? user.name.split(" ")[0] : "Login";

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/92 text-ivory backdrop-blur-xl">
      <div className="flex items-center justify-center border-b border-white/10 bg-ink px-3 py-1.5 text-center text-[10px] font-medium tracking-[0.18em] uppercase text-gold/80 sm:px-4 sm:text-[11px]">
        <span className="sm:hidden">Free ship ₹499 · 0% charcoal</span>
        <span className="hidden sm:inline">Free shipping over ₹499 · Charcoal-free masala · Nashik dispatch 24h</span>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:px-5 sm:py-3">
        <ArpanLogo size="sm" className="min-w-0" />
        <nav className="hidden items-center gap-8 text-[12px] tracking-[0.18em] uppercase md:flex font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ivory/80 transition hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3 sm:gap-5">
          <a
            href={whatsappHref("Namaste — I want to order Arpan agarbatti.")}
            target="_blank"
            rel="noreferrer"
            className="hidden text-[11px] tracking-[0.14em] uppercase text-gold hover:text-saffron md:inline"
          >
            WhatsApp
          </a>
          <Link
            href={accountHref}
            className="hidden text-[11px] tracking-[0.14em] uppercase text-ivory/80 hover:text-gold md:inline"
          >
            {ready ? accountLabel : "Account"}
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 border border-white/20 px-2.5 py-1.5 text-[11px] tracking-[0.16em] uppercase text-ivory transition hover:border-gold hover:text-gold sm:gap-2 sm:px-3.5 sm:text-[12px]"
          >
            <span>Cart</span>
            {count > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron px-1 text-[10px] font-bold text-ink">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-ivory" />
              <span className="block h-0.5 w-5 bg-ivory" />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-gold/20 bg-ink/95 px-5 py-4 text-xs tracking-[0.2em] uppercase md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-ivory/80 hover:text-gold py-2.5"
            >
              {l.label}
            </Link>
          ))}
          <a
            href={whatsappHref("Namaste — I want to order Arpan agarbatti.")}
            target="_blank"
            rel="noreferrer"
            className="text-gold hover:text-saffron py-2.5"
          >
            WhatsApp order
          </a>
          <Link
            href={accountHref}
            onClick={() => setOpen(false)}
            className="text-ivory/80 hover:text-gold py-2.5"
          >
            {ready ? accountLabel : "Account"}
          </Link>
        </nav>
      )}
    </header>
  );
}
