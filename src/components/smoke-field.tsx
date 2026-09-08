"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  life: number;
  hue: number;
  s: number;
  l: number;
};

export type SmokeTip = { x: number; y: number };
export type SmokeTint = { h: number; s: number; l: number };

export function SmokeField({
  className = "",
  count = 42,
  origin = "center",
  windRef,
  tipsRef,
  tintRef,
}: {
  className?: string;
  count?: number;
  origin?: "center" | "right" | "stick" | "altar";
  windRef?: { current: { x: number; y: number; gx?: number; gy?: number } };
  tipsRef?: { current: SmokeTip[] };
  tintRef?: { current: SmokeTint };
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gfx = node.getContext("2d", { alpha: true });
    if (!gfx) return;
    const canvas: HTMLCanvasElement = node;
    const ctx: CanvasRenderingContext2D = gfx;

    let w = 0;
    let h = 0;
    let raf = 0;
    let alive = false;
    let snapped = false;
    const particles: Particle[] = [];
    const n = window.innerWidth < 768 ? Math.min(22, count) : count;

    function ox() {
      if (origin === "right") return w * 0.72;
      if (origin === "stick") return w * 0.78;
      if (origin === "altar") return Math.random() > 0.5 ? w * 0.56 : w * 0.7;
      return w * 0.5;
    }

    function spawn(reset = false): Particle {
      const wind = windRef?.current;
      const tips = tipsRef?.current;
      const tint = tintRef?.current;
      const tip = tips?.length ? tips[Math.floor(Math.random() * tips.length)] : null;
      const fromTip = origin === "altar" && tip;
      return {
        x: fromTip
          ? tip.x + (Math.random() - 0.5) * 12
          : ox() + (Math.random() - 0.5) * (origin === "altar" ? w * 0.04 : w * 0.22),
        y: fromTip
          ? tip.y + (Math.random() - 0.5) * 10
          : origin === "altar"
            ? h * 0.28 + Math.random() * 24
            : reset
              ? h * (0.62 + Math.random() * 0.28)
              : h * (0.5 + Math.random() * 0.45),
        r: origin === "altar" ? 14 + Math.random() * 38 : 10 + Math.random() * 32,
        vy: -0.22 - Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.22 + (wind?.x ?? 0) * 0.15,
        a: 0.04 + Math.random() * 0.08,
        life: Math.random() * Math.PI * 2,
        hue: tint?.h ?? (Math.random() > 0.65 ? 44 : 28),
        s: tint?.s ?? 55,
        l: tint?.l ?? 82,
      };
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick() {
      if (!alive) return;
      const tint = tintRef?.current;
      if (!snapped && origin === "altar" && (tipsRef?.current.length ?? 0) > 0) {
        snapped = true;
        for (const p of particles) Object.assign(p, spawn(true));
      }
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.life += 0.012;
        const wx = (windRef?.current.x ?? 0) + (windRef?.current.gx ?? 0);
        const wy = (windRef?.current.y ?? 0) + (windRef?.current.gy ?? 0);
        p.x += p.vx + Math.sin(p.life) * 0.18 + wx * 0.35;
        p.y += p.vy + wy * 0.12;
        p.a *= 0.9965;
        p.r *= 1.0018;
        if (tint) {
          p.hue += (tint.h - p.hue) * 0.05;
          p.s += (tint.s - p.s) * 0.05;
          p.l += (tint.l - p.l) * 0.05;
        }
        if (p.y < -50 || p.a < 0.008) Object.assign(p, spawn(true));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, `hsla(${p.hue}, ${p.s}%, ${p.l}%, ${p.a})`);
        g.addColorStop(0.45, `hsla(${p.hue}, ${p.s * 0.55}%, ${p.l * 0.85}%, ${p.a * 0.35})`);
        g.addColorStop(1, `hsla(${p.hue}, ${p.s * 0.35}%, 40%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    for (let i = 0; i < n; i++) particles.push(spawn());

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!alive) {
            alive = true;
            raf = requestAnimationFrame(tick);
          }
        } else {
          alive = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.04 },
    );
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count, origin]);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
