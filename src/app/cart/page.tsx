"use client";

import Link from "next/link";
import { ProductArt } from "@/components/product-art";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import { inr } from "@/lib/products";
import { FREE_SHIP_AT, SHIP_FEE } from "@/lib/site";

export default function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();
  const { user } = useAuth();
  const ship = subtotal >= FREE_SHIP_AT || subtotal === 0 ? 0 : SHIP_FEE;
  const total = subtotal + ship;

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <h1 className="font-display text-5xl">Aarti tray</h1>
      <p className="mt-2 text-mist">{count} item{count === 1 ? "" : "s"}</p>
      {items.length === 0 ? (
        <div className="mt-12 border border-ink/10 bg-ivory p-10 text-center">
          <p className="font-display text-3xl">Tray’s empty. House is too quiet.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory"
          >
            Light something
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_280px]">
          <ul className="space-y-6">
            {items.map(({ product, qty }) => (
              <li
                key={product.slug}
                className="flex gap-4 border-b border-ink/10 pb-6"
              >
                <ProductArt
                  slug={product.slug}
                  image={product.image}
                  productName={product.name}
                  hindiName={product.hindi}
                  compact
                  className="h-28 w-24 shrink-0 shadow-sm"
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <Link href={`/product/${product.slug}`} className="font-display text-2xl">
                      {product.name}
                    </Link>
                    <p>{inr(product.price * qty)}</p>
                  </div>
                  <p className="text-sm text-mist">{product.sticks}</p>
                  <div className="mt-auto flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      className="h-8 w-8 border border-ink/20"
                      onClick={() => setQty(product.slug, qty - 1)}
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button
                      type="button"
                      className="h-8 w-8 border border-ink/20"
                      onClick={() => setQty(product.slug, qty + 1)}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      className="ml-auto text-[11px] tracking-[0.14em] uppercase text-mist hover:text-ember"
                      onClick={() => remove(product.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit border border-ink/10 bg-ivory p-6">
            <p className="text-[11px] tracking-[0.2em] uppercase text-ember">
              Bill
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{inr(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Ship</dt>
                <dd>{ship === 0 ? "Free" : inr(ship)}</dd>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-3 text-base">
                <dt>Due</dt>
                <dd>{inr(total)}</dd>
              </div>
            </dl>
            {subtotal > 0 && subtotal < FREE_SHIP_AT && (
              <p className="mt-3 text-xs text-mist">
                Add {inr(FREE_SHIP_AT - subtotal)} for free shipping + brass holder.
              </p>
            )}
            <Link
              href={user ? "/checkout" : "/login?next=/checkout"}
              className="mt-6 block bg-ink py-3 text-center text-[12px] tracking-[0.18em] uppercase text-ivory"
            >
              {user ? "Checkout" : "Verify email to checkout"}
            </Link>
            {!user && (
              <p className="mt-3 text-center text-xs text-mist">
                6-digit code to your mail. Then the order goes through.
              </p>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
