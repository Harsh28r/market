"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useAuth } from "@/context/auth";
import { safeNext } from "@/lib/auth-shared";

type Mode = "login" | "signup";
type Step = "email" | "otp" | "profile";

export function OtpAuth({ mode, next }: { mode: Mode; next: string }) {
  const router = useRouter();
  const { refresh, user, ready } = useAuth();
  const dest = safeNext(next);
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [collectSignup, setCollectSignup] = useState(mode === "signup");

  useEffect(() => {
    if (ready && user) router.replace(dest);
  }, [ready, user, dest, router]);

  async function sendCode(e?: FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        ...(collectSignup ? { name, phone } : {}),
      }),
    });
    const data = (await res.json()) as {
      error?: string;
      needsSignup?: boolean;
    };
    if (!res.ok) {
      if (data.needsSignup) {
        setCollectSignup(true);
        setErr("New email — name + phone, then we mail the code.");
      } else {
        setErr(data.error ?? "Couldn’t send the code.");
      }
      setBusy(false);
      return;
    }
    setStep("otp");
    setBusy(false);
  }

  async function verifyCode(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = (await res.json()) as {
      error?: string;
      needsProfile?: boolean;
    };
    if (!res.ok) {
      setErr(data.error ?? "Couldn’t verify.");
      setBusy(false);
      return;
    }
    if (data.needsProfile) {
      setStep("profile");
      setBusy(false);
      return;
    }
    await refresh();
    router.push(dest);
    router.refresh();
  }

  async function saveProfile(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const res = await fetch("/api/auth/otp/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setErr(data.error ?? "Couldn’t save.");
      setBusy(false);
      return;
    }
    await refresh();
    router.push(dest);
    router.refresh();
  }

  const title =
    mode === "signup"
      ? "Create house"
      : dest === "/checkout"
        ? "Verify to checkout"
        : "Sign in";

  return (
    <main className="mx-auto w-full max-w-md px-5 py-16">
      <p className="text-[11px] tracking-[0.28em] uppercase text-ember">Account</p>
      <h1 className="font-display mt-2 text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-mist">
        6-digit code to your email. No password. Orders only after the mail checks out.
      </p>

      {step === "email" && (
        <form onSubmit={(e) => void sendCode(e)} className="mt-10 space-y-4">
          {collectSignup && (
            <>
              <label className="block text-sm">
                Name
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
                  placeholder="As on the doorbell"
                />
              </label>
              <label className="block text-sm">
                Phone
                <input
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  autoComplete="tel"
                  className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
                  placeholder="10-digit WhatsApp"
                />
              </label>
            </>
          )}
          <label className="block text-sm">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
              placeholder="you@email.com"
            />
          </label>
          {err && <p className="text-sm text-ember">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-ink py-3.5 text-[12px] tracking-[0.2em] uppercase text-ivory disabled:opacity-50"
          >
            {busy ? "Sending…" : "Mail me a code"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={(e) => void verifyCode(e)} className="mt-10 space-y-4">
          <p className="text-sm text-mist">
            Code mailed to <span className="text-ink">{email}</span>. Check spam if it’s slow.
          </p>
          <label className="block text-sm">
            6-digit code
            <input
              required
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{6}"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5 tracking-[0.4em] text-center text-xl"
              placeholder="••••••"
            />
          </label>
          {err && <p className="text-sm text-ember">{err}</p>}
          <button
            type="submit"
            disabled={busy || code.length !== 6}
            className="w-full bg-ink py-3.5 text-[12px] tracking-[0.2em] uppercase text-ivory disabled:opacity-50"
          >
            {busy ? "Checking…" : "Verify"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void sendCode()}
            className="w-full text-[11px] tracking-[0.14em] uppercase text-mist hover:text-ember"
          >
            Resend code
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setErr("");
            }}
            className="w-full text-[11px] tracking-[0.14em] uppercase text-mist hover:text-ember"
          >
            Change email
          </button>
        </form>
      )}

      {step === "profile" && (
        <form onSubmit={(e) => void saveProfile(e)} className="mt-10 space-y-4">
          <p className="text-sm text-mist">{email} is verified. Name + phone to finish.</p>
          <label className="block text-sm">
            Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
            />
          </label>
          <label className="block text-sm">
            Phone
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full border border-ink/15 bg-white px-3 py-2.5"
            />
          </label>
          {err && <p className="text-sm text-ember">{err}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-ink py-3.5 text-[12px] tracking-[0.2em] uppercase text-ivory disabled:opacity-50"
          >
            {busy ? "Saving…" : "Enter"}
          </button>
        </form>
      )}

      <p className="mt-6 text-sm text-mist">
        {mode === "signup" ? (
          <>
            Already in?{" "}
            <Link href={`/login?next=${encodeURIComponent(dest)}`} className="text-ember underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href={`/signup?next=${encodeURIComponent(dest)}`} className="text-ember underline">
              Create an account
            </Link>
          </>
        )}
      </p>
    </main>
  );
}
