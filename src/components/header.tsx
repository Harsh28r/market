"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/cart";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/rituals", label: "By pooja" },
  { href: "/#story", label: "The craft" },
];

export function Header() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/80 text-ivory backdrop-blur-md">
      <div className="flex items-center justify-center bg-saffron px-4 py-1.5 text-center text-[11px] font-medium tracking-wide text-ink">
        Ganesh Utsav · 14 Sept — kits dispatch in 24 hrs · Free mala on orders
        over ₹799
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="leading-none">
          <span className="font-deva text-lg tracking-wide text-gold">अर्पण</span>
          <span className="ml-2 font-display text-xl tracking-[0.22em]">
            ARPAN
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] tracking-[0.16em] uppercase md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-ivory/70 transition hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative text-[13px] tracking-[0.16em] uppercase text-ivory/80 hover:text-gold"
          >
            Tray
            {count > 0 && (
              <span className="absolute -right-3 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron px-1 text-[10px] font-semibold text-ink">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-px w-5 bg-ivory" />
            <span className="mt-1.5 block h-px w-5 bg-ivory" />
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t border-ivory/10 px-5 py-4 text-sm tracking-[0.18em] uppercase md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-ivory/80"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
