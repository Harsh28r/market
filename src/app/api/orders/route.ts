import { createOrder, listOrders } from "@/lib/store";
import { isAdmin, unauthorized } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  const orders = await listOrders();
  return Response.json({ orders });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.customer?.name || !body?.items?.length) {
    return Response.json({ error: "Incomplete order" }, { status: 400 });
  }
  const order = await createOrder({
    customer: body.customer,
    pay: body.pay === "upi" ? "upi" : "cod",
    items: body.items,
    subtotal: Number(body.subtotal),
    ship: Number(body.ship),
    total: Number(body.total),
  });
  return Response.json({ order }, { status: 201 });
}
