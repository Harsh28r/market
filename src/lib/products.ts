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
    tagline: "The stick every Indian home already knows — just cleaner.",
    price: 149,
    mrp: 199,
    scent: "nagchampa",
    family: "sacred",
    sticks: "40 sticks",
    burn: "45 min",
    bestFor: ["Daily aarti", "Ganesh", "Evening sandhya"],
    notes: ["Champaca", "Sandal", "Halmaddi"],
    story:
      "Temple-grade nag champa without the cheap charcoal bite. Slow roll, thick cream smoke, the smell of a neighbourhood that still rings a bell at dusk.",
    badge: "House staple",
  },
  {
    slug: "mysore-chandan",
    name: "Mysore Chandan",
    hindi: "मैसूर चंदन",
    tagline: "Sandalwood that actually smells like wood, not perfume.",
    price: 249,
    mrp: 329,
    scent: "chandan",
    family: "woody",
    sticks: "30 sticks",
    burn: "50 min",
    bestFor: ["Shiva Mondays", "Meditation", "New home"],
    notes: ["Mysore sandal", "Cedar", "Warm milk"],
    story:
      "Ground sandal, not a lab clone. Cool on the inhale, golden on the cloth. Light it before you sit — the room decides to behave.",
    badge: "Premium",
  },
  {
    slug: "gulab-raj",
    name: "Gulab Raj",
    hindi: "गुलाब राज",
    tagline: "Rose for Fridays. Lakshmi notices.",
    price: 189,
    mrp: 249,
    scent: "rose",
    family: "floral",
    sticks: "35 sticks",
    burn: "40 min",
    bestFor: ["Lakshmi pooja", "Friday aarti", "Weddings"],
    notes: ["Damask rose", "Honey", "Soft musk"],
    story:
      "Petal-heavy, never syrupy. The kind of rose your nani would approve — festive without shouting.",
    badge: "Friday ritual",
  },
  {
    slug: "loban-resin",
    name: "Loban Resin",
    hindi: "लोहबान",
    tagline: "Church, dargah, mandir — the same holy smoke.",
    price: 219,
    mrp: 279,
    scent: "loban",
    family: "resin",
    sticks: "25 sticks + 8 cones",
    burn: "35 min",
    bestFor: ["Cleansing", "Navratri", "After guests"],
    notes: ["Benzoin", "Frankincense", "Warm amber"],
    story:
      "Resin-forward dhoop that clears a room the old way. One cone after a long day. Windows optional.",
    badge: "Cleansing",
  },
  {
    slug: "mogra-raat",
    name: "Mogra Raat",
    hindi: "मोगरा रात",
    tagline: "Night-blooming jasmine for the last aarti.",
    price: 179,
    mrp: 229,
    scent: "mogra",
    family: "floral",
    sticks: "35 sticks",
    burn: "42 min",
    bestFor: ["Night aarti", "Radha-Krishna", "Summer evenings"],
    notes: ["Mogra", "Green stem", "Dew"],
    story:
      "White flower, green snap, no grandma-soap. Burns like a garden after rain on a tin roof.",
  },
  {
    slug: "kapur-jyoti",
    name: "Kapur Jyoti",
    hindi: "कपूर ज्योति",
    tagline: "Camphor that flares clean — aarti, then silence.",
    price: 129,
    mrp: 169,
    scent: "camphor",
    family: "sacred",
    sticks: "20 tablets + 20 sticks",
    burn: "12 min tablet",
    bestFor: ["Aarti close", "Ganesh", "Vastu"],
    notes: ["Bhimseni camphor", "Cool mint", "White smoke"],
    story:
      "Bhimseni-grade kapur, not the supermarket disc. Lights fast, dies honest. Pair with nag champa and you’re done.",
  },
  {
    slug: "tulsi-vana",
    name: "Tulsi Vana",
    hindi: "तुलसी वन",
    tagline: "Herb-bright. For the courtyard and the cough season.",
    price: 159,
    mrp: 209,
    scent: "tulsi",
    family: "sacred",
    sticks: "40 sticks",
    burn: "38 min",
    bestFor: ["Morning sandhya", "Tulsi chaura", "Monsoon"],
    notes: ["Holy basil", "Clove", "Dry leaf"],
    story:
      "Green, medicinal, temple-courtyard. The stick you light when the house needs waking, not decorating.",
  },
  {
    slug: "kewra-ghar",
    name: "Kewra Ghar",
    hindi: "केवड़ा घर",
    tagline: "The North Indian wedding in a stick.",
    price: 199,
    mrp: 259,
    scent: "kewra",
    family: "floral",
    sticks: "30 sticks",
    burn: "44 min",
    bestFor: ["Griha pravesh", "Festive thali", "Guests"],
    notes: ["Kewra", "Pandan", "Sugarcane"],
    story:
      "That syrupy-green kewra from shamianas and rabri. Unapologetically desi. Light two when people are coming over.",
  },
  {
    slug: "ganesh-utsav-kit",
    name: "Ganesh Utsav Kit",
    hindi: "गणेश उत्सव",
    tagline: "Three days of visarjan-ready smoke. No last-minute kirana run.",
    price: 799,
    mrp: 1099,
    scent: "festival",
    family: "kit",
    sticks: "3 fragrances · 90 sticks",
    burn: "Full utsav",
    bestFor: ["Ganesh Chaturthi", "Gifting", "New mandir"],
    notes: ["Nag champa", "Camphor", "Rose"],
    story:
      "Nag champa for the daily aarti, kapur for the arti close, gulab for the last evening. Cotton wicks, a brass-look holder, and a small packet of sindoor. Ships in 24 hrs.",
    badge: "Limited · Ganesh",
  },
  {
    slug: "nitya-box",
    name: "Nitya Box",
    hindi: "नित्य बॉक्स",
    tagline: "A month of morning aarti, packed on the 1st.",
    price: 349,
    mrp: 449,
    scent: "nitya",
    family: "kit",
    sticks: "120 sticks / month",
    burn: "Daily",
    bestFor: ["Subscription", "Busy homes", "Parents"],
    notes: ["Rotating sacred blend", "Chandan", "Tulsi"],
    story:
      "We rotate temple blends so the house never goes nose-blind. Pause anytime. COD on the first box. Most people set it and forget it — that’s the point.",
    badge: "Subscribe",
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

export function getProduct(slug: string, list: Product[] = products) {
  return list.find((p) => p.slug === slug);
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
