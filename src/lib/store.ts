import { readFile } from "fs/promises";
import path from "path";
import { MongoServerError, type Collection, type Document } from "mongodb";
import { products as seedProducts, type Product } from "@/lib/products";
import { defaultSiteSeo, type SiteSeo } from "@/lib/seo";
import { canUseMongo, getDb } from "@/lib/mongo";

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
  userId?: string;
  customer: { name: string; phone: string; address: string; email?: string };
  pay: "cod" | "upi";
  items: OrderItem[];
  subtotal: number;
  ship: number;
  total: number;
  status: OrderStatus;
};

export type User = {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  passwordHash?: string;
  emailVerified: boolean;
  createdAt: string;
};

export type PublicUser = Omit<User, "passwordHash">;

export type EmailOtp = {
  email: string;
  hash: string;
  exp: number;
  attempts: number;
  sentAt: number;
  name?: string;
  phone?: string;
};

export type DB = {
  products: Product[];
  orders: Order[];
  users: User[];
  otps: EmailOtp[];
  seq: number;
  seo: SiteSeo;
};

export function toPublicUser(user: User | PublicUser): PublicUser {
  const { passwordHash: _pw, ...rest } = user as User;
  void _pw;
  return rest;
}

type MetaSeo = SiteSeo & { _id: "seo" };
type MetaSeq = { _id: "orderSeq"; seq: number };
type OtpDoc = EmailOtp & { _id: string; expiresAt: Date };

const FILE = path.join(process.cwd(), "data", "db.json");

function omitId<T extends { _id?: unknown }>(doc: T): Omit<T, "_id"> {
  const { _id: _unused, ...rest } = doc;
  void _unused;
  return rest;
}

async function col<T extends Document>(name: string): Promise<Collection<T>> {
  await boot();
  const db = await getDb();
  return db.collection<T>(name);
}

let bootPromise: Promise<void> | null = null;

function boot() {
  if (!bootPromise) bootPromise = bootOnce();
  return bootPromise;
}

async function bootOnce() {
  const db = await getDb();
  const products = db.collection<Product & { _id: string }>("products");
  const users = db.collection<User & { _id: string }>("users");
  const orders = db.collection<Order & { _id: string }>("orders");
  const otps = db.collection<OtpDoc>("otps");
  const meta = db.collection<MetaSeo | MetaSeq>("meta");

  await Promise.all([
    products.createIndex({ slug: 1 }, { unique: true }),
    users.createIndex({ email: 1 }, { unique: true }),
    orders.createIndex({ userId: 1, createdAt: -1 }),
    otps.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]);

  if ((await products.countDocuments()) > 0) return;

  let seed: Partial<DB> = {
    products: seedProducts,
    orders: [],
    users: [],
    seq: 2409,
    seo: defaultSiteSeo,
  };
  try {
    const parsed = JSON.parse(await readFile(FILE, "utf8")) as Partial<DB>;
    if (parsed.products?.length) seed = parsed;
  } catch {
    /* first deploy with empty Atlas — catalog from code */
  }

  const productDocs = (seed.products ?? seedProducts).map((p) => ({
    ...p,
    _id: p.slug,
  }));
  const orderDocs = (seed.orders ?? []).map((o) => ({ ...o, _id: o.id }));
  const userDocs = (seed.users ?? []).map((u) => ({
    ...u,
    email: u.email.trim().toLowerCase(),
    emailVerified: Boolean(u.emailVerified),
    _id: u.id,
  }));

  try {
    if (productDocs.length) await products.insertMany(productDocs, { ordered: false });
  } catch (err) {
    if (!(err instanceof MongoServerError && err.code === 11000)) throw err;
  }
  try {
    if (orderDocs.length) await orders.insertMany(orderDocs, { ordered: false });
  } catch (err) {
    if (!(err instanceof MongoServerError && err.code === 11000)) throw err;
  }
  try {
    if (userDocs.length) await users.insertMany(userDocs, { ordered: false });
  } catch (err) {
    if (!(err instanceof MongoServerError && err.code === 11000)) throw err;
  }

  await meta.updateOne(
    { _id: "orderSeq" },
    { $setOnInsert: { seq: seed.seq ?? 2409 } },
    { upsert: true },
  );
  await meta.updateOne(
    { _id: "seo" },
    { $setOnInsert: { ...defaultSiteSeo, ...seed.seo } },
    { upsert: true },
  );
}

function seedList(activeOnly?: boolean) {
  return activeOnly ? seedProducts.filter((p) => p.active) : seedProducts;
}

export async function listProducts(opts?: { activeOnly?: boolean }) {
  if (!canUseMongo()) return seedList(opts?.activeOnly);
  try {
    const products = await col<Product & { _id: string }>("products");
    const list = (await products.find().toArray()).map((p) => omitId(p) as Product);
    return opts?.activeOnly ? list.filter((p) => p.active) : list;
  } catch (err) {
    console.error("[store] listProducts fallback to seed", err);
    return seedList(opts?.activeOnly);
  }
}

export async function findProduct(slug: string) {
  if (!canUseMongo()) return seedProducts.find((p) => p.slug === slug);
  try {
    const products = await col<Product & { _id: string }>("products");
    const doc = await products.findOne({ slug });
    return doc ? (omitId(doc) as Product) : undefined;
  } catch (err) {
    console.error("[store] findProduct fallback to seed", err);
    return seedProducts.find((p) => p.slug === slug);
  }
}

export async function upsertProduct(product: Product, prevSlug?: string) {
  const products = await col<Product & { _id: string }>("products");
  const key = prevSlug ?? product.slug;
  if (key !== product.slug) {
    await products.deleteOne({ _id: key });
  }
  await products.replaceOne(
    { _id: product.slug },
    product,
    { upsert: true },
  );
  return product;
}

export async function patchProduct(slug: string, patch: Partial<Product>) {
  const products = await col<Product & { _id: string }>("products");
  const doc = await products.findOneAndUpdate(
    { _id: slug },
    { $set: patch },
    { returnDocument: "after" },
  );
  return doc ? (omitId(doc) as Product) : null;
}

export async function removeProduct(slug: string) {
  const products = await col<Product & { _id: string }>("products");
  await products.deleteOne({ _id: slug });
}

export async function listOrders() {
  if (!canUseMongo()) return [];
  const orders = await col<Order & { _id: string }>("orders");
  return (await orders.find().sort({ createdAt: -1 }).toArray()).map(
    (o) => omitId(o) as Order,
  );
}

export async function findOrder(id: string) {
  const orders = await col<Order & { _id: string }>("orders");
  const doc = await orders.findOne({ _id: id });
  return doc ? (omitId(doc) as Order) : undefined;
}

export async function createOrder(
  input: Omit<Order, "id" | "createdAt" | "status">,
) {
  const db = await getDb();
  await boot();
  const meta = db.collection<MetaSeq>("meta");
  const products = db.collection<Product & { _id: string }>("products");
  const orders = db.collection<Order & { _id: string }>("orders");

  const before = await meta.findOneAndUpdate(
    { _id: "orderSeq" },
    { $inc: { seq: 1 } },
    { returnDocument: "before", upsert: true },
  );
  const n = before?.seq ?? 2409;
  const id = `ARP-${n}`;

  for (const line of input.items) {
    await products.updateOne({ _id: line.slug }, [
      { $set: { stock: { $max: [0, { $subtract: ["$stock", line.qty] }] } } },
    ]);
  }

  const order: Order = {
    ...input,
    id,
    createdAt: new Date().toISOString(),
    status: "placed",
  };
  await orders.insertOne({ ...order, _id: id });
  return order;
}

export async function setOrderStatus(id: string, status: OrderStatus) {
  const db = await getDb();
  await boot();
  const orders = db.collection<Order & { _id: string }>("orders");
  const products = db.collection<Product & { _id: string }>("products");
  const order = await orders.findOne({ _id: id });
  if (!order) return null;
  if (order.status !== "cancelled" && status === "cancelled") {
    for (const line of order.items) {
      await products.updateOne({ _id: line.slug }, { $inc: { stock: line.qty } });
    }
  }
  const next = await orders.findOneAndUpdate(
    { _id: id },
    { $set: { status } },
    { returnDocument: "after" },
  );
  return next ? (omitId(next) as Order) : null;
}

export async function getSeo(): Promise<SiteSeo> {
  if (!canUseMongo()) return defaultSiteSeo;
  try {
    const meta = await col<MetaSeo>("meta");
    const doc = await meta.findOne({ _id: "seo" });
    return { ...defaultSiteSeo, ...omitId(doc ?? { _id: "seo" }) };
  } catch (err) {
    console.error("[store] getSeo fallback to defaults", err);
    return defaultSiteSeo;
  }
}

export async function saveSeo(patch: Partial<SiteSeo>): Promise<SiteSeo> {
  const current = await getSeo();
  const next = { ...defaultSiteSeo, ...current, ...patch };
  const meta = await col<MetaSeo>("meta");
  await meta.updateOne({ _id: "seo" }, { $set: next }, { upsert: true });
  return next;
}

export async function listUsers(): Promise<PublicUser[]> {
  if (!canUseMongo()) return [];
  const users = await col<User & { _id: string }>("users");
  return (await users.find().toArray()).map((u) => toPublicUser(omitId(u) as User));
}

export async function findUserById(id: string) {
  const users = await col<User & { _id: string }>("users");
  const doc = await users.findOne({ _id: id });
  return doc ? (omitId(doc) as User) : undefined;
}

export async function findUserByEmail(email: string) {
  const users = await col<User & { _id: string }>("users");
  const doc = await users.findOne({ email: email.trim().toLowerCase() });
  return doc ? (omitId(doc) as User) : undefined;
}

export async function createUser(
  input: Omit<User, "id" | "createdAt">,
): Promise<PublicUser> {
  const users = await col<User & { _id: string }>("users");
  const email = input.email.trim().toLowerCase();
  const user: User = {
    ...input,
    email,
    emailVerified: input.emailVerified ?? true,
    id: `usr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  try {
    await users.insertOne({ ...user, _id: user.id });
  } catch (err) {
    if (err instanceof MongoServerError && err.code === 11000) {
      throw new Error("email taken");
    }
    throw err;
  }
  return toPublicUser(user);
}

export async function updateUser(
  id: string,
  patch: Partial<Pick<User, "name" | "phone" | "address" | "emailVerified">>,
): Promise<PublicUser | null> {
  const users = await col<User & { _id: string }>("users");
  const doc = await users.findOneAndUpdate(
    { _id: id },
    { $set: patch },
    { returnDocument: "after" },
  );
  return doc ? toPublicUser(omitId(doc) as User) : null;
}

export async function listOrdersByUser(userId: string) {
  const orders = await col<Order & { _id: string }>("orders");
  return (
    await orders.find({ userId }).sort({ createdAt: -1 }).toArray()
  ).map((o) => omitId(o) as Order);
}

export async function putOtp(otp: EmailOtp) {
  const otps = await col<OtpDoc>("otps");
  const email = otp.email.trim().toLowerCase();
  const doc: OtpDoc = {
    ...otp,
    email,
    _id: email,
    expiresAt: new Date(otp.exp),
  };
  await otps.replaceOne({ _id: email }, doc, { upsert: true });
  return otp;
}

export async function findOtp(email: string) {
  const otps = await col<OtpDoc>("otps");
  const key = email.trim().toLowerCase();
  const doc = await otps.findOne({ _id: key, exp: { $gt: Date.now() } });
  if (!doc) return null;
  const { _id: _unused, expiresAt: _exp, ...otp } = doc;
  void _unused;
  void _exp;
  return otp;
}

export async function touchOtp(email: string, patch: Partial<EmailOtp>) {
  const otps = await col<OtpDoc>("otps");
  const key = email.trim().toLowerCase();
  const $set: Document = { ...patch };
  if (typeof patch.exp === "number") $set.expiresAt = new Date(patch.exp);
  const doc = await otps.findOneAndUpdate(
    { _id: key },
    { $set },
    { returnDocument: "after" },
  );
  if (!doc) return null;
  const { _id: _unused, expiresAt: _exp, ...otp } = doc;
  void _unused;
  void _exp;
  return otp;
}

export async function deleteOtp(email: string) {
  const otps = await col<OtpDoc>("otps");
  await otps.deleteOne({ _id: email.trim().toLowerCase() });
}
