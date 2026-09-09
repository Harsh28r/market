export function IncenseStick({ className = "" }: { className?: string }) {
  return (
    <div className={`incense-rig pointer-events-none select-none ${className}`} aria-hidden>
      <div className="hero-heat" />
      <div className="smoke-plume bg-ivory/40" style={{ animationDelay: "0s", left: "50%" }} />
      <div className="smoke-plume bg-gold/35" style={{ animationDelay: "2.2s", left: "46%", width: 22, height: 150 }} />
      <div className="smoke-plume bg-ivory/25" style={{ animationDelay: "4s", left: "54%", width: 18, height: 120 }} />
      <div className="hero-fire">
        <span className="hero-flame hero-flame-out" />
        <span className="hero-flame hero-flame-mid" />
        <span className="hero-flame hero-flame-in" />
      </div>
      <div className="ember incense-ember" />
      <div className="incense-shaft" />
      <div className="incense-holder" />
    </div>
  );
}
