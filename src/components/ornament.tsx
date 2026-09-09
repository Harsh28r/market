export function LotusRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden>
      <span className="h-px w-full bg-linear-to-r from-gold/70 via-gold/20 to-transparent" />
    </div>
  );
}

export function DiyaMark({ className = "h-8 w-8 text-gold" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path
        d="M16 4c0 0-5 6.2-5 10.4A5 5 0 0 0 16 19.5 5 5 0 0 0 21 14.4C21 10.2 16 4 16 4Z"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <path
        d="M16 7.5c0 0-2.6 3.4-2.6 5.6A2.6 2.6 0 0 0 16 15.7a2.6 2.6 0 0 0 2.6-2.6C18.6 10.9 16 7.5 16 7.5Z"
        fill="currentColor"
      />
      <path
        d="M6 22.5c2.4-2.8 6-4.4 10-4.4s7.6 1.6 10 4.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path d="M5 25.5h22" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}
