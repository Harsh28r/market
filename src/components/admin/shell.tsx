"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/products", label: "Inventory" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/products/new", label: "Add listing" },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname();
  const router = useRouter();

  if (path === "/admin/login") {
    return <div className="min-h-screen bg-ink text-ivory">{children}</div>;
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <aside className="sticky top-0 flex h-screen w-56 shrink-0 flex-col bg-ink text-ivory">
        <Link href="/admin" className="border-b border-ivory/10 px-5 py-5">
          <p className="font-deva text-gold">अर्पण</p>
          <p className="font-display text-lg tracking-[0.18em]">SELLER</p>
          <p className="mt-1 text-[10px] tracking-[0.16em] uppercase text-ivory/40">
            Central
          </p>
        </Link>
        <nav className="flex flex-1 flex-col gap-1 p-3 text-[12px] tracking-[0.14em] uppercase">
          {nav.map((n) => {
            const on =
              n.href === "/admin"
                ? path === "/admin"
                : n.href === "/admin/products/new"
                  ? path === n.href
                  : n.href === "/admin/products"
                    ? path === "/admin/products" ||
                      (path.startsWith("/admin/products/") &&
                        path !== "/admin/products/new")
                    : n.href === "/admin/seo"
                      ? path.startsWith("/admin/seo")
                      : path === n.href || path.startsWith(`${n.href}/`);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3 py-2.5 ${
                  on ? "bg-saffron text-ink" : "text-ivory/70 hover:text-gold"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-ivory/10 p-4 text-[11px]">
          <Link href="/" className="block text-gold hover:underline">
            View storefront
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="mt-2 text-ivory/40 hover:text-ivory"
          >
            Sign out
          </button>
        </div>
      </aside>
      <div className="min-w-0 flex-1 pb-12">{children}</div>
    </div>
  );
}
