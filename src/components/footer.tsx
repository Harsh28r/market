import Link from "next/link";
import { ArpanLogo } from "@/components/brand-logo";
import { EMAIL, INSTAGRAM, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-ivory/80">
      <div className="pointer-events-none absolute -left-8 bottom-0 font-deva text-[10rem] leading-none text-gold/5">
        अर्पण
      </div>
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
                className="inline-flex items-center gap-2 hover:text-gold transition"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 0 0 12 7.2Zm0 7.92A3.12 3.12 0 1 1 12 8.88a3.12 3.12 0 0 1 0 6.24ZM17.52 6.96a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0ZM12 2.5c-2.58 0-2.9.01-3.91.06-1 .05-1.69.2-2.29.44a4.62 4.62 0 0 0-1.67 1.09 4.62 4.62 0 0 0-1.09 1.67c-.24.6-.39 1.29-.44 2.29C2.51 9.1 2.5 9.42 2.5 12s.01 2.9.06 3.91c.05 1 .2 1.69.44 2.29.24.63.56 1.16 1.09 1.67.51.53 1.04.85 1.67 1.09.6.24 1.29.39 2.29.44 1.01.05 1.33.06 3.91.06s2.9-.01 3.91-.06c1-.05 1.69-.2 2.29-.44a4.62 4.62 0 0 0 1.67-1.09 4.62 4.62 0 0 0 1.09-1.67c.24-.6.39-1.29.44-2.29.05-1.01.06-1.33.06-3.91s-.01-2.9-.06-3.91c-.05-1-.2-1.69-.44-2.29a4.62 4.62 0 0 0-1.09-1.67 4.62 4.62 0 0 0-1.67-1.09c-.6-.24-1.29-.39-2.29-.44C14.9 2.51 14.58 2.5 12 2.5Zm0 1.68c2.54 0 2.84.01 3.84.06.93.04 1.43.2 1.77.33.44.17.76.38 1.09.71.33.33.54.65.71 1.09.13.34.29.84.33 1.77.05 1 .06 1.3.06 3.84s-.01 2.84-.06 3.84c-.04.93-.2 1.43-.33 1.77-.17.44-.38.76-.71 1.09-.33.33-.65.54-1.09.71-.34.13-.84.29-1.77.33-1 .05-1.3.06-3.84.06s-2.84-.01-3.84-.06c-.93-.04-1.43-.2-1.77-.33a2.94 2.94 0 0 1-1.09-.71 2.94 2.94 0 0 1-.71-1.09c-.13-.34-.29-.84-.33-1.77-.05-1-.06-1.3-.06-3.84s.01-2.84.06-3.84c.04-.93.2-1.43.33-1.77.17-.44.38-.76.71-1.09.33-.33.65-.54 1.09-.71.34-.13.84-.29 1.77-.33 1-.05 1.3-.06 3.84-.06Z" />
                </svg>
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
