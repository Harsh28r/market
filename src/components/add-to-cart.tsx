"use client";

import { useState } from "react";
import { useCart } from "@/context/cart";

export function AddToCart({
  slug,
  label = "Add to aarti tray",
  className = "",
  disabled = false,
  picker = false,
}: {
  slug: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  picker?: boolean;
}) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  const [qty, setQty] = useState(1);

  function commit() {
    add(slug, picker ? qty : 1);
    setDone(true);
    window.setTimeout(() => setDone(false), 1400);
  }

  return (
    <div className={picker ? "flex flex-wrap items-center gap-3" : "contents"}>
      {picker && (
        <div className="flex items-center border border-ink/20">
          <button
            type="button"
            className="h-12 w-10 text-lg"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Less"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{qty}</span>
          <button
            type="button"
            className="h-12 w-10 text-lg"
            onClick={() => setQty((q) => q + 1)}
            aria-label="More"
          >
            +
          </button>
        </div>
      )}
      <button
        type="button"
        disabled={disabled}
        className={className}
        onClick={commit}
      >
        {done ? "In the tray ✓" : label}
      </button>
    </div>
  );
}
