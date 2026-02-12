type RawQuote = {
  symbol?: string;
  lastPrice?: number | string;
  netChange?: number | string;
  percentChange?: number | string;
  tradeTimestamp?: string;
  timestamp?: string;
};

type BarchartResponse = {
  status?: { code?: number };
  results?: RawQuote[];
};

export type FuturesQuote = {
  symbol: string;
  commodityKey: "corn" | "wheat" | "soybeans";
  contractLabel: string;
  lastPrice: number | null;
  netChange: number | null;
  percentChange: number | null;
  updatedAt: string | null;
};

const SYMBOL_CONFIG: Record<string, { commodityKey: FuturesQuote["commodityKey"]; contractLabel: string }> = {
  ZCH26: { commodityKey: "corn", contractLabel: "Mar '26" },
  ZWH26: { commodityKey: "wheat", contractLabel: "Mar '26" },
  ZSH26: { commodityKey: "soybeans", contractLabel: "Mar '26" }
};

const SYMBOLS = Object.keys(SYMBOL_CONFIG);

function toNumber(value: number | string | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export async function getFuturesQuotes(): Promise<FuturesQuote[] | null> {
  const apiKey = process.env.BARCHART_API_KEY;
  if (!apiKey) return null;

  const params = new URLSearchParams({
    apikey: apiKey,
    symbols: SYMBOLS.join(","),
    fields: "lastPrice,netChange,percentChange,tradeTimestamp,timestamp"
  });

  try {
    const response = await fetch(`https://ondemand.websol.barchart.com/getQuote.json?${params.toString()}`, {
      next: { revalidate: 86400 }
    });

    if (!response.ok) return null;

    const json = (await response.json()) as BarchartResponse;
    const rows = Array.isArray(json.results) ? json.results : [];

    const normalized = SYMBOLS.map((symbol) => {
      const row = rows.find((item) => item.symbol === symbol);
      const cfg = SYMBOL_CONFIG[symbol];

      return {
        symbol,
        commodityKey: cfg.commodityKey,
        contractLabel: cfg.contractLabel,
        lastPrice: toNumber(row?.lastPrice),
        netChange: toNumber(row?.netChange),
        percentChange: toNumber(row?.percentChange),
        updatedAt: row?.tradeTimestamp ?? row?.timestamp ?? null
      } satisfies FuturesQuote;
    });

    return normalized;
  } catch {
    return null;
  }
}
