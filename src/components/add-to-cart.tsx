"use client";

import { useState } from "react";
import { useCart } from "@/context/cart";

export function AddToCart({
  slug,
  label = "Add to aarti tray",
  className = "",
  disabled = false,
}: {
  slug: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={() => {
        add(slug);
        setDone(true);
        window.setTimeout(() => setDone(false), 1400);
      }}
    >
      {done ? "In the tray ✓" : label}
    </button>
  );
}
