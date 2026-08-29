import { cookies } from "next/headers";

export const ADMIN_PASS = process.env.ARPAN_ADMIN_PASS ?? "arpan108";
export const ADMIN_COOKIE = "arpan_admin";

export async function isAdmin() {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === "ok";
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}
