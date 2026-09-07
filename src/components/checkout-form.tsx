"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/auth";
import { useCart } from "@/context/cart";
import { inr } from "@/lib/products";
import { FREE_SHIP_AT, SHIP_FEE } from "@/lib/site";

export function CheckoutForm() {
  const { items, subtotal, clear, count } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [pay, setPay] = useState<"cod" | "upi">("cod");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const ship = subtotal >= FREE_SHIP_AT || subtotal === 0 ? 0 : SHIP_FEE;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length || busy) return;
    setErr("");
    setBusy(true);
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: String(form.get("name") ?? ""),
            phone: String(form.get("phone") ?? ""),
            address: String(form.get("address") ?? ""),
          },
          pay,
          items: items.map(({ product, qty }) => ({
            slug: product.slug,
            name: product.name,
            price: product.price,
            qty,
          })),
          subtotal,
          ship,
          total: subtotal + ship,
        }),
      });
      if (res.status === 401) {
        router.replace("/login?next=/checkout");
        return;
      }
      if (!res.ok) throw new Error("Order failed");
      const data = (await res.json()) as { order?: { id?: string } };
      clear();
      router.push(
        data.order?.id ? `/checkout/done?id=${data.order.id}` : "/checkout/done",
      );
    } catch {
      setErr("Couldn’t place it — try WhatsApp or retry.");
      setBusy(false);
    }
  }

  if (count === 0) {
    return (
      <main className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-display text-4xl">Nothing to offer yet</h1>
        <Link href="/shop" className="mt-6 inline-block text-ember underline">
          Fill the tray
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-12 px-4 py-10 sm:px-5 sm:py-14 md:grid-cols-2">
      <form key={user?.id ?? "in"} onSubmit={onSubmit} className="space-y-5">
        <h1 className="font-display text-4xl sm:text-5xl">Where should it land?</h1>
        <p className="break-words text-sm text-mist">
          Signed in as {user?.email}. Address from your account — edit if the diya moved.
        </p>
        <label className="block text-sm">
          Name
          <input
            required
            name="name"
            defaultValue={user?.name ?? ""}
            className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
            placeholder="As on the doorbell"
          />
        </label>
        <label className="block text-sm">
          Phone
          <input
            required
            name="phone"
            type="tel"
            defaultValue={user?.phone ?? ""}
            className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
            placeholder="WhatsApp number"
          />
        </label>
        <label className="block text-sm">
          Address
          <textarea
            required
            name="address"
            rows={3}
            defaultValue={user?.address ?? ""}
            className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
            placeholder="Flat, lane, city, pin"
          />
        </label>
        <fieldset>
          <legend className="text-sm">Pay</legend>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            {(
              [
                ["cod", "Cash on delivery"],
                ["upi", "UPI on dispatch"],
              ] as const
            ).map(([id, label]) => (
              <label
                key={id}
                className={`flex-1 cursor-pointer border px-3 py-3 text-sm ${
                  pay === id ? "border-saffron bg-ivory" : "border-ink/15"
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  checked={pay === id}
                  onChange={() => setPay(id)}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-ink py-3.5 text-[12px] tracking-[0.2em] uppercase text-ivory disabled:opacity-50"
        >
          {busy ? "Offering…" : `Place order · ${inr(subtotal + ship)}`}
        </button>
        {err && <p className="text-sm text-ember">{err}</p>}
      </form>
      <aside className="h-fit border border-ink/10 bg-ivory p-6">
        <p className="text-[11px] tracking-[0.2em] uppercase text-ember">
          In the tray
        </p>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map(({ product, qty }) => (
            <li key={product.slug} className="flex justify-between gap-3">
              <span>
                {product.name} × {qty}
              </span>
              <span>{inr(product.price * qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex justify-between border-t border-ink/10 pt-4">
          <span>Ship</span>
          <span>{ship === 0 ? "Free" : inr(ship)}</span>
        </p>
        <p className="mt-2 flex justify-between text-lg">
          <span>Due</span>
          <span>{inr(subtotal + ship)}</span>
        </p>
      </aside>
    </main>
  );
}
