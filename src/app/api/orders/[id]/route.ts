import { findOrder, setOrderStatus, type OrderStatus } from "@/lib/store";
import { isAdmin, unauthorized } from "@/lib/auth";

const STATUSES: OrderStatus[] = [
  "placed",
  "packed",
  "shipped",
  "delivered",
  "cancelled",
];

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await ctx.params;
  const order = await findOrder(id);
  if (!order) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ order });
}

export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await isAdmin())) return unauthorized();
  const { id } = await ctx.params;
  const { status } = (await req.json()) as { status: OrderStatus };
  if (!STATUSES.includes(status)) {
    return Response.json({ error: "Bad status" }, { status: 400 });
  }
  const order = await setOrderStatus(id, status);
  if (!order) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ order });
}
