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
      <div className="font-mono text-[11px] leading-relaxed text-[var(--muted)]">
        <p className="mb-0.5 uppercase tracking-[0.14em]">{title}</p>
        <p>{rates.map((rate) => `EUR/${rate.code} ${rate.value}`).join("  |  ")}</p>
        <p>{label}{date ? ` · ${date}` : ""}</p>
        <p>{fixedConversion}</p>
      </div>
    );
  } catch {
    return (
      <div className="font-mono text-[11px] leading-relaxed text-[var(--muted)]" aria-live="polite">
        <p>{title}</p>
        <p>{unavailable}</p>
        <p>{fixedConversion}</p>
      </div>
    );
  }
}
