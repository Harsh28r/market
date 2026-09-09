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
      <article className="lift-card flex h-full flex-col border border-ink/10 bg-ivory">
        <Link href={`/product/${product.slug}`} className="relative block overflow-hidden">
          <ProductArt
            slug={product.slug}
            scent={product.scent}
            image={product.image}
            productName={product.name}
            hindiName={product.hindi}
            className="aspect-3/4 w-full"
          />
          {out && (
            <span className="absolute left-3 top-3 z-20 bg-ink px-2 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-ivory">
              Sold out
            </span>
          )}
          {!out && product.badge && (
            <span className="absolute left-3 top-3 z-20 bg-ink px-2 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-gold">
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

        <div className="flex flex-1 flex-col px-4 pb-4 pt-4">
          <Link href={`/product/${product.slug}`}>
            <div className="flex items-center justify-between">
              <span className="font-deva text-xs font-semibold text-ember">{product.hindi}</span>
              <span className="text-[10px] tracking-widest text-mist uppercase font-medium">{product.sticks}</span>
            </div>
            <h3 className="font-display mt-0.5 text-2xl font-bold leading-tight text-ink transition group-hover/tilt:text-ember">
              {product.family === "kit" ? product.name : `${product.name} Agarbatti`}
            </h3>
            <div className="mt-1">
              <Stars {...productRating(product.slug)} />
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-mist">{product.tagline}</p>
          </Link>

          {product.notes && product.notes.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {product.notes.slice(0, 3).map((note) => (
                <span key={note} className="border border-ink/12 px-2 py-0.5 text-[10px] tracking-[0.08em] uppercase text-mist">
                  {note}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto flex flex-col gap-3 border-t border-gold/20 pt-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div className="min-w-0">
              <span className="text-lg font-bold text-ink">{inr(product.price)}</span>
              {product.mrp > product.price && (
                <span className="ml-2 text-xs text-mist line-through">{inr(product.mrp)}</span>
              )}
              {off > 0 && (
                <span className="ml-1.5 text-[10px] font-bold text-ember">{off}% off</span>
              )}
              <p className="text-[10px] text-mist">Incl. of tax · COD</p>
            </div>
            <AddToCart
              slug={product.slug}
              disabled={out}
              label={out ? "Gone" : "Add to tray"}
              className="w-full bg-ink px-4 py-3 text-[11px] font-bold tracking-[0.16em] uppercase text-ivory transition hover:bg-wine disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:py-2.5"
            />
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
