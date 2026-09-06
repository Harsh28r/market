import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { ProductArt } from "@/components/product-art";
import { inr, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round((1 - product.price / Math.max(product.mrp, product.price)) * 100);
  const low = product.stock > 0 && product.stock < 12;
  const out = product.stock <= 0;
  return (
    <article className="group flex flex-col bg-paper border border-ink/10 rounded-sm p-3 hover:border-gold/50 transition duration-300 shadow-xs">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden rounded-sm">
        <ProductArt
          scent={product.scent}
          image={product.image}
          productName={product.name}
          hindiName={product.hindi}
          className="aspect-3/4 w-full rounded-sm"
        />
        {out && (
          <span className="absolute left-3 top-3 bg-ivory px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-ink shadow-md z-20">
            Sold out
          </span>
        )}
        {!out && product.badge && (
          <span className="absolute left-3 top-3 bg-saffron px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] uppercase text-ink shadow-md z-20">
            {product.badge}
          </span>
        )}
        {low && (
          <span className="absolute right-3 top-3 bg-ink/90 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-gold backdrop-blur-md z-20">
            Last {product.stock}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-3.5 px-1">
        <Link href={`/product/${product.slug}`}>
          <div className="flex items-center justify-between">
            <span className="font-deva text-xs font-semibold text-ember">{product.hindi}</span>
            <span className="text-[10px] tracking-widest text-mist uppercase font-medium">{product.sticks}</span>
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight mt-0.5 text-ink group-hover:text-ember transition">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-mist line-clamp-2 leading-relaxed">{product.tagline}</p>
        </Link>

        {/* Scent Notes Chips */}
        {product.notes && product.notes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.notes.slice(0, 3).map((note) => (
              <span key={note} className="rounded bg-ivory border border-ink/10 px-2 py-0.5 text-[10px] text-ink/70 font-medium">
                {note}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-2 pt-4 border-t border-ink/10">
          <div>
            <span className="text-lg font-bold text-ink">{inr(product.price)}</span>
            {product.mrp > product.price && (
              <span className="ml-2 text-xs text-mist line-through">{inr(product.mrp)}</span>
            )}
            {off > 0 && (
              <span className="ml-1.5 text-[10px] font-bold text-ember">{off}% off</span>
            )}
          </div>
          <AddToCart
            slug={product.slug}
            disabled={out}
            label={out ? "Gone" : "+ Add"}
            className="bg-ink px-4 py-2 text-[11px] font-bold tracking-[0.16em] uppercase text-ivory hover:bg-saffron hover:text-ink transition rounded-sm disabled:cursor-not-allowed disabled:opacity-40"
          />
        </div>
      </div>
    </article>
  );
}
