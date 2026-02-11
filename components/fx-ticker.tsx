import { getEcbRates } from "@/lib/ecb";

type Props = {
  title: string;
  label: string;
  fixedConversion: string;
  unavailable: string;
  pairs: string[];
};

export async function FxTicker({ title, label, fixedConversion, unavailable, pairs }: Props) {
  try {
    const currencies = pairs
      .map((pair) => pair.replace("EUR", ""))
      .filter((currency) => currency.length === 3);
    const { rates, date } = await getEcbRates(currencies);

    return (
      <div
        className="relative min-w-0 overflow-hidden rounded-lg border border-black/10 bg-white/80 px-3 py-2 shadow-[0_8px_24px_rgba(16,20,28,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-black/45"
        aria-label={title}
      >
        <span className="fx-sheen pointer-events-none absolute inset-0" aria-hidden="true" />
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">{title}</p>
        <p className="max-w-full truncate whitespace-nowrap font-mono text-[11px] leading-tight tracking-[0.08em]">
          {rates.map((rate, idx) => (
            <span key={rate.code}>
              <span className="text-[var(--fg)]">{`EUR/${rate.code}`}</span>{" "}
              <span className="text-emeraldSignal">{rate.value}</span>
              {idx < rates.length - 1 ? <span className="text-[var(--muted)]"> | </span> : null}
            </span>
          ))}
        </p>
        <p className="mt-0.5 truncate whitespace-nowrap font-mono text-[10px] leading-tight tracking-[0.05em] text-[var(--muted)]">
          {date ? `${label} · ${date}` : label}
        </p>
        <p className="mt-0.5 truncate whitespace-nowrap font-mono text-[10px] leading-tight tracking-[0.05em] text-[var(--muted)]">
          {fixedConversion}
        </p>
      </div>
    );
  } catch {
    return (
      <div
        className="relative min-w-0 overflow-hidden rounded-lg border border-black/10 bg-white/80 px-3 py-2 shadow-[0_8px_24px_rgba(16,20,28,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-black/45"
        aria-live="polite"
      >
        <span className="fx-sheen pointer-events-none absolute inset-0" aria-hidden="true" />
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">{title}</p>
        <p className="max-w-full truncate whitespace-nowrap font-mono text-[11px] leading-tight tracking-[0.08em] text-emeraldSignal">{unavailable}</p>
        <p className="mt-0.5 truncate whitespace-nowrap font-mono text-[10px] leading-tight tracking-[0.05em] text-[var(--muted)]">
          {label}
        </p>
        <p className="mt-0.5 truncate whitespace-nowrap font-mono text-[10px] leading-tight tracking-[0.05em] text-[var(--muted)]">
          {fixedConversion}
        </p>
      </div>
    );
  }
}
