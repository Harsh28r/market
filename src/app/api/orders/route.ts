import { createOrder, listOrders, updateUser } from "@/lib/store";
import { isAdmin, unauthorized } from "@/lib/auth";
import { getCurrentUser } from "@/lib/customer-auth";

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
  const user = await getCurrentUser();
  if (!user?.emailVerified) {
    return Response.json(
      { error: "Verify your email with the OTP before placing an order." },
      { status: 401 },
    );
  }
  const customer = {
    name: String(body.customer.name),
    phone: String(body.customer.phone ?? ""),
    address: String(body.customer.address ?? ""),
    email: user.email,
  };
  const order = await createOrder({
    userId: user.id,
    customer,
    pay: body.pay === "upi" ? "upi" : "cod",
    items: body.items,
    subtotal: Number(body.subtotal),
    ship: Number(body.ship),
    total: Number(body.total),
  });
  await updateUser(user.id, {
    name: customer.name,
    phone: customer.phone.replace(/\D/g, "").slice(-10) || user.phone,
    address: customer.address,
  });
  return Response.json({ order }, { status: 201 });
}
