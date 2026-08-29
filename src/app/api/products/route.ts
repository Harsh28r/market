import { listProducts, upsertProduct } from "@/lib/store";
import { isAdmin, unauthorized } from "@/lib/auth";
import type { Product } from "@/lib/products";
import { slugify } from "@/lib/products";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const all = url.searchParams.get("all") === "1";
  const admin = await isAdmin();
  const products = await listProducts({
    activeOnly: !(all && admin),
  });
  return Response.json({ products });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) return unauthorized();
  const body = (await req.json()) as Partial<Product>;
  if (!body.name || body.price == null) {
    return Response.json({ error: "Name and price required" }, { status: 400 });
  }
  const existing = await listProducts();
  let slug = body.slug?.trim() || slugify(body.name);
  if (!slug) slug = `listing-${Date.now()}`;
  if (existing.some((p) => p.slug === slug)) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  const product: Product = {
    slug,
    name: body.name,
    hindi: body.hindi ?? "",
    tagline: body.tagline ?? "",
    price: Number(body.price),
    mrp: Number(body.mrp ?? body.price),
    scent: body.scent ?? "nagchampa",
    family: body.family ?? "sacred",
    sticks: body.sticks ?? "30 sticks",
    burn: body.burn ?? "40 min",
    bestFor: body.bestFor ?? [],
    notes: body.notes ?? [],
    story: body.story ?? "",
    badge: body.badge || undefined,
    sku: body.sku || `ARP-${slug.slice(0, 8).toUpperCase()}`,
    stock: Number(body.stock ?? 0),
    active: body.active !== false,
  };
  await upsertProduct(product);
  return Response.json({ product }, { status: 201 });
}
