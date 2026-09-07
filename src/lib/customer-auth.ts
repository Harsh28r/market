import { createHmac, randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { cookies } from "next/headers";
import { findUserById, toPublicUser, type PublicUser } from "@/lib/store";

export { validEmail, validPhone, safeNext } from "@/lib/auth-shared";

const scryptAsync = promisify(scrypt) as (
  password: string | Buffer,
  salt: Buffer,
  keylen: number,
) => Promise<Buffer>;

export const CUSTOMER_COOKIE = "arpan_customer";
export const EMAIL_TICKET_COOKIE = "arpan_email_ok";
const SECRET = process.env.ARPAN_AUTH_SECRET ?? "arpan-dev-auth-secret";
const SESSION_MS = 60 * 60 * 24 * 30;
const TICKET_MS = 60 * 15;

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;
  if (hash.length !== expected.length) return false;
  return timingSafeEqual(hash, expected);
}

export function signSession(userId: string) {
  const exp = Date.now() + SESSION_MS * 1000;
  const payload = Buffer.from(JSON.stringify({ id: userId, exp })).toString(
    "base64url",
  );
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function readSession(token: string | undefined): { id: string } | null {
  if (!token) return null;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return null;
  const expected = createHmac("sha256", SECRET)
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString(),
    ) as { id?: string; exp?: number };
    if (!data.id || typeof data.exp !== "number" || data.exp < Date.now()) {
      return null;
    }
    return { id: data.id };
  } catch {
    return null;
  }
}

export async function setSessionCookie(userId: string) {
  const jar = await cookies();
  jar.set(CUSTOMER_COOKIE, signSession(userId), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MS,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(CUSTOMER_COOKIE);
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const jar = await cookies();
  const session = readSession(jar.get(CUSTOMER_COOKIE)?.value);
  if (!session) return null;
  const user = await findUserById(session.id);
  return user ? toPublicUser(user) : null;
}

function signPayload(data: object) {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const sig = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

function readPayload<T extends object>(token: string | undefined): T | null {
  const session = token ? token.split(".") : [];
  if (session.length !== 2) return null;
  const [payload, sig] = session;
  const expected = createHmac("sha256", SECRET)
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString()) as T;
  } catch {
    return null;
  }
}

export async function setEmailTicket(email: string) {
  const jar = await cookies();
  jar.set(
    EMAIL_TICKET_COOKIE,
    signPayload({ email, exp: Date.now() + TICKET_MS * 1000 }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: TICKET_MS,
      secure: process.env.NODE_ENV === "production",
    },
  );
}

export async function clearEmailTicket() {
  const jar = await cookies();
  jar.delete(EMAIL_TICKET_COOKIE);
}

export async function readEmailTicket(): Promise<string | null> {
  const jar = await cookies();
  const data = readPayload<{ email?: string; exp?: number }>(
    jar.get(EMAIL_TICKET_COOKIE)?.value,
  );
  if (!data?.email || typeof data.exp !== "number" || data.exp < Date.now()) {
    return null;
  }
  return data.email;
}
