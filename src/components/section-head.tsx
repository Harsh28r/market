import { LotusRule } from "@/components/ornament";

export function SectionHead({
  kicker,
  title,
  sub,
  light = false,
  action,
}: {
  kicker: string;
  title: string;
  sub?: string;
  light?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 ${light ? "text-ivory" : ""}`}>
      <div className="max-w-2xl">
        <p className={`kicker ${light ? "text-gold" : "text-ember"}`}>{kicker}</p>
        <h2 className="font-display mt-2 text-3xl leading-[1.05] sm:text-4xl md:text-5xl">{title}</h2>
        {sub && (
          <p className={`mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${light ? "text-ivory/65" : "text-mist"}`}>
            {sub}
          </p>
        )}
        <LotusRule className="mt-5 max-w-40" />
      </div>
      {action}
    </div>
  );
}
