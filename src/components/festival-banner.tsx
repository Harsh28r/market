import Link from "next/link";

export function FestivalBanner() {
  return (
    <section className="bg-wine text-ivory">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center">
        <div>
          <p className="text-[11px] tracking-[0.24em] uppercase text-gold font-bold">
            Festival collection
          </p>
          <h2 className="font-display mt-2 text-3xl md:text-4xl">
            Ganesh utsav kit + daily aarti packs
          </h2>
          <p className="mt-2 max-w-lg text-sm text-ivory/70">
            Combos Cycle-style: one box for the 10-day house, not 6 kirana runs. Free shipping over ₹499.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/product/ganesh-utsav-kit"
            className="bg-saffron px-6 py-3 text-[12px] font-bold tracking-[0.16em] uppercase text-ink"
          >
            Shop festive kit
          </Link>
          <Link
            href="/shop?fam=kit"
            className="border border-ivory/30 px-6 py-3 text-[12px] tracking-[0.16em] uppercase"
          >
            All combos
          </Link>
        </div>
      </div>
    </section>
  );
}
