type RawQuote = {
  symbol?: string;
  lastPrice?: number | string;
  netChange?: number | string;
  percentChange?: number | string;
  tradeTime?: string;
  tradeTimestamp?: string;
  quoteTime?: string;
  serverTimestamp?: string;
  timestamp?: string;
};

type BarchartResponse = {
  status?: { code?: number | string };
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
    const parsed = Number(value.replaceAll(",", ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function matchSymbol(input: string | undefined, symbol: string): boolean {
  if (!input) return false;
  return input === symbol || input.endsWith(`.${symbol}`) || input.endsWith(symbol);
}

function hasAnyQuoteValue(quotes: FuturesQuote[]): boolean {
  return quotes.some((quote) => quote.lastPrice !== null || quote.netChange !== null || quote.percentChange !== null);
}

async function fetchQuotes(url: string): Promise<BarchartResponse | null> {
  try {
    const response = await fetch(url, { next: { revalidate: 86400 } });
    if (!response.ok) return null;
    return (await response.json()) as BarchartResponse;
  } catch {
    return null;
  }
}

export async function getFuturesQuotes(): Promise<FuturesQuote[] | null> {
  const apiKey =
    process.env.BARCHART_API_KEY ??
    process.env.BARCHART_APIKEY ??
    process.env.BARCHART_ONDEMAND_API_KEY ??
    process.env.NEXT_PUBLIC_BARCHART_API_KEY;

  if (!apiKey) return null;

  const baseParams = new URLSearchParams({
    apikey: apiKey,
    symbols: SYMBOLS.join(",")
  });

  const paramsWithFields = new URLSearchParams(baseParams);
  paramsWithFields.set("fields", "lastPrice,netChange,percentChange,tradeTimestamp,timestamp");

  const withFieldsUrl = `https://ondemand.websol.barchart.com/getQuote.json?${paramsWithFields.toString()}`;
  const plainUrl = `https://ondemand.websol.barchart.com/getQuote.json?${baseParams.toString()}`;

  const json = (await fetchQuotes(withFieldsUrl)) ?? (await fetchQuotes(plainUrl));
  if (!json) return null;

  const rows = Array.isArray(json.results) ? json.results : [];
  const normalized = SYMBOLS.map((symbol) => {
    const row = rows.find((item) => matchSymbol(item.symbol, symbol));
    const cfg = SYMBOL_CONFIG[symbol];

    return {
      symbol,
      commodityKey: cfg.commodityKey,
      contractLabel: cfg.contractLabel,
      lastPrice: toNumber(row?.lastPrice),
      netChange: toNumber(row?.netChange),
      percentChange: toNumber(row?.percentChange),
      updatedAt: row?.tradeTimestamp ?? row?.tradeTime ?? row?.quoteTime ?? row?.timestamp ?? row?.serverTimestamp ?? null
    } satisfies FuturesQuote;
  });

  if (!hasAnyQuoteValue(normalized)) return null;
  return normalized;
}
