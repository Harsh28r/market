export function safeNext(raw: string | null | undefined) {
  if (!raw) return "/account";
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("://")) {
    return "/account";
  }
  return raw;
}

export function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validPhone(phone: string) {
  return /^\d{10}$/.test(phone.replace(/\D/g, "").slice(-10));
}
