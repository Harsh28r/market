import Link from "next/link";
import { AddToCart } from "@/components/add-to-cart";
import { ProductArt } from "@/components/product-art";
import { inr, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const off = Math.round((1 - product.price / Math.max(product.mrp, product.price)) * 100);
  const low = product.stock > 0 && product.stock < 12;
  const out = product.stock <= 0;
  return (
    <article className="group flex flex-col">
      <Link href={`/product/${product.slug}`} className="relative block">
        <ProductArt
          scent={product.scent}
          className="aspect-3/4 w-full transition duration-500 group-hover:brightness-110"
        />
        {out && (
          <span className="absolute left-3 top-3 bg-ivory px-2 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-ink">
            Sold out
          </span>
        )}
        {!out && product.badge && (
          <span className="absolute left-3 top-3 bg-saffron px-2 py-1 text-[10px] font-semibold tracking-[0.14em] uppercase text-ink">
            {product.badge}
          </span>
        )}
        {low && (
          <span className="absolute right-3 top-3 bg-ink/80 px-2 py-1 text-[10px] tracking-[0.12em] uppercase text-gold">
            Last {product.stock}
          </span>
        )}
        <span className="absolute bottom-3 right-3 text-[10px] tracking-[0.16em] uppercase text-ivory/70">
          {product.hindi}
        </span>
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-2xl leading-tight">{product.name}</h3>
          <p className="mt-1 text-sm text-mist">{product.tagline}</p>
        </Link>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="text-sm">
            <span className="text-lg font-medium">{inr(product.price)}</span>
            <span className="ml-2 text-mist line-through">{inr(product.mrp)}</span>
            <span className="ml-2 text-xs text-ember">{off}% off</span>
          </p>
          <AddToCart
            slug={product.slug}
            disabled={out}
            label={out ? "Gone" : "Add"}
            className="border border-ink/20 px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase transition hover:border-saffron hover:bg-saffron disabled:cursor-not-allowed disabled:opacity-40"
          />
        </div>
      </div>
    </article>
  );
}
