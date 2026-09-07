const steps = [
  ["01", "Blend", "Wood powder, dried flowers, halmaddi, Kannauj attar. No charcoal paste."],
  ["02", "Roll", "Each stick hand-rolled on bamboo in the Nashik lot."],
  ["03", "Dry", "Slow shade-dry so the masala sets. No oven shortcut."],
  ["04", "Pack", "Fresh-packed the same day we dispatch. Brass holder over ₹499."],
];

export function ProcessSteps() {
  return (
    <section className="border-t border-gold/20 bg-ink px-5 py-16 text-ivory">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] tracking-[0.28em] uppercase text-gold font-bold">
          Our process
        </p>
        <h2 className="font-display mt-2 max-w-2xl text-3xl leading-tight md:text-4xl">
          Slow, mindful, four steps — not a machine dip.
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([n, t, s]) => (
            <li key={n}>
              <p className="text-[11px] tracking-[0.22em] uppercase text-gold">{n}</p>
              <h3 className="font-display mt-2 text-2xl">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/65">{s}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
