import Link from "next/link";
import { ListingForm } from "@/components/admin/listing-form";

export default function NewListingPage() {
  return (
    <main className="px-8 py-10">
      <p className="text-[11px] tracking-[0.24em] uppercase text-ember">
        Catalog
      </p>
      <h1 className="font-display mt-1 text-4xl">Add listing</h1>
      <p className="mt-2 max-w-xl text-sm text-mist">
        Same card the customer sees. Fill the ritual, not a 40-field Amazon
        dump — only what prints on the thali.
      </p>
      <p className="mt-2 text-sm">
        <Link href="/admin/products" className="text-ember">
          ← Inventory
        </Link>
      </p>
      <div className="mt-8">
        <ListingForm />
      </div>
    </main>
  );
}
