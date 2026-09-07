import nodemailer from "nodemailer";
import { EMAIL } from "@/lib/site";

function html(code: string) {
  return `<!doctype html>
<html>
<body style="margin:0;background:#fbf6ec;font-family:Georgia,serif;color:#12070a">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
    <tr><td align="center">
      <table width="440" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e8c96a;padding:32px">
        <tr><td style="font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#c45c26">ARPAN</td></tr>
        <tr><td style="padding-top:12px;font-size:28px">Your login code</td></tr>
        <tr><td style="padding-top:20px;font-size:36px;letter-spacing:.24em;font-weight:700">${code}</td></tr>
        <tr><td style="padding-top:16px;font-size:14px;color:#8b7e74;line-height:1.5">
          Valid 10 minutes. If you didn’t ask for this, ignore the mail — nobody gets in without the code.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export type MailResult = { via: "gmail" | "resend" | "smtp" };

function smtpUser() {
  return (process.env.GMAIL_USER || process.env.ARPAN_SMTP_USER || "").trim();
}

function smtpPass() {
  return (process.env.GMAIL_APP_PASSWORD || process.env.ARPAN_SMTP_PASS || "").replace(/\s/g, "");
}

export function mailConfigured() {
  if (process.env.RESEND_API_KEY) return true;
  return Boolean(smtpUser() && smtpPass());
}

async function sendViaGmailOrSmtp(to: string, code: string): Promise<MailResult> {
  const user = smtpUser();
  const pass = smtpPass();
  if (!user || !pass) {
    throw new Error("missing smtp");
  }

  const host = process.env.ARPAN_SMTP_HOST || "smtp.gmail.com";
  const gmail = /gmail\.com$/i.test(host) || /@gmail\.com$/i.test(user);
  const port = Number(process.env.ARPAN_SMTP_PORT || 587);
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
  });

  const from =
    process.env.ARPAN_MAIL_FROM || `ARPAN Dhupa <${user}>`;
  await transporter.sendMail({
    from,
    to,
    replyTo: EMAIL,
    subject: `${code} is your ARPAN login code`,
    text: `Your ARPAN login code is ${code}. Valid 10 minutes.`,
    html: html(code),
  });
  return { via: gmail ? "gmail" : "smtp" };
}

async function sendViaResend(to: string, code: string): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("missing resend");
  const from =
    process.env.ARPAN_MAIL_FROM || "ARPAN <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: `${code} is your ARPAN login code`,
      html: html(code),
      text: `Your ARPAN login code is ${code}. Valid 10 minutes.`,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
  return { via: "resend" };
}

export async function sendOtpMail(to: string, code: string): Promise<MailResult> {
  const errors: string[] = [];

  if (process.env.RESEND_API_KEY) {
    try {
      return await sendViaResend(to, code);
    } catch (e) {
      errors.push(e instanceof Error ? e.message : "resend failed");
    }
  }

  if (smtpUser() && smtpPass()) {
    try {
      return await sendViaGmailOrSmtp(to, code);
    } catch (e) {
      errors.push(e instanceof Error ? e.message : "smtp failed");
    }
  }

  throw new Error(
    errors[0] ||
      "Gmail not set. Add GMAIL_USER and GMAIL_APP_PASSWORD in Vercel → Settings → Environment Variables, then Redeploy.",
  );
}
