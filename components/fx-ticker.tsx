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
        className="min-w-0 rounded border border-[var(--line)] bg-[var(--panel)] px-3 py-2"
        aria-label={title}
      >
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">{title}</p>
        <p className="fx-board truncate whitespace-nowrap font-mono text-[11px] leading-tight tracking-[0.08em] text-emeraldSignal">
          {rates.map((rate) => `EUR/${rate.code} ${rate.value}`).join(" | ")}
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
        className="min-w-0 rounded border border-[var(--line)] bg-[var(--panel)] px-3 py-2"
        aria-live="polite"
      >
        <p className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">{title}</p>
        <p className="fx-board truncate whitespace-nowrap font-mono text-[11px] leading-tight tracking-[0.08em] text-emeraldSignal">{unavailable}</p>
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
