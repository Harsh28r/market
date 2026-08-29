"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { inr } from "@/lib/products";
import type { Order, OrderStatus } from "@/lib/store";

const flow: OrderStatus[] = ["placed", "packed", "shipped", "delivered"];

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);

  async function load() {
    const res = await fetch(`/api/orders/${id}`, { cache: "no-store" });
    if (!res.ok) return;
    const data = (await res.json()) as { order: Order };
    setOrder(data.order);
  }

  useEffect(() => {
    void load();
  }, [id]);

  async function setStatus(status: OrderStatus) {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load();
    router.refresh();
  }

  if (!order) {
    return (
      <main className="px-8 py-16 text-mist">Loading order…</main>
    );
  }

  return (
    <main className="px-8 py-10">
      <Link
        href="/admin/orders"
        className="text-[11px] tracking-[0.16em] uppercase text-mist"
      >
        ← Orders
      </Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl">{order.id}</h1>
          <p className="mt-1 text-sm text-mist">
            {new Date(order.createdAt).toLocaleString("en-IN")} · {order.pay.toUpperCase()}
          </p>
        </div>
        <span className="border border-saffron px-3 py-1 text-[11px] tracking-[0.16em] uppercase text-ember">
          {order.status}
        </span>
      </div>

      <ol className="mt-8 flex flex-wrap gap-2">
        {flow.map((s, i) => {
          const idx = flow.indexOf(order.status as (typeof flow)[number]);
          const on = idx >= i && order.status !== "cancelled";
          return (
            <li
              key={s}
              className={`px-3 py-1 text-[11px] tracking-[0.14em] uppercase ${
                on ? "bg-ink text-ivory" : "border border-ink/15 text-mist"
              }`}
            >
              {i + 1}. {s}
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="border border-ink/10 bg-ivory p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-ember">
            Ship to
          </p>
          <p className="mt-3 font-medium">{order.customer.name}</p>
          <p className="text-sm">{order.customer.phone}</p>
          <p className="mt-2 text-sm text-mist">{order.customer.address}</p>
          <a
            className="mt-4 inline-block text-[12px] text-ember"
            href={`https://wa.me/91${order.customer.phone.replace(/\D/g, "").slice(-10)}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp customer →
          </a>
        </section>
        <section className="border border-ink/10 bg-ivory p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-ember">
            Tray
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {order.items.map((i) => (
              <li key={i.slug} className="flex justify-between">
                <span>
                  {i.name} × {i.qty}
                </span>
                <span>{inr(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 flex justify-between border-t border-ink/10 pt-3 text-sm">
            <span>Ship</span>
            <span>{order.ship ? inr(order.ship) : "Free"}</span>
          </p>
          <p className="mt-1 flex justify-between text-lg">
            <span>Due</span>
            <span>{inr(order.total)}</span>
          </p>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {order.status === "placed" && (
          <button type="button" className="btn-admin" onClick={() => void setStatus("packed")}>
            Mark packed
          </button>
        )}
        {order.status === "packed" && (
          <button type="button" className="btn-admin" onClick={() => void setStatus("shipped")}>
            Mark shipped
          </button>
        )}
        {order.status === "shipped" && (
          <button type="button" className="btn-admin" onClick={() => void setStatus("delivered")}>
            Mark delivered
          </button>
        )}
        {order.status !== "cancelled" && order.status !== "delivered" && (
          <button
            type="button"
            className="border border-ink/20 px-4 py-2 text-[11px] tracking-[0.14em] uppercase"
            onClick={() => void setStatus("cancelled")}
          >
            Cancel + restock
          </button>
        )}
      </div>
    </main>
  );
}
