const NOTES = [
  "नाग चंपा",
  "Nag Champa",
  "चंदन",
  "Mysore sandal",
  "गुलाब",
  "Kannauj rose",
  "लोबान",
  "Loban resin",
  "मोगरा",
  "Night jasmine",
  "हल्मड्डी",
  "Halmaddi",
  "तुलसी",
  "Tulsi",
  "केवड़ा",
  "Kewra",
];

export function ScentMarquee() {
  const line = [...NOTES, ...NOTES];
  return (
    <div className="scent-marquee" aria-hidden>
      <div className="scent-marquee-track">
        {line.map((n, i) => (
          <span key={`${n}-${i}`}>
            {n}
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}
