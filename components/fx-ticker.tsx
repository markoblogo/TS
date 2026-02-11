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
        className="fx-board rounded border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 font-mono text-[11px] text-[var(--fg)]"
        aria-label={title}
      >
        <p className="whitespace-nowrap tracking-[0.08em]">
          {rates.map((rate) => `EUR/${rate.code} ${rate.value}`).join(" | ")} | {label}
          {date ? ` ${date}` : ""} | {fixedConversion}
        </p>
      </div>
    );
  } catch {
    return (
      <div
        className="fx-board rounded border border-[var(--line)] bg-[var(--panel)] px-3 py-1.5 font-mono text-[11px] text-[var(--fg)]"
        aria-live="polite"
      >
        <p className="whitespace-nowrap tracking-[0.08em]">{unavailable} | {fixedConversion}</p>
      </div>
    );
  }
}
