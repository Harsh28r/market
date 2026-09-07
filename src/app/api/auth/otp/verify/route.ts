import {
  createUser,
  deleteOtp,
  findOtp,
  findUserByEmail,
  touchOtp,
  updateUser,
} from "@/lib/store";
import {
  clearEmailTicket,
  setEmailTicket,
  setSessionCookie,
  validEmail,
  verifyPassword,
} from "@/lib/customer-auth";

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string; code?: string };
  const email = String(body.email ?? "").trim().toLowerCase();
  const code = String(body.code ?? "").replace(/\D/g, "");

  if (!validEmail(email) || code.length !== 6) {
    return Response.json({ error: "Email + 6-digit code." }, { status: 400 });
  }

  const otp = await findOtp(email);
  if (!otp) {
    return Response.json({ error: "Code expired. Send another." }, { status: 400 });
  }
  if (otp.attempts >= 5) {
    await deleteOtp(email);
    return Response.json({ error: "Too many tries. Send a new code." }, { status: 400 });
  }
  if (!(await verifyPassword(code, otp.hash))) {
    await touchOtp(email, { attempts: otp.attempts + 1 });
    return Response.json({ error: "Wrong code." }, { status: 401 });
  }

  await deleteOtp(email);

  const existing = await findUserByEmail(email);
  if (existing) {
    const pub = await updateUser(existing.id, { emailVerified: true });
    await setSessionCookie(existing.id);
    await clearEmailTicket();
    return Response.json({ user: pub });
  }

  if (otp.name && otp.phone) {
    try {
      const created = await createUser({
        email,
        name: otp.name,
        phone: otp.phone,
        address: "",
        emailVerified: true,
      });
      await setSessionCookie(created.id);
      await clearEmailTicket();
      return Response.json({ user: created }, { status: 201 });
    } catch {
      return Response.json({ error: "Couldn’t open the house." }, { status: 500 });
    }
  }

  await setEmailTicket(email);
  return Response.json({ needsProfile: true, email });
}
