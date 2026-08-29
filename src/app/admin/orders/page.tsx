"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { inr } from "@/lib/products";
import type { Order, OrderStatus } from "@/lib/store";

const tabs: (OrderStatus | "all")[] = [
  "all",
  "placed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<(typeof tabs)[number]>("all");

  useEffect(() => {
    void fetch("/api/orders")
      .then((r) => r.json())
      .then((d: { orders?: Order[] }) => setOrders(d.orders ?? []));
  }, []);

  const list = useMemo(
    () => (tab === "all" ? orders : orders.filter((o) => o.status === tab)),
    [orders, tab],
  );

  return (
    <main className="px-8 py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-ember">
        Fulfillment
      </p>
      <h1 className="font-display mt-1 text-4xl">Orders</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-3 py-1.5 text-[11px] tracking-[0.14em] uppercase ${
              tab === t ? "bg-ink text-ivory" : "border border-ink/15"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <table className="mt-6 w-full text-left text-sm">
        <thead className="text-[10px] tracking-[0.16em] uppercase text-mist">
          <tr className="border-b border-ink/10">
            <th className="py-2 font-medium">Order</th>
            <th className="font-medium">When</th>
            <th className="font-medium">Customer</th>
            <th className="font-medium">Pay</th>
            <th className="font-medium">Status</th>
            <th className="text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {list.map((o) => (
            <tr key={o.id} className="border-b border-ink/5">
              <td className="py-3">
                <Link href={`/admin/orders/${o.id}`} className="hover:text-ember">
                  {o.id}
                </Link>
              </td>
              <td className="text-mist">
                {new Date(o.createdAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td>
                {o.customer.name}
                <p className="text-xs text-mist">{o.customer.phone}</p>
              </td>
              <td className="uppercase text-[11px]">{o.pay}</td>
              <td className="uppercase text-[11px] tracking-wide text-mist">
                {o.status}
              </td>
              <td className="text-right">{inr(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
