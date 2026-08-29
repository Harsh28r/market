export function WhatsAppFloat() {
  const text = encodeURIComponent(
    "Namaste — I want to order Arpan agarbatti. Please share today’s packs.",
  );
  return (
    <a
      href={`https://wa.me/919876543210?text=${text}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-[#25D366] px-4 py-3 text-[11px] font-semibold tracking-[0.12em] uppercase text-white transition hover:brightness-110 md:text-[12px]"
    >
      Order on WhatsApp
    </a>
  );
}
