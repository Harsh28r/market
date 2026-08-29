import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-ivory/80">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-deva text-gold">अर्पण</p>
          <p className="font-display mt-1 text-3xl tracking-[0.18em]">ARPAN</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
            Handmade agarbatti from a small lot in Nashik. Charcoal-light paste,
            temple-grade oils, packed for the Indian household that still lights
            a stick before tea.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">
            Visit
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/shop" className="hover:text-gold">
                Shop all
              </Link>
            </li>
            <li>
              <Link href="/rituals" className="hover:text-gold">
                Shop by pooja
              </Link>
            </li>
            <li>
              <Link href="/product/ganesh-utsav-kit" className="hover:text-gold">
                Ganesh kit
              </Link>
            </li>
            <li>
              <Link href="/product/nitya-box" className="hover:text-gold">
                Monthly box
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold">
            Talk
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>WhatsApp · +91 98765 43210</li>
            <li>COD across India</li>
            <li>Dispatch 24 hrs · Nashik</li>
            <li>hello@arpan.shop</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10 px-5 py-4 text-center text-[11px] tracking-wide text-ivory/40">
        © {new Date().getFullYear()} Arpan Dhupa · Offer it, then keep the
        house still.{" "}
        <Link href="/admin" className="text-ivory/25 hover:text-gold">
          Seller
        </Link>
      </div>
    </footer>
  );
}
