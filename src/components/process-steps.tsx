const steps = [
  ["01", "Blend", "Wood powder, dried flowers, halmaddi, Kannauj attar. No charcoal paste."],
  ["02", "Roll", "Each stick hand-rolled on bamboo in the Nashik lot."],
  ["03", "Dry", "Slow shade-dry so the masala sets. No oven shortcut."],
  ["04", "Pack", "Fresh-packed the same day we dispatch. Brass holder over ₹499."],
];

export function ProcessSteps() {
  return (
    <section className="relative overflow-hidden border-t border-gold/20 bg-ink px-5 py-20 text-ivory">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px bg-linear-to-r from-transparent via-gold/40 to-transparent lg:block" />
      <div className="relative mx-auto max-w-6xl">
        <p className="kicker text-gold">Our process</p>
        <h2 className="font-display mt-2 max-w-2xl text-3xl leading-tight md:text-5xl">
          Four slow steps. Never a machine dip.
        </h2>
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, t, s]) => (
            <li key={n} className="relative">
              <p className="font-display text-5xl text-gold/30">{n}</p>
              <h3 className="font-display mt-2 text-2xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/65">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
