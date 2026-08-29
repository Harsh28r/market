import { findProduct, patchProduct, removeProduct, upsertProduct } from "@/lib/store";
import { isAdmin, unauthorized } from "@/lib/auth";
import type { Product } from "@/lib/products";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { slug } = await ctx.params;
  const product = await findProduct(slug);
  if (!product) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ product });
}

export async function PUT(req: Request, ctx: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { slug } = await ctx.params;
  const body = (await req.json()) as Product;
  const current = await findProduct(slug);
  if (!current) return Response.json({ error: "Not found" }, { status: 404 });
  const next: Product = { ...current, ...body, slug: body.slug || slug };
  await upsertProduct(next, slug);
  return Response.json({ product: next });
}

export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { slug } = await ctx.params;
  const patch = (await req.json()) as Partial<Product>;
  const product = await patchProduct(slug, patch);
  if (!product) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ product });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { slug } = await ctx.params;
  await removeProduct(slug);
  return Response.json({ ok: true });
}
