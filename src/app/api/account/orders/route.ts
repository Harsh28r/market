import { getCurrentUser } from "@/lib/customer-auth";
import { listOrdersByUser } from "@/lib/store";
import { unauthorized } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();
  const orders = await listOrdersByUser(user.id);
  return Response.json({ orders });
}
