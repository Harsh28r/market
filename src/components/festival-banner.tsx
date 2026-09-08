import Link from "next/link";

export function FestivalBanner() {
  return (
    <section className="relative overflow-hidden bg-wine text-ivory">
      <div className="pointer-events-none absolute -right-10 top-0 font-deva text-[9rem] leading-none text-gold/10">
        उत्सव
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
        <div>
          <p className="kicker text-gold">Festival collection</p>
          <h2 className="font-display mt-2 text-3xl md:text-5xl">
            Ganesh utsav kit + daily aarti packs
          </h2>
          <p className="mt-3 max-w-lg text-sm text-ivory/70">
            One box for the 10-day house, not six kirana runs. Free shipping over ₹499.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/product/ganesh-utsav-kit" className="btn-gold !px-6 !py-3">
            Shop festive kit
          </Link>
          <Link href="/shop?fam=kit" className="btn-ghost !px-6 !py-3">
            All combos
          </Link>
        </div>
      </div>
    </section>
  );
}
