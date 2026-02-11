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
        className="rounded border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1.5"
        aria-label={title}
      >
        <p className="fx-board whitespace-nowrap font-mono text-[11px] tracking-[0.08em] text-emeraldSignal">
          {rates.map((rate) => `EUR/${rate.code} ${rate.value}`).join(" | ")}
        </p>
        <p className="mt-0.5 whitespace-nowrap font-mono text-[10px] tracking-[0.05em] text-[var(--muted)]">
          {date ? `${label} ${date}` : label} | {fixedConversion}
        </p>
      </div>
    );
  } catch {
    return (
      <div
        className="rounded border border-[var(--line)] bg-[var(--panel)] px-2.5 py-1.5"
        aria-live="polite"
      >
        <p className="fx-board whitespace-nowrap font-mono text-[11px] tracking-[0.08em] text-emeraldSignal">{unavailable}</p>
        <p className="mt-0.5 whitespace-nowrap font-mono text-[10px] tracking-[0.05em] text-[var(--muted)]">
          {fixedConversion}
        </p>
      </div>
    );
  }
}
