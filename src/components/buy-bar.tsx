"use client";

import { AddToCart } from "@/components/add-to-cart";
import { inr } from "@/lib/products";
import { whatsappHref } from "@/lib/site";

export function BuyBar({
  slug,
  name,
  price,
  out,
}: {
  slug: string;
  name: string;
  price: number;
  out: boolean;
}) {
  return (
    <div className="buy-bar md:hidden">
      <div className="min-w-0">
        <p className="truncate text-[11px] text-ivory/65">{name}</p>
        <p className="text-base font-bold text-ivory">{inr(price)}</p>
      </div>
      <AddToCart
        slug={slug}
        disabled={out}
        label={out ? "Sold out" : "Add"}
        className="btn-gold min-h-12 flex-1 !px-3 !py-3 disabled:opacity-40"
      />
      <a
        href={whatsappHref(`Namaste — I want to order ${name} (${slug}). COD please.`)}
        target="_blank"
        rel="noreferrer"
        className="flex min-h-12 min-w-12 items-center justify-center bg-[#25D366] px-3 text-[11px] font-bold tracking-[0.12em] uppercase text-white"
      >
        Chat
      </a>
    </div>
  );
}
