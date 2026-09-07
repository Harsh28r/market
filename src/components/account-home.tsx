"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/auth";
import { inr } from "@/lib/products";
import type { Order, PublicUser } from "@/lib/store";

const statusCopy: Record<string, string> = {
  placed: "Placed — packing tonight",
  packed: "Packed",
  shipped: "On the road",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function AccountHome({
  user,
  orders,
}: {
  user: PublicUser;
  orders: Order[];
}) {
  const router = useRouter();
  const { logout, refresh } = useAuth();
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setOk("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        address: String(form.get("address") ?? ""),
      }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setErr(data.error ?? "Couldn’t save.");
      setBusy(false);
      return;
    }
    setOk("Saved.");
    setBusy(false);
    await refresh();
    router.refresh();
  }

  async function onLogout() {
    await logout();
    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-ember">Account</p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl">Namaste, {user.name.split(" ")[0]}</h1>
          <p className="mt-2 break-words text-sm text-mist">
            {user.email}
            {user.emailVerified ? " · verified" : ""}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void onLogout()}
          className="text-[11px] tracking-[0.16em] uppercase text-mist hover:text-ember"
        >
          Sign out
        </button>
      </div>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.1fr]">
        <form onSubmit={onSave} className="space-y-4">
          <h2 className="font-display text-3xl">House details</h2>
          <label className="block text-sm">
            Name
            <input
              required
              name="name"
              defaultValue={user.name}
              className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
            />
          </label>
          <label className="block text-sm">
            Phone
            <input
              required
              name="phone"
              type="tel"
              defaultValue={user.phone}
              className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
            />
          </label>
          <label className="block text-sm">
            Address
            <textarea
              name="address"
              rows={3}
              defaultValue={user.address}
              className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
              placeholder="Flat, lane, city, pin"
            />
          </label>
          {err && <p className="text-sm text-ember">{err}</p>}
          {ok && <p className="text-sm text-ember">{ok}</p>}
          <button
            type="submit"
            disabled={busy}
            className="bg-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save"}
          </button>
        </form>

        <section>
          <h2 className="font-display text-3xl">Orders</h2>
          {orders.length === 0 ? (
            <div className="mt-4 border border-ink/10 bg-ivory p-8">
              <p className="text-mist">Nothing offered yet.</p>
              <Link
                href="/shop"
                className="mt-4 inline-block text-[12px] tracking-[0.16em] uppercase text-ember"
              >
                Light something →
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="border border-ink/10 bg-ivory p-5">
                  <div className="flex justify-between gap-3">
                    <p className="font-medium">{o.id}</p>
                    <p className="text-sm">{inr(o.total)}</p>
                  </div>
                  <p className="mt-1 text-xs text-mist">
                    {new Date(o.createdAt).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    · {statusCopy[o.status] ?? o.status}
                  </p>
                  <ul className="mt-3 space-y-1 text-sm">
                    {o.items.map((i) => (
                      <li key={i.slug} className="flex justify-between gap-2">
                        <span>
                          {i.name} × {i.qty}
                        </span>
                        <span className="text-mist">{inr(i.price * i.qty)}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
