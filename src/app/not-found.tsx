import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-lg px-5 py-24 text-center">
      <h1 className="font-display text-5xl">This stick went out</h1>
      <p className="mt-3 text-mist">Page isn’t here. The shop still is.</p>
      <Link
        href="/shop"
        className="mt-8 inline-block bg-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory"
      >
        Back to the tray
      </Link>
    </main>
  );
}
