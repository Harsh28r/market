import { getCurrentUser, validPhone } from "@/lib/customer-auth";
import { updateUser } from "@/lib/store";
import { unauthorized } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  return Response.json({ user });
}

export async function PATCH(req: Request) {
  const me = await getCurrentUser();
  if (!me) return unauthorized();

  const body = (await req.json()) as {
    name?: string;
    phone?: string;
    address?: string;
  };

  const patch: { name?: string; phone?: string; address?: string } = {};

  if (typeof body.name === "string" && body.name.trim()) {
    patch.name = body.name.trim();
  }
  if (typeof body.phone === "string") {
    const phone = body.phone.replace(/\D/g, "").slice(-10);
    if (!validPhone(phone)) {
      return Response.json({ error: "10-digit phone." }, { status: 400 });
    }
    patch.phone = phone;
  }
  if (typeof body.address === "string") {
    patch.address = body.address.trim();
  }

  const user = await updateUser(me.id, patch);
  return Response.json({ user });
}
