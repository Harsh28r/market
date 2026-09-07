import type { Metadata } from "next";
import Link from "next/link";
import { FREE_SHIP_AT, SHIP_FEE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description: `ARPAN ships across India. Free shipping on orders over ₹${FREE_SHIP_AT}. Nashik dispatch in 24 hours.`,
};

export default function ShippingPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14">
      <p className="text-[11px] tracking-[0.28em] uppercase text-ember">Policies</p>
      <h1 className="font-display mt-2 text-5xl">Shipping & delivery</h1>
      <div className="mt-8 space-y-4 text-mist leading-relaxed">
        <p>
          Orders pack from Nashik within 24 hours (except Sundays / public holidays). Courier partners cover most pincodes in 2–7 working days.
        </p>
        <p>
          <strong className="text-ink">Free shipping</strong> on prepaid + COD orders over ₹{FREE_SHIP_AT}. Below that, a flat ₹{SHIP_FEE} ship fee. Brass incense holder is included when the cart clears ₹{FREE_SHIP_AT}.
        </p>
        <p>Track via WhatsApp ping when the lot leaves. Wrong address = re-ship at your cost.</p>
      </div>
      <Link href="/shop" className="mt-10 inline-block text-ember underline">
        Back to shop
      </Link>
    </main>
  );
}
