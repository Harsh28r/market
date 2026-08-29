import type { ScentKey } from "@/lib/products";

const palettes: Record<
  ScentKey,
  { veil: string; stick: string; tip: string; smoke: string; glow: string }
> = {
  nagchampa: {
    veil: "from-[#2a120c] via-[#4a1c14] to-[#1a0a08]",
    stick: "#6b3a24",
    tip: "#f0c27a",
    smoke: "rgba(232,201,106,0.45)",
    glow: "#c45c26",
  },
  chandan: {
    veil: "from-[#24180c] via-[#5c3d18] to-[#120c08]",
    stick: "#c4a574",
    tip: "#f6e6c2",
    smoke: "rgba(212,160,23,0.4)",
    glow: "#d4a017",
  },
  rose: {
    veil: "from-[#2a1018] via-[#6b2438] to-[#14080c]",
    stick: "#8b3044",
    tip: "#f2c4c8",
    smoke: "rgba(196,123,123,0.5)",
    glow: "#c47b7b",
  },
  loban: {
    veil: "from-[#1c140c] via-[#6b3c14] to-[#0c0806]",
    stick: "#8b5a2b",
    tip: "#ffd89a",
    smoke: "rgba(196,92,38,0.45)",
    glow: "#e07a3a",
  },
  mogra: {
    veil: "from-[#12180e] via-[#2a3820] to-[#0a0c08]",
    stick: "#d8d0c0",
    tip: "#f7f2e6",
    smoke: "rgba(244,234,216,0.5)",
    glow: "#cfc6a8",
  },
  camphor: {
    veil: "from-[#101418] via-[#243040] to-[#080a0c]",
    stick: "#e8e4dc",
    tip: "#ffffff",
    smoke: "rgba(200,220,230,0.45)",
    glow: "#9ec4d4",
  },
  tulsi: {
    veil: "from-[#0c1810] via-[#1c3a24] to-[#08100a]",
    stick: "#3d6b45",
    tip: "#c4e0b8",
    smoke: "rgba(90,150,90,0.4)",
    glow: "#6a9a5a",
  },
  kewra: {
    veil: "from-[#1c1808] via-[#4a4010] to-[#100c06]",
    stick: "#b8a040",
    tip: "#f0e8a0",
    smoke: "rgba(212,200,80,0.4)",
    glow: "#c4b030",
  },
  festival: {
    veil: "from-[#2a0c10] via-[#6b1c18] to-[#120608]",
    stick: "#c45c26",
    tip: "#f4d78a",
    smoke: "rgba(212,160,23,0.5)",
    glow: "#d4a017",
  },
  nitya: {
    veil: "from-[#140c10] via-[#3a1820] to-[#0a0608]",
    stick: "#8b5a3c",
    tip: "#ead8b8",
    smoke: "rgba(232,201,106,0.4)",
    glow: "#e8c96a",
  },
};

export function ProductArt({
  scent,
  className = "",
}: {
  scent: ScentKey | string;
  className?: string;
}) {
  const p = palettes[(scent as ScentKey) in palettes ? (scent as ScentKey) : "nagchampa"];
  return (
    <div
      className={`grain relative overflow-hidden bg-linear-to-b ${p.veil} ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 opacity-50"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, ${p.glow}55, transparent 60%)`,
        }}
      />
      <div
        className="smoke-plume"
        style={{
          background: `linear-gradient(to top, ${p.smoke}, transparent)`,
          animationDelay: "0s",
        }}
      />
      <div
        className="smoke-plume"
        style={{
          background: `linear-gradient(to top, ${p.smoke}, transparent)`,
          left: "46%",
          animationDelay: "2.2s",
          animationDuration: "8.5s",
        }}
      />
      <div
        className="smoke-plume"
        style={{
          background: `linear-gradient(to top, ${p.smoke}, transparent)`,
          left: "54%",
          animationDelay: "4s",
          animationDuration: "6.8s",
          width: 18,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex h-[58%] items-end justify-center gap-3 pb-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative"
            style={{
              height: `${72 - i * 6}%`,
              transform: `rotate(${(i - 1) * 4}deg)`,
            }}
          >
            <div
              className="ember mx-auto mb-0.5 h-2 w-1.5 rounded-full"
              style={{
                background: p.glow,
                boxShadow: `0 0 10px ${p.glow}`,
              }}
            />
            <div
              className="w-[5px] rounded-full"
              style={{
                height: "100%",
                background: `linear-gradient(to bottom, ${p.tip}, ${p.stick} 18%, #2a1810)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
