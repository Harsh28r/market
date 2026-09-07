import Link from "next/link";
import { inr } from "@/lib/products";
import { listOrders, listProducts, listUsers } from "@/lib/store";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  placed: "Placed",
  packed: "Packed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default async function AdminHome() {
  const [orders, products, users] = await Promise.all([
    listOrders(),
    listProducts(),
    listUsers(),
  ]);
  const live = orders.filter((o) => o.status !== "cancelled");
  const gmv = live.reduce((n, o) => n + o.total, 0);
  const units = live.reduce(
    (n, o) => n + o.items.reduce((x, i) => x + i.qty, 0),
    0,
  );
  const aov = live.length ? Math.round(gmv / live.length) : 0;
  const low = products.filter((p) => p.active && p.stock < 20);
  const seoMissing = products.filter((p) => p.active && (!p.seoTitle || !p.seoDescription));
  const pipeline = ["placed", "packed", "shipped", "delivered"] as const;
  const counts = Object.fromEntries(
    pipeline.map((s) => [s, orders.filter((o) => o.status === s).length]),
  );
  const sold: Record<string, number> = {};
  for (const o of live) {
    for (const i of o.items) sold[i.name] = (sold[i.name] ?? 0) + i.qty;
  }
  const top = Object.entries(sold)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <main className="px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-ember">
            Today’s house
          </p>
          <h1 className="font-display mt-1 text-4xl">Overview</h1>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/seo"
            className="border border-ink/20 px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase"
          >
            SEO
          </Link>
          <Link
            href="/admin/products/new"
            className="bg-ink px-5 py-2.5 text-[11px] tracking-[0.16em] uppercase text-ivory"
          >
            + Add listing
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["GMV", inr(gmv), "Paid + COD booked"],
          ["Orders", String(live.length), "excl. cancelled"],
          ["Units", String(units), "sticks & kits out"],
          ["AOV", inr(aov), "average ticket"],
        ].map(([k, v, s]) => (
          <article key={k} className="border border-ink/10 bg-ivory p-5">
            <p className="text-[10px] tracking-[0.18em] uppercase text-mist">
              {k}
            </p>
            <p className="font-display mt-2 text-3xl">{v}</p>
            <p className="mt-1 text-xs text-mist">{s}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {pipeline.map((s) => (
          <Link
            key={s}
            href="/admin/orders"
            className="border border-ink/10 px-4 py-3 hover:border-saffron"
          >
            <p className="text-[10px] tracking-[0.16em] uppercase text-mist">
              {statusLabel[s]}
            </p>
            <p className="font-display text-2xl">{counts[s]}</p>
          </Link>
        ))}
      </div>

      <Link
        href="/admin/customers"
        className="mt-6 flex items-center justify-between border border-ink/10 bg-ivory px-5 py-4 hover:border-saffron"
      >
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-mist">Customers</p>
          <p className="font-display mt-1 text-2xl">
            {users.length === 0 ? "No accounts yet" : `${users.length} signed up`}
          </p>
          <p className="mt-1 text-xs text-mist">Storefront login · order history attached</p>
        </div>
        <span className="text-[11px] tracking-[0.14em] uppercase text-ember">Open →</span>
      </Link>

      <Link
        href="/admin/seo"
        className="mt-6 flex items-center justify-between border border-ink/10 bg-ivory px-5 py-4 hover:border-saffron"
      >
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-mist">SEO health</p>
          <p className="font-display mt-1 text-2xl">
            {seoMissing.length === 0
              ? "Titles auto-generated"
              : `${seoMissing.length} listings without custom meta`}
          </p>
          <p className="mt-1 text-xs text-mist">
            Sitemap + robots live. Admin is noindex. Edit homepage title in SEO.
          </p>
        </div>
        <span className="text-[11px] tracking-[0.14em] uppercase text-ember">Open →</span>
      </Link>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Latest orders</h2>
            <Link
              href="/admin/orders"
              className="text-[11px] tracking-[0.14em] uppercase text-ember"
            >
              All →
            </Link>
          </div>
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-[10px] tracking-[0.16em] uppercase text-mist">
              <tr className="border-b border-ink/10">
                <th className="py-2 font-medium">Order</th>
                <th className="font-medium">Customer</th>
                <th className="font-medium">Status</th>
                <th className="text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map((o) => (
                <tr key={o.id} className="border-b border-ink/5">
                  <td className="py-3">
                    <Link href={`/admin/orders/${o.id}`} className="hover:text-ember">
                      {o.id}
                    </Link>
                  </td>
                  <td>{o.customer.name}</td>
                  <td className="uppercase tracking-wide text-[11px] text-mist">
                    {o.status}
                  </td>
                  <td className="text-right">{inr(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="space-y-8">
          <section>
            <h2 className="font-display text-2xl">Low stock</h2>
            <ul className="mt-4 space-y-3">
              {low.length === 0 && (
                <li className="text-sm text-mist">Lots are healthy.</li>
              )}
              {low.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/admin/products/${p.slug}`}
                    className="flex justify-between border border-ink/10 px-3 py-2 text-sm hover:border-saffron"
                  >
                    <span>{p.name}</span>
                    <span className="text-ember">{p.stock} left</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl">What moved</h2>
            <ol className="mt-4 space-y-2 text-sm">
              {top.map(([name, qty], i) => (
                <li key={name} className="flex justify-between">
                  <span>
                    {i + 1}. {name}
                  </span>
                  <span className="text-mist">{qty} u</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </main>
  );
}
