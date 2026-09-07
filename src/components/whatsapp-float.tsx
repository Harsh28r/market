import { whatsappHref } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref(
        "Namaste — I want to order Arpan agarbatti. Please share today’s packs.",
      )}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed right-4 z-50 flex items-center gap-2 bg-[#25D366] text-[11px] font-semibold tracking-[0.12em] uppercase text-white shadow-lg transition hover:brightness-110 md:right-5 md:text-[12px] bottom-[max(1rem,env(safe-area-inset-bottom))] rounded-full px-3.5 py-3 md:rounded-none md:px-4"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.89 14.2c-.25.7-1.45 1.29-2.01 1.37-.52.08-1.18.11-1.91-.12-.44-.14-.99-.32-1.7-.63-3-1.3-4.96-4.33-5.11-4.53-.15-.2-1.24-1.65-1.24-3.15s.78-2.23 1.06-2.54c.25-.28.66-.41 1.06-.41.13 0 .24 0 .35.01.31.01.46.03.67.52.25.58.85 2.07.92 2.22.08.15.13.33.02.53-.1.2-.16.33-.31.5-.15.18-.32.4-.45.53-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.03 1.12 1 2.07 1.31 2.36 1.46.3.15.46.13.64-.08.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.71.81 2.01.95.3.15.5.22.57.34.08.13.08.75-.17 1.46z" />
      </svg>
      <span className="hidden sm:inline">Order on WhatsApp</span>
      <span className="sm:hidden">Chat</span>
    </a>
  );
}
