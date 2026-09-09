import Image from "next/image";
import Link from "next/link";
import { LotusRule } from "@/components/ornament";

const cats = [
  {
    href: "/shop?fam=sacred",
    title: "Agarbatti",
    hindi: "अगरबत्ती",
    sub: "Temple masala sticks",
    img: "/products/nag-champa-aarti.jpg",
  },
  {
    href: "/shop?fam=resin",
    title: "Dhoop & Resin",
    hindi: "धूप",
    sub: "Cleansing smoke",
    img: "/products/loban-resin.jpg",
  },
  {
    href: "/shop?fam=kit",
    title: "Gift Hampers",
    hindi: "संयोग",
    sub: "Kits & monthly box",
    img: "/products/ganesh-utsav-kit.jpg",
  },
  {
    href: "/rituals",
    title: "Shop by Pooja",
    hindi: "पूजा",
    sub: "Ganesh, Lakshmi, Shiva",
    img: "/products/kapur-jyoti.jpg",
  },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <p className="kicker text-ember">Shop by category</p>
      <h2 className="font-display mt-2 text-3xl md:text-5xl">Start with the ritual</h2>
      <LotusRule className="mt-5 max-w-40" />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cats.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative min-h-[240px] overflow-hidden border border-ink/10 sm:min-h-[300px]"
          >
            <Image
              src={c.img}
              alt={c.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
              <p className="font-deva text-sm text-gold">{c.hindi}</p>
              <p className="font-display text-3xl leading-none">{c.title}</p>
              <p className="mt-1 text-xs tracking-wide text-ivory/70">{c.sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
