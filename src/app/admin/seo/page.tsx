"use client";

import { useEffect, useState } from "react";
import type { SiteSeo } from "@/lib/seo";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SiteSeo | null>(null);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    void fetch("/api/admin/seo")
      .then((r) => r.json())
      .then((d: { seo?: SiteSeo }) => {
        if (d.seo) setSeo(d.seo);
      });
  }, []);

  async function save() {
    if (!seo) return;
    setBusy(true);
    setErr("");
    setSaved("");
    const res = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seo),
    });
    setBusy(false);
    if (!res.ok) {
      setErr("Couldn’t save SEO.");
      return;
    }
    setSaved("Live on sitemap + meta.");
  }

  if (!seo) {
    return (
      <main className="px-8 py-10">
        <p className="text-sm text-mist">Loading SEO…</p>
      </main>
    );
  }

  const host = seo.siteUrl.replace(/^https?:\/\//, "");

  return (
    <main className="px-8 py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-ember">
        Rank the storefront
      </p>
      <h1 className="font-display mt-1 text-4xl">SEO</h1>
      <p className="mt-2 max-w-xl text-sm text-mist">
        Google indexes the shop, not this admin. Set title + description here. Per-SKU titles live on each listing.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <form
          className="space-y-5 border border-ink/10 bg-ivory p-6"
          onSubmit={(e) => {
            e.preventDefault();
            void save();
          }}
        >
          <label className="block text-xs text-mist">
            Canonical site URL
            <input
              className="field mt-1"
              value={seo.siteUrl}
              onChange={(e) => setSeo({ ...seo, siteUrl: e.target.value })}
              placeholder="https://arpandhupa.in"
            />
          </label>
          <label className="block text-xs text-mist">
            Homepage title ({seo.title.length}/60)
            <input
              className="field mt-1"
              value={seo.title}
              onChange={(e) => setSeo({ ...seo, title: e.target.value })}
            />
          </label>
          <label className="block text-xs text-mist">
            Meta description ({seo.description.length}/160)
            <textarea
              rows={4}
              className="field mt-1"
              value={seo.description}
              onChange={(e) => setSeo({ ...seo, description: e.target.value })}
            />
          </label>
          <label className="block text-xs text-mist">
            Keywords (comma)
            <textarea
              rows={3}
              className="field mt-1"
              value={seo.keywords}
              onChange={(e) => setSeo({ ...seo, keywords: e.target.value })}
            />
          </label>
          {err && <p className="text-sm text-ember">{err}</p>}
          {saved && <p className="text-sm text-ember">{saved}</p>}
          <button
            type="submit"
            disabled={busy}
            className="bg-ink px-8 py-3 text-[12px] tracking-[0.2em] uppercase text-ivory disabled:opacity-50"
          >
            {busy ? "Saving…" : "Save SEO"}
          </button>
        </form>

        <aside className="space-y-6">
          <div className="border border-ink/10 bg-paper p-4">
            <p className="text-[10px] tracking-[0.18em] uppercase text-mist">
              Google preview
            </p>
            <p className="mt-3 text-sm text-[#1a0dab]">{seo.title}</p>
            <p className="text-xs text-[#006621]">{host}</p>
            <p className="mt-1 text-sm text-[#4d5156]">{seo.description}</p>
          </div>
          <div className="border border-ink/10 p-4 text-sm">
            <p className="text-[10px] tracking-[0.18em] uppercase text-mist">
              Indexing
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a className="text-ember hover:underline" href="/sitemap.xml" target="_blank" rel="noreferrer">
                  /sitemap.xml
                </a>
              </li>
              <li>
                <a className="text-ember hover:underline" href="/robots.txt" target="_blank" rel="noreferrer">
                  /robots.txt
                </a>
              </li>
              <li className="text-mist">Admin / cart / checkout are noindex.</li>
            </ul>
            <p className="mt-4 text-xs text-mist">
              After go-live: Search Console → add property {host} → submit sitemap.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
