export function Stars({ score, n }: { score: number; n: number }) {
  const full = Math.round(score);
  return (
    <p className="flex items-center gap-2 text-sm">
      <span className="text-saffron tracking-tight" aria-label={`${score} out of 5`}>
        {"★".repeat(Math.min(5, full))}
        {"☆".repeat(Math.max(0, 5 - full))}
      </span>
      <span className="font-medium">{score.toFixed(1)}</span>
      <span className="text-xs text-mist">({n})</span>
    </p>
  );
}
