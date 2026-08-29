"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { inr, type Product } from "@/lib/products";

export default function InventoryPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [q, setQ] = useState("");

  async function load() {
    const res = await fetch("/api/products?all=1", { cache: "no-store" });
    const data = (await res.json()) as { products?: Product[] };
    setProducts(data.products ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.sku.toLowerCase().includes(s) ||
        p.slug.includes(s),
    );
  }, [products, q]);

  async function toggle(p: Product) {
    await fetch(`/api/products/${p.slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !p.active }),
    });
    await load();
    router.refresh();
  }

  async function nuke(slug: string) {
    if (!confirm("Remove this listing from the shop?")) return;
    await fetch(`/api/products/${slug}`, { method: "DELETE" });
    await load();
    router.refresh();
  }

  return (
    <main className="px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-ember">
            Catalog
          </p>
          <h1 className="font-display mt-1 text-4xl">Inventory</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-ink px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase text-ivory"
        >
          + Add listing
        </Link>
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search title, SKU…"
        className="field mt-6 max-w-sm"
      />
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="text-[10px] tracking-[0.16em] uppercase text-mist">
            <tr className="border-b border-ink/10">
              <th className="py-2 font-medium">Listing</th>
              <th className="font-medium">SKU</th>
              <th className="font-medium">Price</th>
              <th className="font-medium">Stock</th>
              <th className="font-medium">Live</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.slug} className="border-b border-ink/5">
                <td className="py-3">
                  <Link
                    href={`/admin/products/${p.slug}`}
                    className="font-medium hover:text-ember"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-mist">{p.family}</p>
                </td>
                <td className="text-mist">{p.sku}</td>
                <td>{inr(p.price)}</td>
                <td className={p.stock < 20 ? "text-ember" : ""}>{p.stock}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => void toggle(p)}
                    className={`text-[11px] tracking-[0.12em] uppercase ${
                      p.active ? "text-ember" : "text-mist"
                    }`}
                  >
                    {p.active ? "On" : "Off"}
                  </button>
                </td>
                <td className="text-right">
                  <Link
                    href={`/admin/products/${p.slug}`}
                    className="text-[11px] uppercase tracking-wide text-mist hover:text-ink"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => void nuke(p.slug)}
                    className="ml-3 text-[11px] uppercase tracking-wide text-mist hover:text-ember"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
