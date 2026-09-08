import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { ProductArt } from "@/components/product-art";
import { Stars } from "@/components/stars";
import { TiltCard } from "@/components/tilt-card";
import { inr, productRating, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round((1 - product.price / Math.max(product.mrp, product.price)) * 100);
  const low = product.stock > 0 && product.stock < 12;
  const out = product.stock <= 0;
  return (
    <TiltCard>
      <article className="lift-card flex h-full flex-col border border-gold/20 bg-paper/90 p-3 shadow-[0_18px_40px_-28px_rgba(18,7,10,0.55)]">
        <Link href={`/product/${product.slug}`} className="shine-sweep relative block overflow-hidden">
          <ProductArt
            slug={product.slug}
            scent={product.scent}
            image={product.image}
            productName={product.name}
            hindiName={product.hindi}
            className="aspect-3/4 w-full"
          />
          {out && (
            <span className="absolute left-3 top-3 z-20 bg-ivory px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-ink shadow-md">
              Sold out
            </span>
          )}
          {!out && product.badge && (
            <span className="absolute left-3 top-3 z-20 bg-saffron px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-ink shadow-md">
              {product.badge}
            </span>
          )}
          {low && (
            <span className="absolute right-3 top-3 z-20 bg-ink/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-gold backdrop-blur-md">
              Last {product.stock}
            </span>
          )}
          <span className="absolute bottom-3 left-3 z-20 bg-ink/85 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] uppercase text-gold backdrop-blur-md">
            {product.burn} burn
          </span>
        </Link>

        <div className="flex flex-1 flex-col px-1 pt-3.5">
          <Link href={`/product/${product.slug}`}>
            <div className="flex items-center justify-between">
              <span className="font-deva text-xs font-semibold text-ember">{product.hindi}</span>
              <span className="text-[10px] tracking-widest text-mist uppercase font-medium">{product.sticks}</span>
            </div>
            <h3 className="font-display mt-0.5 text-2xl font-bold leading-tight text-ink transition group-hover/tilt:text-ember">
              {product.name}
            </h3>
            <div className="mt-1">
              <Stars {...productRating(product.slug)} />
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mist">{product.tagline}</p>
          </Link>

          {product.notes && product.notes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.notes.slice(0, 3).map((note) => (
                <span key={note} className="rounded-full border border-gold/25 bg-ivory px-2 py-0.5 text-[10px] font-medium text-ink/70">
                  {note}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-gold/20 pt-4">
            <div className="min-w-0">
              <span className="text-lg font-bold text-ink">{inr(product.price)}</span>
              {product.mrp > product.price && (
                <span className="ml-2 text-xs text-mist line-through">{inr(product.mrp)}</span>
              )}
              {off > 0 && (
                <span className="ml-1.5 text-[10px] font-bold text-ember">{off}% off</span>
              )}
              <p className="text-[10px] text-mist">Incl. of tax</p>
            </div>
            <AddToCart
              slug={product.slug}
              disabled={out}
              label={out ? "Gone" : "ADD"}
              className="shrink-0 rounded-sm bg-ink px-4 py-2.5 text-[11px] font-bold tracking-[0.16em] uppercase text-ivory transition hover:bg-saffron hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            />
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
