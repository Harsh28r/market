import Link from "next/link";
import { ArpanLogo } from "@/components/brand-logo";
import { EMAIL, INSTAGRAM, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-ivory/80">
      <div className="gold-rule" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4">
        <div>
          <ArpanLogo size="lg" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
            Hand-rolled charcoal-free agarbatti from Nashik. Temple smoke without the kirana chemical bite.
          </p>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-bold">
            Collections
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/shop?fam=sacred" className="hover:text-gold transition">
                Agarbatti
              </Link>
            </li>
            <li>
              <Link href="/shop?fam=resin" className="hover:text-gold transition">
                Dhoop &amp; Resin
              </Link>
            </li>
            <li>
              <Link href="/shop?fam=kit" className="hover:text-gold transition">
                Combos
              </Link>
            </li>
            <li>
              <Link href="/rituals" className="hover:text-gold transition">
                Shop by pooja
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-bold">
            Contact us
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ivory/80">
            <li>
              <a
                href={whatsappHref("Namaste — I want to order Arpan agarbatti.")}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition"
              >
                ✆ {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="break-all hover:text-gold transition">
                ✉ {EMAIL}
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition"
              >
                @{INSTAGRAM}
              </a>
            </li>
            <li>Nashik lot · COD across India</li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-gold font-bold">
            Policies
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/shipping" className="hover:text-gold transition">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-gold transition">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-gold transition">
                My account
              </Link>
            </li>
            <li>Free shipping over ₹499</li>
            <li>UPI + Cash on delivery</li>
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
