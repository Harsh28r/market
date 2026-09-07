import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & replacements",
  description: "Broken, short sticks, or wrong fragrance — ARPAN replaces the lot. WhatsApp a photo within 48 hours of delivery.",
};

export default function ReturnsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[11px] tracking-[0.28em] uppercase text-ember">Policies</p>
      <h1 className="font-display mt-2 text-5xl">Returns</h1>
      <div className="mt-8 space-y-4 text-mist leading-relaxed">
        <p>
          Fragrance is personal and incense is opened at aarti — so we don’t take “changed my mind” returns on used packs.
        </p>
        <p>
          <strong className="text-ink">We do replace</strong> crushed boxes, short count, or a wrong SKU. WhatsApp a photo + order id within 48 hours of delivery. Replacement ships on the next Nashik lot.
        </p>
        <p>COD refunds go back as UPI. No restocking fee on our mistake.</p>
      </div>
      <Link href="/shop" className="mt-10 inline-block text-ember underline">
        Back to shop
      </Link>
    </main>
  );
}
