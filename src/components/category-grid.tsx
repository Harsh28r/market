import Image from "next/image";
import Link from "next/link";

const cats = [
  {
    href: "/shop?fam=sacred",
    title: "Agarbatti",
    sub: "Temple masala sticks",
    img: "/products/nag-champa-aarti.jpg",
  },
  {
    href: "/shop?fam=resin",
    title: "Dhoop & Resin",
    sub: "Cleansing smoke",
    img: "/products/loban-resin.jpg",
  },
  {
    href: "/shop?fam=kit",
    title: "Gift Hampers",
    sub: "Kits & monthly box",
    img: "/products/ganesh-utsav-kit.jpg",
  },
  {
    href: "/rituals",
    title: "Shop by Pooja",
    sub: "Ganesh, Lakshmi, Shiva",
    img: "/products/kapur-jyoti.jpg",
  },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="text-[11px] tracking-[0.28em] uppercase text-ember font-bold">
        Shop by category
      </p>
      <h2 className="font-display mt-2 text-4xl md:text-5xl">Start with the ritual</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative min-h-[220px] overflow-hidden rounded-sm border border-ink/10"
          >
            <Image
              src={c.img}
              alt={c.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
              <p className="font-display text-2xl">{c.title}</p>
              <p className="mt-1 text-xs tracking-wide text-ivory/70">{c.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
