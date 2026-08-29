"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setErr("That’s not the key.");
      setBusy(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <p className="font-deva text-gold">अर्पण</p>
      <h1 className="font-display mt-2 text-5xl">Seller Central</h1>
      <p className="mt-3 text-ivory/55">
        Orders, stock, listings. Same house, back room.
      </p>
      <form onSubmit={onSubmit} className="mt-10 space-y-4">
        <label className="block text-sm text-ivory/70">
          Passkey
          <input
            name="password"
            type="password"
            required
            autoFocus
            className="mt-1 w-full border border-ivory/20 bg-ink px-3 py-3 text-ivory"
            placeholder="arpan108"
          />
        </label>
        {err && <p className="text-sm text-saffron">{err}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full bg-saffron py-3 text-[12px] tracking-[0.2em] uppercase text-ink"
        >
          {busy ? "Opening…" : "Enter the tray"}
        </button>
      </form>
    </main>
  );
}
