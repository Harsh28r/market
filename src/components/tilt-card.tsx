"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export function TiltCard({
  children,
  className = "",
  max = 4,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const inner = useRef<HTMLDivElement>(null);

  function move(e: MouseEvent<HTMLDivElement>) {
    const el = inner.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  }

  function leave() {
    const el = inner.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
  }

  return (
    <div className="[perspective:1100px]" onMouseMove={move} onMouseLeave={leave}>
      <div
        ref={inner}
        className={`group/tilt relative transform-gpu transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
