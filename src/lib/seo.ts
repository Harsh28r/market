import type { Metadata } from "next";
import type { Product } from "@/lib/products";
import { productImage, productRating } from "@/lib/products";
import { BRAND, DEFAULT_SEO, EMAIL, INSTAGRAM_URL, SITE_URL, WHATSAPP, WHATSAPP_DISPLAY } from "@/lib/site";

export type SiteSeo = {
  siteUrl: string;
  title: string;
  description: string;
  keywords: string;
};

export const defaultSiteSeo: SiteSeo = {
  siteUrl: SITE_URL,
  title: DEFAULT_SEO.title,
  description: DEFAULT_SEO.description,
  keywords: DEFAULT_SEO.keywords,
};

export function absUrl(path = "/", base = SITE_URL) {
  if (path.startsWith("http")) return path;
  return `${base.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export function productSeoTitle(p: Product) {
  return (
    p.seoTitle?.trim() ||
    `${p.name} Agarbatti | Charcoal-Free ${p.hindi || "Incense"} | ${BRAND}`
  );
}

export function productSeoDescription(p: Product) {
  const raw =
    p.seoDescription?.trim() ||
    `${p.tagline} ${p.sticks}, ${p.burn} burn. Hand-rolled, 0% charcoal masala. Best for ${p.bestFor.slice(0, 2).join(" & ")}. COD India.`;
  return raw.slice(0, 160);
}

export function productMetadata(p: Product, base = SITE_URL): Metadata {
  const title = productSeoTitle(p);
  const description = productSeoDescription(p);
  const image = absUrl(productImage(p.slug, p.image), base);
  const url = absUrl(`/product/${p.slug}`, base);
  return {
    title,
    description,
    keywords: [p.name, p.hindi, ...p.notes, ...p.bestFor, "agarbatti", "incense", BRAND]
      .filter(Boolean)
      .join(", "),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [{ url: image, width: 800, height: 1067, alt: `ARPAN ${p.name}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function homeLandingMetadata(seo: SiteSeo): Metadata {
  const url = absUrl("/", seo.siteUrl);
  const image = absUrl("/vedasakti_hero.jpg", seo.siteUrl);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    keywords: seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
      siteName: BRAND,
      title: seo.title,
      description: seo.description,
      images: [
        {
          url: image,
          width: 1200,
          height: 675,
          alt: "Buy charcoal-free agarbatti online from ARPAN Nashik",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const landingFaqs = [
  {
    q: "Is ARPAN agarbatti charcoal-free?",
    a: "Yes. ARPAN masala agarbatti is 0% charcoal — wood powder, dried flowers, halmaddi resin, and Kannauj attar. Clean cream smoke, not the kirana chemical bite.",
  },
  {
    q: "Can I buy agarbatti online with COD in India?",
    a: "Yes. Order on the site or WhatsApp. Cash on delivery and UPI across India. Nashik lots dispatch in 24 hours. Free brass holder on orders over ₹499.",
  },
  {
    q: "How long does ARPAN incense burn?",
    a: "Most sticks burn 40–50 minutes — longer than supermarket bundles. Pack size and burn time are listed on every product page.",
  },
  {
    q: "What fragrances can I buy?",
    a: "Nag Champa Aarti, Mysore Chandan, Gulab Raj rose, Loban resin dhoop, Mogra, Tulsi, Kewra, plus Ganesh utsav kits and the Nitya monthly box.",
  },
  {
    q: "How do I order ARPAN agarbatti?",
    a: "Add packs to the aarti tray on the site, or WhatsApp the pack name. Pay COD or UPI. Nashik dispatch in 24 hours to any Indian pin code.",
  },
  {
    q: "What if sticks break in transit?",
    a: "WhatsApp a photo within 48 hours. We replace the lot. See the returns page — no restocking fee on damaged incense.",
  },
];

export function landingJsonLd(seo: SiteSeo, productUrls: { name: string; url: string }[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: BRAND,
      alternateName: "अर्पण Agarbatti",
      url: seo.siteUrl,
      description: seo.description,
      inLanguage: "en-IN",
      potentialAction: [
        {
          "@type": "CommunicateAction",
          name: "Order on WhatsApp",
          target: `https://wa.me/91${WHATSAPP}`,
        },
        {
          "@type": "ReadAction",
          target: absUrl("/shop", seo.siteUrl),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "OnlineStore",
      name: `${BRAND} Agarbatti`,
      url: seo.siteUrl,
      image: absUrl("/vedasakti_hero.jpg", seo.siteUrl),
      description: seo.description,
      telephone: WHATSAPP_DISPLAY,
      email: EMAIL,
      areaServed: { "@type": "Country", name: "India" },
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash on Delivery, UPI",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nashik",
        addressCountry: "IN",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: landingFaqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "ARPAN charcoal-free agarbatti",
      itemListElement: productUrls.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: p.url,
        name: p.name,
      })),
    },
  ];
}

export function orgJsonLd(seo: SiteSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND,
    alternateName: "अर्पण",
    url: seo.siteUrl,
    email: EMAIL,
    telephone: WHATSAPP_DISPLAY,
    description: seo.description,
    logo: absUrl("/favicon.svg", seo.siteUrl),
    sameAs: [`https://wa.me/91${WHATSAPP}`, INSTAGRAM_URL],
  };
}

export function productJsonLd(p: Product, base = SITE_URL) {
  const { score, n } = productRating(p.slug);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.family === "kit" ? p.name : `${p.name} Agarbatti`,
    description: productSeoDescription(p),
    image: [absUrl(productImage(p.slug, p.image), base)],
    sku: p.sku,
    mpn: p.sku,
    brand: { "@type": "Brand", name: BRAND },
    category: "Incense Sticks",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Charcoal", value: "0%" },
      { "@type": "PropertyValue", name: "Burn time", value: p.burn },
      { "@type": "PropertyValue", name: "Origin", value: "Nashik, India" },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: score,
      reviewCount: n,
      bestRating: 5,
    },
    offers: {
      "@type": "Offer",
      url: absUrl(`/product/${p.slug}`, base),
      priceCurrency: "INR",
      price: p.price,
      availability: p.stock > 0 && p.active
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: BRAND, url: base },
      areaServed: { "@type": "Country", name: "India" },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };
}

export function breadcrumbJsonLd(
  crumbs: { name: string; path: string }[],
  base = SITE_URL,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absUrl(c.path, base),
    })),
  };
}

export function seoHealth(p: Product) {
  const title = productSeoTitle(p);
  const desc = productSeoDescription(p);
  const issues: string[] = [];
  if (!p.seoTitle) issues.push("No custom title");
  if (!p.seoDescription) issues.push("No custom meta");
  if (title.length > 60) issues.push("Title > 60");
  if (desc.length < 70) issues.push("Meta short");
  if (!p.image && !p.slug) issues.push("No image");
  return { title, desc, ok: issues.length === 0, issues };
}
