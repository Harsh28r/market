export const WHATSAPP = "7822962756";
export const WHATSAPP_DISPLAY = "+91 78229 62756";
export const EMAIL = "hello@arpandhupa.in";
export const INSTAGRAM = "arpandhupa";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM}`;
export const FREE_SHIP_AT = 499;
export const SHIP_FEE = 79;
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://arpandhupa.in";
export const BRAND = "ARPAN";
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID?.trim() || "yf4ed2b2u1";
export const DEFAULT_SEO = {
  title: "Buy Agarbatti Online | Charcoal-Free Incense | ARPAN",
  description:
    "Buy charcoal-free agarbatti online from Nashik. Hand-rolled Nag Champa, Mysore Chandan, rose & loban dhoop. 40–50 min burn. COD across India.",
  keywords:
    "buy agarbatti online, charcoal free agarbatti, agarbatti online India, nag champa agarbatti, sandalwood incense sticks, dhoop sticks online, pooja incense, organic agarbatti, temple agarbatti, ARPAN agarbatti, charcoal free incense",
};
export const whatsappHref = (text?: string) => {
  const base = `https://wa.me/91${WHATSAPP}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
};
