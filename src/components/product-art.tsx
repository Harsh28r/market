import Image from "next/image";

export function ProductArt({
  image,
  productName,
  hindiName,
  className = "",
  compact = false,
}: {
  scent?: string;
  image?: string;
  productName?: string;
  hindiName?: string;
  className?: string;
  compact?: boolean;
}) {
  const defaultImg = image || "/nag_champa_box.jpg";

  if (compact) {
    return (
      <div className={`relative overflow-hidden bg-ink border border-gold/30 rounded-xs shadow-xs group ${className}`}>
        <Image
          src={defaultImg}
          alt={`ARPAN ${productName || "Incense"}`}
          fill
          sizes="120px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-black/20 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-ink border border-gold/30 rounded-sm shadow-md group ${className}`}>
      <Image
        src={defaultImg}
        alt={`ARPAN ${productName || "Incense Agarbatti"}`}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className="object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-105"
      />
      
      {/* Dark Gradient Vignette Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-transparent to-black/40 pointer-events-none" />

      {/* Top Gold Brand Foil Stamp - ARPAN */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 rounded-xs border border-gold/60 bg-ink/85 px-2 py-0.5 backdrop-blur-md shadow-xs">
          <span className="font-deva text-[11px] font-bold text-gold">अर्पण</span>
          <span className="h-2 w-px bg-gold/40" />
          <span className="font-display text-[9px] font-extrabold tracking-[0.2em] text-ivory">ARPAN</span>
        </div>
        <span className="rounded bg-saffron/90 px-1.5 py-0.5 text-[8px] font-bold tracking-widest text-ink uppercase shadow-xs">
          0% Charcoal
        </span>
      </div>

      {/* Bottom Product Packaging Title Label Overlay */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 border border-gold/30 bg-ink/85 p-2 backdrop-blur-md rounded-xs">
        <div className="flex items-center justify-between">
          <span className="font-deva text-[10px] font-bold text-gold">{hindiName || "अर्पण धूप"}</span>
          <span className="text-[8px] tracking-widest text-ivory/60 uppercase">100% Organic</span>
        </div>
        <h4 className="font-display text-sm font-bold text-ivory mt-0.5 truncate">
          {productName || "ARPAN Agarbatti"}
        </h4>
      </div>
    </div>
  );
}

