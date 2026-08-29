import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingForm } from "@/components/admin/listing-form";
import { findProduct } from "@/lib/store";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function EditListingPage({ params }: Props) {
  const { slug } = await params;
  const product = await findProduct(slug);
  if (!product) notFound();

  return (
    <main className="px-8 py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-ember">
        Catalog
      </p>
      <h1 className="font-display mt-1 text-4xl">Edit {product.name}</h1>
      <p className="mt-2 text-sm">
        <Link href="/admin/products" className="text-ember">
          ← Inventory
        </Link>
        {" · "}
        <Link href={`/product/${product.slug}`} className="text-ember">
          View on shop
        </Link>
      </p>
      <div className="mt-8">
        <ListingForm initial={product} />
      </div>
    </main>
  );
}
