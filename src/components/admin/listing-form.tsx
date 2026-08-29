"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { ProductArt } from "@/components/product-art";
import {
  families,
  inr,
  scentKeys,
  slugify,
  type Family,
  type Product,
  type ScentKey,
} from "@/lib/products";

const empty: Product = {
  slug: "",
  name: "",
  hindi: "",
  tagline: "",
  price: 199,
  mrp: 249,
  scent: "nagchampa",
  family: "sacred",
  sticks: "30 sticks",
  burn: "40 min",
  bestFor: ["Daily aarti"],
  notes: ["Temple blend"],
  story: "",
  badge: "",
  sku: "",
  stock: 80,
  active: true,
};

function csv(list: string[]) {
  return list.join(", ");
}

function fromCsv(s: string) {
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function ListingForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const editing = Boolean(initial);
  const [form, setForm] = useState<Product>(initial ?? empty);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const preview: Product = useMemo(
    () => ({
      ...form,
      slug: form.slug || slugify(form.name) || "new-listing",
    }),
    [form],
  );

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setBusy(true);
    setErr("");
    const payload: Product = {
      ...form,
      slug: form.slug || slugify(form.name),
      sku: form.sku || `ARP-${slugify(form.name).slice(0, 8).toUpperCase()}`,
      badge: form.badge || undefined,
    };
    const url = editing
      ? `/api/products/${initial!.slug}`
      : "/api/products";
    const res = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setErr("Couldn’t save listing.");
      setBusy(false);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <section className="border border-ink/10 bg-ivory p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-ember">
            Identity
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <input
                required
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className="field"
                placeholder="Nag Champa Aarti"
              />
            </Field>
            <Field label="Hindi">
              <input
                value={form.hindi}
                onChange={(e) => set("hindi", e.target.value)}
                className="field font-deva"
                placeholder="नाग चंपा"
              />
            </Field>
            <Field label="SKU">
              <input
                value={form.sku}
                onChange={(e) => set("sku", e.target.value)}
                className="field"
                placeholder="ARP-1001"
              />
            </Field>
            <Field label="Slug">
              <input
                value={form.slug}
                onChange={(e) => set("slug", slugify(e.target.value))}
                className="field"
                placeholder="auto from title"
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="One-line hook">
                <input
                  value={form.tagline}
                  onChange={(e) => set("tagline", e.target.value)}
                  className="field"
                  placeholder="The stick every Indian home already knows."
                />
              </Field>
            </div>
          </div>
        </section>

        <section className="border border-ink/10 bg-ivory p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-ember">
            Offer
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Field label="Price ₹">
              <input
                type="number"
                min={1}
                required
                value={form.price}
                onChange={(e) => set("price", Number(e.target.value))}
                className="field"
              />
            </Field>
            <Field label="MRP ₹">
              <input
                type="number"
                min={1}
                value={form.mrp}
                onChange={(e) => set("mrp", Number(e.target.value))}
                className="field"
              />
            </Field>
            <Field label="Stock">
              <input
                type="number"
                min={0}
                value={form.stock}
                onChange={(e) => set("stock", Number(e.target.value))}
                className="field"
              />
            </Field>
            <Field label="Pack">
              <input
                value={form.sticks}
                onChange={(e) => set("sticks", e.target.value)}
                className="field"
              />
            </Field>
            <Field label="Burn">
              <input
                value={form.burn}
                onChange={(e) => set("burn", e.target.value)}
                className="field"
              />
            </Field>
            <Field label="Badge">
              <input
                value={form.badge ?? ""}
                onChange={(e) => set("badge", e.target.value)}
                className="field"
                placeholder="New · Festival"
              />
            </Field>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => set("active", e.target.checked)}
            />
            Live on storefront
          </label>
        </section>

        <section className="border border-ink/10 bg-ivory p-6">
          <p className="text-[10px] tracking-[0.2em] uppercase text-ember">
            Scent studio
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Family">
              <select
                value={form.family}
                onChange={(e) => set("family", e.target.value as Family)}
                className="field"
              >
                {families
                  .filter((f) => f.id !== "all")
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
              </select>
            </Field>
            <Field label="Smoke look">
              <select
                value={form.scent}
                onChange={(e) => set("scent", e.target.value as ScentKey)}
                className="field"
              >
                {scentKeys.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Best for (comma)">
              <input
                value={csv(form.bestFor)}
                onChange={(e) => set("bestFor", fromCsv(e.target.value))}
                className="field"
              />
            </Field>
            <Field label="Notes (comma)">
              <input
                value={csv(form.notes)}
                onChange={(e) => set("notes", fromCsv(e.target.value))}
                className="field"
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Story">
                <textarea
                  rows={5}
                  value={form.story}
                  onChange={(e) => set("story", e.target.value)}
                  className="field"
                  placeholder="Why this stick belongs on the thali."
                />
              </Field>
            </div>
          </div>
        </section>

        {err && <p className="text-sm text-ember">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="bg-ink px-8 py-3 text-[12px] tracking-[0.2em] uppercase text-ivory disabled:opacity-50"
        >
          {busy ? "Saving…" : editing ? "Update listing" : "Publish listing"}
        </button>
      </form>

      <aside className="h-fit lg:sticky lg:top-8">
        <p className="text-[10px] tracking-[0.2em] uppercase text-ember">
          Customer sees this
        </p>
        <div className="mt-3 border border-ink/10 bg-paper p-3">
          <ProductArt scent={preview.scent} className="aspect-3/4 w-full" />
          {preview.badge && (
            <p className="mt-3 text-[10px] tracking-[0.16em] uppercase text-ember">
              {preview.badge}
            </p>
          )}
          <h3 className="font-display mt-1 text-2xl">
            {preview.name || "Untitled"}
          </h3>
          <p className="text-sm text-mist">{preview.tagline || "Hook line"}</p>
          <p className="mt-2">
            {inr(preview.price)}{" "}
            {preview.mrp > preview.price && (
              <span className="text-mist line-through">{inr(preview.mrp)}</span>
            )}
          </p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-xs text-mist">
      {label}
      <div className="mt-1">{children}</div>
    </label>
  );
}
