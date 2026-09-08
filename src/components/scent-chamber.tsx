"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useLayoutEffect, useRef, type MouseEvent } from "react";
import { SmokeField, type SmokeTip, type SmokeTint } from "@/components/smoke-field";

const TINT: SmokeTint = { h: 40, s: 42, l: 82 };

const NOTES = [
  { hi: "चंदन", en: "Mysore sandal", href: "/product/mysore-chandan", tint: { h: 42, s: 52, l: 80 } },
  { hi: "गुलाब", en: "Kannauj rose", href: "/product/gulab-raj", tint: { h: -12, s: 46, l: 76 } },
  { hi: "ऊद", en: "Night oud", href: "/product/loban-resin", tint: { h: 24, s: 28, l: 58 } },
  { hi: "हल्मड्डी", en: "Halmaddi gum", href: "/product/nag-champa-aarti", tint: { h: 48, s: 38, l: 88 } },
] as const;

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

function Stick({ lean = 0, delay = "0s", desk = false }: { lean?: number; delay?: string; desk?: boolean }) {
  return (
    <div className={desk ? "agar agar-desk" : "agar"} style={{ transform: `rotate(${lean}deg)` }}>
      <span className="agar-char" />
      <div className="agar-head">
        <div className="agar-smoke" aria-hidden>
          <i style={{ animationDelay: delay }} />
          <i style={{ animationDelay: `calc(${delay} + 1.8s)` }} />
          <i style={{ animationDelay: `calc(${delay} + 3.4s)` }} />
        </div>
        <div className="agar-fire">
          <span className="agar-flame agar-flame-out" />
          <span className="agar-flame agar-flame-mid" />
          <span className="agar-flame agar-flame-in" />
        </div>
        <span className="agar-ember" />
        <span className="agar-ash" />
        <i className="agar-tip" />
      </div>
      <span className="agar-shaft" />
      <span className="agar-bamboo" />
    </div>
  );
}

export function ScentChamber() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const altar = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const wind = useRef({ x: 0, y: 0, gx: 0, gy: 0 });
  const tips = useRef<SmokeTip[]>([]);
  const tint = useRef<SmokeTint>({ ...TINT });
  const wx = useRef<(v: number) => void>(undefined);
  const wy = useRef<(v: number) => void>(undefined);

  useLayoutEffect(() => {
    const el = root.current;
    const a = altar.current;
    if (!el || !a) return;

    const measureTips = () => {
      const box = pin.current;
      if (!box) return;
      const cr = box.getBoundingClientRect();
      const next: SmokeTip[] = [];
      box.querySelectorAll<HTMLElement>(".agar-tip").forEach((n) => {
        const r = n.getBoundingClientRect();
        if (r.width === 0) return;
        next.push({ x: r.left - cr.left + r.width / 2, y: r.top - cr.top });
      });
      tips.current = next;
    };

    const lit = () => {
      gsap.set(".agar-fire", { opacity: 0, scaleY: 0 });
      gsap.set(".agar-ember", { opacity: 1, scale: 1 });
      gsap.set(".agar-ash", { opacity: 1, scale: 1 });
      gsap.set(".agar-char", { scaleY: 1 });
      gsap.set(".agar-head", { top: "16%" });
      gsap.set(".agar-smoke, .ritual-smoke", { opacity: 1 });
      gsap.set(".scent-haze", { opacity: 0.72 });
      gsap.set(".ritual-a, .ritual-b", { opacity: 0 });
      gsap.set(".ritual-c, .scent-title .swap, .scent-proverb, .scent-notes li", { opacity: 1 });
      measureTips();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      lit();
      return;
    }

    gsap.config({ force3D: true, nullTargetWarn: false });

    const proxy = { x: 0, y: 0 };
    wx.current = gsap.quickTo(proxy, "x", {
      duration: 0.9,
      ease: "power3.out",
      onUpdate: () => {
        wind.current.x = proxy.x;
      },
    });
    wy.current = gsap.quickTo(proxy, "y", {
      duration: 0.9,
      ease: "power3.out",
      onUpdate: () => {
        wind.current.y = proxy.y;
      },
    });

    const ctx = gsap.context(() => {
      gsap.set(".agar-fire", {
        xPercent: -50,
        scaleY: 0,
        opacity: 0,
        x: 0,
        skewX: 0,
        transformOrigin: "50% 100%",
      });
      gsap.set(".agar-ember", { opacity: 0, scale: 0.4 });
      gsap.set(".agar-ash", { opacity: 0, scale: 0.6 });
      gsap.set(".agar-char", { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(".agar-head", { top: "6%" });
      gsap.set(".agar-smoke", { opacity: 0 });
      gsap.set(".ritual-smoke", { opacity: 0 });
      gsap.set(".ritual-b, .ritual-c", { opacity: 0 });

      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => (window.matchMedia("(max-width: 767px)").matches ? "+=140%" : "+=220%"),
          pin: true,
          scrub: 1.15,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: measureTips,
        },
      })
        .fromTo(".scent-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0 }, 0)
        .fromTo(a, { y: 20, opacity: 0.7 }, { y: 0, opacity: 1 }, 0)
        .to(".agar-fire", { scaleY: 1.15, opacity: 1, x: 0, skewX: 0 }, 0.12)
        .to(".agar-ember", { opacity: 1, scale: 1 }, 0.14)
        .to(".altar-glow", { opacity: 1 }, 0.14)
        .to(".agar-fire", { scaleY: 1 }, 0.28)
        .to(".ritual-a", { opacity: 0 }, 0.32)
        .to(".ritual-b", { opacity: 1 }, 0.32)
        .to(".agar-fire", { skewX: 18, x: 11, scaleY: 1.08 }, 0.38)
        .to(wind.current, { gx: 1.35, gy: -0.28 }, 0.38)
        .to(".agar-fire", { skewX: -12, x: -7, scaleY: 0.72 }, 0.43)
        .to(".agar-fire", { scaleY: 0.02, opacity: 0, skewX: 24, x: 16 }, 0.48)
        .to(".agar-ash", { opacity: 1, scale: 1 }, 0.48)
        .to(".altar-glow", { opacity: 0.42 }, 0.48)
        .to(".ritual-b", { opacity: 0 }, 0.52)
        .to(".ritual-c", { opacity: 1 }, 0.52)
        .to(wind.current, { gx: 0, gy: 0 }, 0.54)
        .to(".agar-smoke", { opacity: 1 }, 0.54)
        .to(".ritual-smoke", { opacity: 1 }, 0.54)
        .to(".agar-head", { top: "16%" }, 0.54)
        .to(".agar-char", { scaleY: 1 }, 0.54)
        .to(".scent-haze", { opacity: 0.72 }, 0.56)
        .fromTo(".scent-notes li", { opacity: 0, x: 14 }, { opacity: 1, x: 0, stagger: 0.04 }, 0.62)
        .fromTo(".scent-title .swap", { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, 0.68)
        .fromTo(".scent-proverb", { opacity: 0, y: 8 }, { opacity: 1, y: 0 }, 0.7)
        .to(".scent-hint", { opacity: 0.2 }, 0.82)
        .fromTo(".scent-bar i", { scaleX: 0 }, { scaleX: 1 }, 0);

      measureTips();
    }, el);

    window.addEventListener("resize", measureTips);
    return () => {
      window.removeEventListener("resize", measureTips);
      ctx.revert();
    };
  }, []);

  function onMove(e: MouseEvent<HTMLElement>) {
    if (!wx.current || !wy.current) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    wx.current(x);
    wy.current(y);
    const node = inner.current;
    if (node) node.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -5}deg)`;
  }

  return (
    <section ref={root} onMouseMove={onMove} className="scent-chamber grain">
      <div ref={pin} className="scent-pin">
        <div className="scent-letterbox scent-letterbox-top" />
        <div className="scent-letterbox scent-letterbox-bot" />
        <p className="scent-mark" aria-hidden>
          <span className="font-display">ARPAN</span>
          <span className="font-deva">धूप</span>
        </p>
        <div className="scent-haze" />
        <div className="ritual-smoke">
          <SmokeField origin="altar" count={64} windRef={wind} tipsRef={tips} tintRef={tint} />
        </div>

        <div className="scent-layout">
          <div className="scent-copy">
            <p className="kicker text-gold">How you light it</p>
            <h2 className="scent-title font-display">
              Hold. Light.
              <span className="block text-gold">Blow. Breathe.</span>
              <span className="swap font-deva">यह महक है मंदिर की।</span>
            </h2>
            <span className="scent-line" />
            <div className="ritual-copy">
              <p className="ritual-line ritual-a">The tip catches fire.</p>
              <p className="ritual-line ritual-b">Blow the flame. Keep the ember.</p>
              <p className="ritual-line ritual-c">Now the cream smoke climbs.</p>
            </div>
            <blockquote className="scent-proverb">
              <p className="font-deva">
                <span className="shloka-desk">वनस्पतिरसोद्भूतो गन्धाढ्यो गन्ध उत्तमः।</span>
                आघ्रेयः सर्वदेवानां धूपोऽयं प्रतिगृह्यताम्॥
              </p>
              <cite>Born of forest sap. Foremost of fragrances. Accept this incense.</cite>
            </blockquote>
            <ul className="scent-notes">
              {NOTES.map((n) => (
                <li key={n.en}>
                  <Link
                    href={n.href}
                    onMouseEnter={() => {
                      tint.current = n.tint;
                    }}
                    onMouseLeave={() => {
                      tint.current = { ...TINT };
                    }}
                  >
                    <b className="font-deva">{n.hi}</b>
                    <span>{n.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div ref={altar} className="scent-altar">
            <div ref={inner} className="scent-altar-inner">
              <div className="altar-glow" />
              <Stick lean={-7} delay="0s" />
              <Stick lean={8} delay="1.2s" desk />
            </div>
          </div>
        </div>

        <div className="scent-bar" aria-hidden>
          <i />
        </div>
        <p className="scent-hint">Scroll · watch it light</p>
      </div>
    </section>
  );
}
