"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "@/context/auth";

function DoneInner() {
  const params = useSearchParams();
  const id = params.get("id");
  const { user } = useAuth();

  return (
    <main className="mx-auto max-w-lg px-5 py-24 text-center">
      <p className="font-deva text-ember">अर्पण पूर्ण</p>
      <h1 className="font-display mt-2 text-5xl">Offered. Packed tonight.</h1>
      {id && (
        <p className="mt-3 font-medium tracking-wide">{id}</p>
      )}
      <p className="mt-4 text-mist">
        Order is in the Nashik tray. You’ll get a WhatsApp ping when it packs.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {user ? (
          <Link
            href="/account"
            className="inline-block border border-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase"
          >
            Track orders
          </Link>
        ) : (
          <Link
            href="/signup"
            className="inline-block border border-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase"
          >
            Create an account for next time
          </Link>
        )}
        <Link
          href="/shop"
          className="inline-block bg-ink px-6 py-3 text-[12px] tracking-[0.18em] uppercase text-ivory"
        >
          Burn something else
        </Link>
      </div>
    </main>
  );
}

export default function DonePage() {
  return (
    <Suspense>
      <DoneInner />
    </Suspense>
  );
}
