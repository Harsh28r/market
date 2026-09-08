import Image from "next/image";
import { productImage } from "@/lib/products";

export function ProductArt({
  slug,
  image,
  productName,
  hindiName,
  className = "",
  compact = false,
}: {
  slug?: string;
  scent?: string;
  image?: string;
  productName?: string;
  hindiName?: string;
  className?: string;
  compact?: boolean;
}) {
  const src = productImage(slug, image);
  const alt = `ARPAN ${productName || "Incense Agarbatti"}`;

  return (
    <div
      className={`relative overflow-hidden bg-ink group ${
        compact ? "border border-gold/30 shadow-xs" : "gold-frame"
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={compact ? "160px" : "(min-width: 768px) 33vw, 50vw"}
        className="object-cover object-center transition duration-700 group-hover:scale-[1.07]"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/45 via-transparent to-transparent opacity-80" />
      {!compact && hindiName && <span className="sr-only">{hindiName}</span>}
    </div>
  );
}
