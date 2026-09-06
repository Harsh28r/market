import { ArpanLogo } from "@/components/brand-logo";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-ivory/80">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <ArpanLogo size="lg" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
            Pure organic temple agarbatti & sacred aromas. 100% charcoal-free masala paste, hand-rolled with organic flowers, halmaddi resin, and pure essential oils in Nashik & Kannauj.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-bold">
            Explore Sacred Blends
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-gold transition">
                Full Catalog
              </Link>
            </li>
            <li>
              <Link href="/rituals" className="hover:text-gold transition">
                Shop by Ritual (पूजा)
              </Link>
            </li>
            <li>
              <Link href="/product/ganesh-utsav-kit" className="hover:text-gold transition">
                Ganesh Kit
              </Link>
            </li>
            <li>
              <Link href="/product/nitya-box" className="hover:text-gold transition">
                Nitya Monthly Box
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-bold">
            ARPAN Concierge
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>WhatsApp Order: +91 98765 43210</li>
            <li>Cash on Delivery across India</li>
            <li>Same-Day Dispatch (Nashik Lot)</li>
            <li>hello@arpan.shop</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/20 px-5 py-4 text-center text-[11px] tracking-wide text-ivory/50">
        © {new Date().getFullYear()} ARPAN Incense & Sacred Aromas · 100% Organic & Charcoal-Free.{" "}
        <Link href="/admin" className="text-ivory/30 hover:text-gold ml-2">
          Seller Portal
        </Link>
      </div>
    </footer>
  );
}
