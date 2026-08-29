import { cookies } from "next/headers";
import { ADMIN_COOKIE, ADMIN_PASS } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string };
  if (password !== ADMIN_PASS) {
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, "ok", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return Response.json({ ok: true });
}

export async function DELETE() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
  return Response.json({ ok: true });
}
