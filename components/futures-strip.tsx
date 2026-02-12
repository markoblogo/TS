import { getFuturesQuotes } from "@/lib/barchart";

type FuturesCopy = {
  title: string;
  updatedDaily: string;
  unavailable: string;
  commodities: { corn: string; wheat: string; soybeans: string };
};

type Props = {
  copy: FuturesCopy;
};

function formatNumber(value: number | null, digits = 2): string {
  if (value === null || Number.isNaN(value)) return "—";
  return value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

function formatChange(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}`;
}

function formatPercent(value: number | null): string {
  if (value === null || Number.isNaN(value)) return "—";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export async function FuturesStrip({ copy }: Props) {
  const quotes = await getFuturesQuotes();
  if (!quotes) {
    return (
      <section className="rounded-lg border bg-[var(--panel)] px-3 py-2 text-xs text-[var(--muted)] md:px-4" aria-live="polite">
        <p>{copy.unavailable}</p>
      </section>
    );
  }

  const updatedAt = quotes.find((quote) => quote.updatedAt)?.updatedAt ?? null;
  const dateLabel = updatedAt ? new Date(updatedAt).toLocaleDateString("en-CA") : null;

  return (
    <section className="rounded-lg border bg-[var(--panel)] px-3 py-2.5 shadow-[0_6px_18px_rgba(13,18,26,0.06)] md:px-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote) => {
          const net = quote.netChange ?? 0;
          const tone = net > 0 ? "text-emerald-600 dark:text-emerald-400" : net < 0 ? "text-rose-600 dark:text-rose-400" : "text-[var(--muted)]";
          const commodity = copy.commodities[quote.commodityKey];

          return (
            <article key={quote.symbol} className="rounded-md border border-[var(--line)] bg-[color:color-mix(in_oklab,var(--panel)_92%,transparent)] px-2.5 py-2">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium">{commodity}</p>
                <p className="text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">{quote.contractLabel}</p>
              </div>
              <p className="mt-1.5 font-mono text-sm">{formatNumber(quote.lastPrice)}</p>
              <p className={`mt-0.5 font-mono text-xs ${tone}`}>{`${formatChange(quote.netChange)} (${formatPercent(quote.percentChange)})`}</p>
            </article>
          );
        })}
      </div>
      <p className="mt-2 text-[10px] text-[var(--muted)]">
        {copy.updatedDaily}
        {dateLabel ? ` · ${dateLabel}` : ""}
      </p>
    </section>
  );
}
