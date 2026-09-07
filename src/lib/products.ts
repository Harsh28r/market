export type Family = "floral" | "woody" | "resin" | "sacred" | "kit";
export type ScentKey =
  | "nagchampa"
  | "chandan"
  | "rose"
  | "loban"
  | "mogra"
  | "camphor"
  | "tulsi"
  | "kewra"
  | "festival"
  | "nitya";

export type Product = {
  slug: string;
  name: string;
  hindi: string;
  tagline: string;
  price: number;
  mrp: number;
  scent: ScentKey;
  family: Family;
  sticks: string;
  burn: string;
  bestFor: string[];
  notes: string[];
  story: string;
  badge?: string;
  image?: string;
  seoTitle?: string;
  seoDescription?: string;
  sku: string;
  stock: number;
  active: boolean;
};

export const scentKeys: ScentKey[] = [
  "nagchampa",
  "chandan",
  "rose",
  "loban",
  "mogra",
  "camphor",
  "tulsi",
  "kewra",
  "festival",
  "nitya",
];

const raw: Omit<Product, "sku" | "stock" | "active">[] = [
  {
    slug: "nag-champa-aarti",
    name: "Nag Champa Aarti",
    hindi: "नाग चंपा",
    tagline: "ARPAN Signature Temple-Grade Nag Champa Masala Agarbatti.",
    price: 149,
    mrp: 199,
    scent: "nagchampa",
    family: "sacred",
    sticks: "40 sticks",
    burn: "45 min",
    bestFor: ["Daily aarti", "Ganesh", "Evening sandhya"],
    notes: ["Champaca", "Sandal", "Halmaddi"],
    story:
      "ARPAN temple-grade nag champa without cheap charcoal bite. Hand-rolled with pure champaca flower extract, golden halmaddi resin, and ground mysore sandalwood.",
    badge: "House staple",
    image: "/products/nag-champa-aarti.jpg",
  },
  {
    slug: "mysore-chandan",
    name: "Mysore Chandan",
    hindi: "मैसूर चंदन",
    tagline: "100% Pure Sandalwood Masala Agarbatti with Zero Synthetic Perfume.",
    price: 249,
    mrp: 329,
    scent: "chandan",
    family: "woody",
    sticks: "30 sticks",
    burn: "50 min",
    bestFor: ["Shiva Mondays", "Meditation", "New home"],
    notes: ["Mysore sandal", "Cedar", "Warm milk"],
    story:
      "ARPAN Mysore Chandan features pure ground sandalwood dust and cold-pressed sandal essential oil. Calm, golden, and deeply meditative.",
    badge: "Premium",
    image: "/products/mysore-chandan.jpg",
  },
  {
    slug: "gulab-raj",
    name: "Gulab Raj",
    hindi: "गुलाब राज",
    tagline: "Kannauj Damask Rose Agarbatti for Friday Lakshmi Worship.",
    price: 189,
    mrp: 249,
    scent: "rose",
    family: "floral",
    sticks: "35 sticks",
    burn: "40 min",
    bestFor: ["Lakshmi pooja", "Friday aarti", "Weddings"],
    notes: ["Damask rose", "Honey", "Soft musk"],
    story:
      "Crafted with natural Damask rose attar distilled in traditional copper degs of Kannauj. ARPAN Gulab Raj brings divine flower fragrance into your pooja room.",
    badge: "Friday ritual",
    image: "/products/gulab-raj.jpg",
  },
  {
    slug: "loban-resin",
    name: "Loban Resin Dhoop",
    hindi: "लोहबान धुप",
      tagline: "Sacred Benzoin & Frankincense Resin for Energy Cleansing.",
      price: 219,
      mrp: 279,
      scent: "loban",
      family: "resin",
    sticks: "25 sticks + 8 cones",
    burn: "35 min",
    bestFor: ["Cleansing", "Navratri", "After guests"],
    notes: ["Benzoin", "Frankincense", "Warm amber"],
    story:
      "ARPAN Loban Resin is made from pure tree resins. Creates rich purifying temple smoke that eliminates negative energy and purifies home air.",
    badge: "Cleansing",
    image: "/products/loban-resin.jpg",
  },
  {
    slug: "mogra-raat",
    name: "Mogra Raat",
    hindi: "मोगरा रात",
    tagline: "Night-Blooming Jasmine Agarbatti for Serene Evenings.",
    price: 179,
    mrp: 229,
    scent: "mogra",
    family: "floral",
    sticks: "35 sticks",
    burn: "42 min",
    bestFor: ["Night aarti", "Radha-Krishna", "Summer evenings"],
    notes: ["Mogra", "Green stem", "Dew"],
    story:
      "ARPAN Mogra Raat captures fresh white jasmine blossoms. Rolled in natural bamboo stick with botanical binder.",
    image: "/products/mogra-raat.jpg",
  },
  {
    slug: "kapur-jyoti",
    name: "Kapur Jyoti",
    hindi: "कपूर ज्योति",
    tagline: "Pure Bhimseni Camphor Agarbatti for Aarti Finish.",
    price: 129,
    mrp: 169,
    scent: "camphor",
    family: "sacred",
    sticks: "20 tablets + 20 sticks",
    burn: "12 min tablet",
    bestFor: ["Aarti close", "Ganesh", "Vastu"],
    notes: ["Bhimseni camphor", "Cool mint", "White smoke"],
    story:
      "ARPAN Kapur Jyoti uses 100% organic Bhimseni camphor that burns spotless and leaves a crisp, sacred aura in your home.",
    image: "/products/kapur-jyoti.jpg",
  },
  {
    slug: "tulsi-vana",
    name: "Tulsi Vana",
    hindi: "तुलसी वन",
    tagline: "Sacred Holy Basil & Herb Agarbatti for Courtyard Aarti.",
    price: 159,
    mrp: 209,
    scent: "tulsi",
    family: "sacred",
    sticks: "40 sticks",
    burn: "38 min",
    bestFor: ["Morning sandhya", "Tulsi chaura", "Monsoon"],
    notes: ["Holy basil", "Clove", "Dry leaf"],
    story:
      "ARPAN Tulsi Vana combines crushed holy basil leaves with herbal spice oils for an invigorating, germ-cleansing morning ritual.",
    image: "/products/tulsi-vana.jpg",
  },
  {
    slug: "kewra-ghar",
    name: "Kewra Ghar",
    hindi: "केवड़ा घर",
    tagline: "Royal Pandanus Flower Agarbatti for Festive House Warming.",
    price: 199,
    mrp: 259,
    scent: "kewra",
    family: "floral",
    sticks: "30 sticks",
    burn: "44 min",
    bestFor: ["Griha pravesh", "Festive thali", "Guests"],
    notes: ["Kewra", "Pandan", "Sugarcane"],
    story:
      "Extracted from wild Ganjam Kewra flowers, ARPAN Kewra Ghar fills the room with festive sweetness for special guests.",
    image: "/products/kewra-ghar.jpg",
  },
  {
    slug: "ganesh-utsav-kit",
    name: "Ganesh Utsav Kit",
    hindi: "गणेश उत्सव किट",
    tagline: "Complete 10-Day Festival Agarbatti & Brass Holder Set.",
    price: 799,
    mrp: 1099,
    scent: "festival",
    family: "kit",
    sticks: "3 fragrances · 90 sticks",
    burn: "Full utsav",
    bestFor: ["Ganesh Chaturthi", "Gifting", "New mandir"],
    notes: ["Nag champa", "Camphor", "Rose"],
    story:
      "The ARPAN Ganesh Utsav Kit comes in a luxury gold embossed box. Includes Nag Champa, Kapur Jyoti, Gulab Raj, solid brass incense burner, and pure kumkum.",
    badge: "Limited · Ganesh",
    image: "/products/ganesh-utsav-kit.jpg",
  },
  {
    slug: "nitya-box",
    name: "Nitya Box",
    hindi: "नित्य बॉक्स",
    tagline: "Monthly ARPAN Organic Agarbatti Subscription Pack.",
    price: 349,
    mrp: 449,
    scent: "nitya",
    family: "kit",
    sticks: "120 sticks / month",
    burn: "Daily",
    bestFor: ["Subscription", "Busy homes", "Parents"],
    notes: ["Rotating sacred blend", "Chandan", "Tulsi"],
    story:
      "Receive 4 distinct ARPAN hand-rolled incense packs delivered to your doorstep every month with free brass holder samples.",
    badge: "Subscribe",
    image: "/products/nitya-box.jpg",
  },
];

const stocks = [240, 86, 120, 18, 64, 200, 9, 41, 32, 400];

export const products: Product[] = raw.map((p, i) => ({
  ...p,
  sku: `ARP-${1001 + i}`,
  stock: stocks[i] ?? 80,
  active: true,
}));

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export const rituals = [
  {
    id: "daily",
    name: "Daily aarti",
    hindi: "नित्य आरती",
    blurb: "Morning and dusk. Keep it simple, keep it every day.",
    slugs: ["nag-champa-aarti", "tulsi-vana", "nitya-box"],
  },
  {
    id: "lakshmi",
    name: "Lakshmi Friday",
    hindi: "लक्ष्मी शुक्रवार",
    blurb: "Rose, gold, and a clean thali. Money likes fragrance.",
    slugs: ["gulab-raj", "mysore-chandan", "kewra-ghar"],
  },
  {
    id: "shiva",
    name: "Shiva Monday",
    hindi: "सोमवार शिव",
    blurb: "Cool sandal, slow smoke, no chatter.",
    slugs: ["mysore-chandan", "loban-resin", "kapur-jyoti"],
  },
  {
    id: "ganesh",
    name: "Ganesh utsav",
    hindi: "गणपति",
    blurb: "The 10-day house party. Don’t run out on visarjan.",
    slugs: ["ganesh-utsav-kit", "nag-champa-aarti", "kapur-jyoti"],
  },
  {
    id: "cleanse",
    name: "Clear the ghar",
    hindi: "शुद्धि",
    blurb: "After illness, after a fight, after too many people.",
    slugs: ["loban-resin", "kapur-jyoti", "tulsi-vana"],
  },
  {
    id: "guests",
    name: "People are coming",
    hindi: "अतिथि",
    blurb: "The house should smell like you meant it.",
    slugs: ["kewra-ghar", "mogra-raat", "gulab-raj"],
  },
] as const;

export const reviews = [
  {
    name: "Meera K.",
    city: "Pune",
    quote:
      "Stopped buying the ₹40 supermarket bundle. Nag champa here actually smells like the temple down our lane, not burning paper.",
    product: "Nag Champa Aarti",
  },
  {
    name: "Arjun S.",
    city: "Bengaluru",
    quote:
      "Nitya box is the only subscription I haven’t cancelled. Parents in Jaipur get the same pack. One less phone call.",
    product: "Nitya Box",
  },
  {
    name: "Fatima R.",
    city: "Hyderabad",
    quote:
      "Loban cones after I get home from clinic. Ten minutes and the flat is a different country.",
    product: "Loban Resin",
  },
  {
    name: "Nandini P.",
    city: "Ahmedabad",
    quote:
      "Gulab Raj for Friday Lakshmi — my mother-in-law asked which mandir I bought it from. I didn’t correct her.",
    product: "Gulab Raj",
  },
];

export const ratings: Record<string, { score: number; n: number }> = {
  "nag-champa-aarti": { score: 4.8, n: 86 },
  "mysore-chandan": { score: 4.7, n: 54 },
  "gulab-raj": { score: 4.8, n: 61 },
  "loban-resin": { score: 4.6, n: 39 },
  "mogra-raat": { score: 4.5, n: 28 },
  "kapur-jyoti": { score: 4.7, n: 44 },
  "tulsi-vana": { score: 4.6, n: 21 },
  "kewra-ghar": { score: 4.5, n: 19 },
  "ganesh-utsav-kit": { score: 4.9, n: 33 },
  "nitya-box": { score: 4.8, n: 47 },
  "oud-ruh": { score: 4.6, n: 16 },
};

export function productRating(slug: string) {
  return ratings[slug] ?? { score: 4.6, n: 12 };
}

export function getProduct(slug: string, list: Product[] = products) {
  return list.find((p) => p.slug === slug);
}

export function productImage(slug?: string, image?: string) {
  if (image?.includes(".svg") && slug) return `/products/${slug}.jpg`;
  if (image && /\.(jpe?g|png|webp)(\?|$)/i.test(image)) return image;
  if (slug) return `/products/${slug}.jpg`;
  return "/products/nag-champa-aarti.jpg";
}

export function inr(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export const families: { id: Family | "all"; label: string }[] = [
  { id: "all", label: "All smoke" },
  { id: "sacred", label: "Sacred" },
  { id: "floral", label: "Floral" },
  { id: "woody", label: "Woody" },
  { id: "resin", label: "Resin" },
  { id: "kit", label: "Kits" },
];
