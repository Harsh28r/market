import Link from "next/link";

export default function DonePage() {
  return (
    <main className="mx-auto max-w-lg px-5 py-24 text-center">
      <p className="font-deva text-ember">अर्पण पूर्ण</p>
      <h1 className="font-display mt-2 text-5xl">Offered. Packed tonight.</h1>
      <p className="mt-4 text-mist">
        Order is in the Nashik tray. You’ll get a WhatsApp ping when it packs.
        Track it from Seller if you’re us.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-block bg-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory"
      >
        Burn something else
      </Link>
    </main>
  );
}
