import Link from "next/link";

export function ArpanLogo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };

  const textSizes = {
    sm: "text-lg tracking-[0.24em]",
    md: "text-2xl tracking-[0.28em]",
    lg: "text-3xl tracking-[0.32em]",
  };

  const subtitleSizes = {
    sm: "text-[8px] tracking-[0.28em]",
    md: "text-[9.5px] tracking-[0.34em]",
    lg: "text-[11px] tracking-[0.38em]",
  };

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group ${className}`}>
      {/* Luxury Golden Emblem - Sacred Flame & Incense Lotus Motif */}
      <div
        className={`relative flex ${iconSizes[size]} items-center justify-center rounded-full border border-gold/70 bg-linear-to-b from-gold/25 via-ink to-ink p-1.5 shadow-md group-hover:border-gold group-hover:scale-105 transition duration-300`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full text-gold stroke-gold"
          strokeWidth="1.4"
        >
          {/* Sacred Flame outer petal */}
          <path
            d="M12 2.5C12 2.5 6.5 8.5 6.5 13.5C6.5 16.5386 8.96142 19 12 19C15.0386 19 17.5 16.5386 17.5 13.5C17.5 8.5 12 2.5 12 2.5Z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          {/* Inner Flame Lotus core */}
          <path
            d="M12 6.5C12 6.5 9.2 10.5 9.2 13.8C9.2 15.3464 10.4536 16.6 12 16.6C13.5464 16.6 14.8 15.3464 14.8 13.8C14.8 10.5 12 6.5 12 6.5Z"
            fill="currentColor"
            fillOpacity="0.28"
          />
          {/* Golden Diamond Core Star */}
          <path
            d="M12 11.5L12.7 13.2L14.4 13.9L12.7 14.6L12 16.3L11.3 14.6L9.6 13.9L11.3 13.2L12 11.5Z"
            fill="currentColor"
          />
          {/* Base Pedestal line */}
          <line x1="5.5" y1="21.5" x2="18.5" y2="21.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      <div className="flex flex-col justify-center">
        <span
          className={`font-display ${textSizes[size]} font-black leading-none text-ivory group-hover:text-gold transition duration-300 drop-shadow-xs`}
        >
          ARPAN
        </span>
        <span
          className={`font-sans ${subtitleSizes[size]} uppercase text-gold/85 font-medium mt-1 leading-none`}
        >
          Sacred Dhupa
        </span>
      </div>
    </Link>
  );
}
