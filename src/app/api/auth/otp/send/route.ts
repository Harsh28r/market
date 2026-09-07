import { randomInt } from "crypto";
import {
  findOtp,
  findUserByEmail,
  putOtp,
  deleteOtp,
} from "@/lib/store";
import {
  hashPassword,
  validEmail,
  validPhone,
} from "@/lib/customer-auth";
import { sendOtpMail, mailConfigured } from "@/lib/mailer";

const TTL_MS = 10 * 60 * 1000;
const COOLDOWN_MS = 45 * 1000;

export async function POST(req: Request) {
  const body = (await req.json()) as {
    email?: string;
    name?: string;
    phone?: string;
  };
  const email = String(body.email ?? "").trim().toLowerCase();
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "").slice(-10);

  if (!validEmail(email)) {
    return Response.json({ error: "Need a real email." }, { status: 400 });
  }
  if (!mailConfigured()) {
    return Response.json(
      {
        error:
          "Mail not configured. Put GMAIL_USER + GMAIL_APP_PASSWORD in .env.local and restart the server.",
      },
      { status: 503 },
    );
  }

  const existing = await findUserByEmail(email);
  if (!existing) {
    if (!name) {
      return Response.json(
        {
          error: "New here — add your name, then we’ll mail the code.",
          needsSignup: true,
        },
        { status: 400 },
      );
    }
    if (!validPhone(phone)) {
      return Response.json({ error: "10-digit phone." }, { status: 400 });
    }
  }

  const prev = await findOtp(email);
  if (prev && Date.now() - prev.sentAt < COOLDOWN_MS) {
    const wait = Math.ceil((COOLDOWN_MS - (Date.now() - prev.sentAt)) / 1000);
    return Response.json(
      { error: `Wait ${wait}s before another code.` },
      { status: 429 },
    );
  }

  const code = String(randomInt(100000, 1000000));
  await putOtp({
    email,
    hash: await hashPassword(code),
    exp: Date.now() + TTL_MS,
    attempts: 0,
    sentAt: Date.now(),
    name: existing ? existing.name : name,
    phone: existing ? existing.phone : phone,
  });

  try {
    const mail = await sendOtpMail(email, code);
    console.log(`[ARPAN OTP] mailed ${email} via ${mail.via}`);
    return Response.json({ ok: true, via: mail.via });
  } catch (e) {
    await deleteOtp(email);
    const msg = e instanceof Error ? e.message : "Couldn’t send mail.";
    return Response.json({ error: msg }, { status: 503 });
  }
}
