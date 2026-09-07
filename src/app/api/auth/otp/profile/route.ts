import { createUser, findUserByEmail, toPublicUser } from "@/lib/store";
import {
  clearEmailTicket,
  readEmailTicket,
  setSessionCookie,
  validPhone,
} from "@/lib/customer-auth";

export async function POST(req: Request) {
  const email = await readEmailTicket();
  if (!email) {
    return Response.json(
      { error: "Verify the mail code first." },
      { status: 401 },
    );
  }

  const body = (await req.json()) as { name?: string; phone?: string };
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "").slice(-10);
  if (!name) {
    return Response.json({ error: "Name is required." }, { status: 400 });
  }
  if (!validPhone(phone)) {
    return Response.json({ error: "10-digit phone." }, { status: 400 });
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    await setSessionCookie(existing.id);
    await clearEmailTicket();
    return Response.json({ user: toPublicUser(existing) });
  }

  try {
    const user = await createUser({
      email,
      name,
      phone,
      address: "",
      emailVerified: true,
    });
    await setSessionCookie(user.id);
    await clearEmailTicket();
    return Response.json({ user }, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message === "email taken") {
      return Response.json({ error: "That email already has a house here." }, { status: 409 });
    }
    throw e;
  }
}
