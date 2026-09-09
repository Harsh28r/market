"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const FESTS = [
  { name: "Ganesh Chaturthi", hi: "गणेश चतुर्थी", at: "2026-09-14", href: "/product/ganesh-utsav-kit" },
  { name: "Navratri", hi: "नवरात्रि", at: "2026-10-11", href: "/shop?fam=sacred" },
  { name: "Diwali", hi: "दीपावली", at: "2026-11-08", href: "/shop?fam=kit" },
  { name: "Makar Sankranti", hi: "मकर संक्रांति", at: "2027-01-14", href: "/shop" },
];

function nextFest() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return FESTS.find((f) => new Date(`${f.at}T23:59:59`) >= start) ?? FESTS[FESTS.length - 1];
}

export function FestivalPulse() {
  const fest = nextFest();
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(`${fest.at}T00:00:00`);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setDays(Math.max(0, Math.round((end.getTime() - now.getTime()) / 86400000)));
  }, [fest.at]);

  if (days === null || days > 45) return null;

  return (
    <Link
      href={fest.href}
      className="flex flex-col items-start justify-between gap-3 border-b border-gold/25 bg-wine px-5 py-4 text-ivory sm:flex-row sm:items-center sm:px-8"
    >
      <p className="text-sm">
        <span className="font-deva text-gold">{fest.hi}</span>
        <span className="mx-2 text-ivory/40">·</span>
        <span className="tracking-[0.12em] uppercase text-[11px] text-ivory/70">{fest.name}</span>
        <span className="ml-3 font-display text-2xl text-gold">
          {days === 0 ? "Today" : `${days} day${days === 1 ? "" : "s"}`}
        </span>
      </p>
      <span className="text-[11px] tracking-[0.18em] uppercase text-gold">
        Pack the house →
      </span>
    </Link>
  );
}
