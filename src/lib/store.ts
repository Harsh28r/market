import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { products as seedProducts, type Product } from "@/lib/products";

export type OrderStatus =
  | "placed"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  slug: string;
  name: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: { name: string; phone: string; address: string };
  pay: "cod" | "upi";
  items: OrderItem[];
  subtotal: number;
  ship: number;
  total: number;
  status: OrderStatus;
};

export type DB = {
  products: Product[];
  orders: Order[];
  seq: number;
};

const FILE = path.join(process.cwd(), "data", "db.json");

const seedOrders: Order[] = [
  {
    id: "ARP-2408",
    createdAt: "2026-08-29T08:12:00.000Z",
    customer: {
      name: "Meera Kulkarni",
      phone: "9876543210",
      address: "12 Lane 4, Kothrud, Pune 411038",
    },
    pay: "cod",
    items: [
      { slug: "nag-champa-aarti", name: "Nag Champa Aarti", price: 149, qty: 3 },
    ],
    subtotal: 447,
    ship: 79,
    total: 526,
    status: "packed",
  },
  {
    id: "ARP-2407",
    createdAt: "2026-08-28T14:40:00.000Z",
    customer: {
      name: "Arjun Shah",
      phone: "9811122233",
      address: "Koramangala 5th block, Bengaluru 560095",
    },
    pay: "upi",
    items: [{ slug: "nitya-box", name: "Nitya Box", price: 349, qty: 1 }],
    subtotal: 349,
    ship: 79,
    total: 428,
    status: "shipped",
  },
  {
    id: "ARP-2406",
    createdAt: "2026-08-28T09:05:00.000Z",
    customer: {
      name: "Fatima Rizvi",
      phone: "9000011122",
      address: "Banjara Hills, Hyderabad 500034",
    },
    pay: "cod",
    items: [
      { slug: "loban-resin", name: "Loban Resin", price: 219, qty: 2 },
      { slug: "kapur-jyoti", name: "Kapur Jyoti", price: 129, qty: 1 },
    ],
    subtotal: 567,
    ship: 79,
    total: 646,
    status: "placed",
  },
  {
    id: "ARP-2405",
    createdAt: "2026-08-27T18:22:00.000Z",
    customer: {
      name: "Nandini Patel",
      phone: "9825098765",
      address: "Navrangpura, Ahmedabad 380009",
    },
    pay: "upi",
    items: [
      { slug: "ganesh-utsav-kit", name: "Ganesh Utsav Kit", price: 799, qty: 1 },
    ],
    subtotal: 799,
    ship: 0,
    total: 799,
    status: "delivered",
  },
  {
    id: "ARP-2404",
    createdAt: "2026-08-26T11:10:00.000Z",
    customer: {
      name: "Rahul Iyer",
      phone: "9444012345",
      address: "Adyar, Chennai 600020",
    },
    pay: "cod",
    items: [
      { slug: "mysore-chandan", name: "Mysore Chandan", price: 249, qty: 2 },
      { slug: "tulsi-vana", name: "Tulsi Vana", price: 159, qty: 1 },
    ],
    subtotal: 657,
    ship: 79,
    total: 736,
    status: "shipped",
  },
  {
    id: "ARP-2403",
    createdAt: "2026-08-25T16:48:00.000Z",
    customer: {
      name: "Sana Qureshi",
      phone: "9810098100",
      address: "Hauz Khas, New Delhi 110016",
    },
    pay: "upi",
    items: [
      { slug: "gulab-raj", name: "Gulab Raj", price: 189, qty: 4 },
      { slug: "kewra-ghar", name: "Kewra Ghar", price: 199, qty: 1 },
    ],
    subtotal: 955,
    ship: 0,
    total: 955,
    status: "delivered",
  },
];

function seed(): DB {
  return { products: seedProducts, orders: seedOrders, seq: 2409 };
}

async function readDb(): Promise<DB> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as DB;
    if (!parsed.products?.length) return seed();
    return parsed;
  } catch {
    const db = seed();
    await persist(db);
    return db;
  }
}

async function persist(db: DB) {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(db, null, 2));
}

export async function listProducts(opts?: { activeOnly?: boolean }) {
  const db = await readDb();
  const list = db.products;
  return opts?.activeOnly ? list.filter((p) => p.active) : list;
}

export async function findProduct(slug: string) {
  const db = await readDb();
  return db.products.find((p) => p.slug === slug);
}

export async function upsertProduct(product: Product, prevSlug?: string) {
  const db = await readDb();
  const key = prevSlug ?? product.slug;
  const i = db.products.findIndex((p) => p.slug === key);
  if (i >= 0) db.products[i] = product;
  else db.products.unshift(product);
  await persist(db);
  return product;
}

export async function patchProduct(slug: string, patch: Partial<Product>) {
  const db = await readDb();
  const i = db.products.findIndex((p) => p.slug === slug);
  if (i < 0) return null;
  db.products[i] = { ...db.products[i], ...patch };
  await persist(db);
  return db.products[i];
}

export async function removeProduct(slug: string) {
  const db = await readDb();
  db.products = db.products.filter((p) => p.slug !== slug);
  await persist(db);
}

export async function listOrders() {
  const db = await readDb();
  return [...db.orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findOrder(id: string) {
  const db = await readDb();
  return db.orders.find((o) => o.id === id);
}

export async function createOrder(
  input: Omit<Order, "id" | "createdAt" | "status">,
) {
  const db = await readDb();
  const id = `ARP-${db.seq++}`;
  for (const line of input.items) {
    const p = db.products.find((x) => x.slug === line.slug);
    if (p) p.stock = Math.max(0, p.stock - line.qty);
  }
  const order: Order = {
    ...input,
    id,
    createdAt: new Date().toISOString(),
    status: "placed",
  };
  db.orders.unshift(order);
  await persist(db);
  return order;
}

export async function setOrderStatus(id: string, status: OrderStatus) {
  const db = await readDb();
  const order = db.orders.find((o) => o.id === id);
  if (!order) return null;
  if (order.status !== "cancelled" && status === "cancelled") {
    for (const line of order.items) {
      const p = db.products.find((x) => x.slug === line.slug);
      if (p) p.stock += line.qty;
    }
  }
  order.status = status;
  await persist(db);
  return order;
}
