import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { getFuturesQuotes, type FuturesQuote } from "@/lib/barchart";

export type FuturesDataSource = "barchart_api" | "barchart_scrape" | "unavailable";

export type FuturesDataItem = FuturesQuote;

export type FuturesDataResult = {
  items: FuturesDataItem[];
  updatedAt?: string;
  source: FuturesDataSource;
};

type ScrapedFile = {
  updatedAt?: string;
  source?: string;
  items?: Array<{
    symbol?: string;
    name?: string;
    month?: string;
    last?: number | string | null;
    change?: number | string | null;
    percent?: number | string | null;
    updatedAt?: string;
  }>;
};

const COMMODITY_BY_SYMBOL: Record<string, FuturesDataItem["commodityKey"]> = {
  ZCH26: "corn",
  ZWH26: "wheat",
  ZSH26: "soybeans"
};

const FALLBACK_CONTRACT_LABEL = "Mar '26";

function hasApiKey(): boolean {
  return Boolean(
    process.env.BARCHART_API_KEY ??
      process.env.BARCHART_APIKEY ??
      process.env.BARCHART_ONDEMAND_API_KEY ??
      process.env.NEXT_PUBLIC_BARCHART_API_KEY
  );
}

function toNumber(value: number | string | null | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const normalized = value.replaceAll(",", "").replaceAll("%", "").trim();
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function normalizeCommodity(symbol: string | undefined, name: string | undefined): FuturesDataItem["commodityKey"] | null {
  if (symbol && symbol in COMMODITY_BY_SYMBOL) {
    return COMMODITY_BY_SYMBOL[symbol];
  }

  const normalized = name?.toLowerCase() ?? "";
  if (normalized.includes("corn") || normalized.includes("царев")) return "corn";
  if (normalized.includes("wheat") || normalized.includes("пшени")) return "wheat";
  if (normalized.includes("soy")) return "soybeans";

  return null;
}

function normalizeScrapedItems(raw: ScrapedFile): FuturesDataItem[] {
  const items = Array.isArray(raw.items) ? raw.items : [];

  return items
    .map((item) => {
      const symbol = item.symbol?.trim();
      const commodityKey = normalizeCommodity(symbol, item.name);
      if (!symbol || !commodityKey) return null;

      return {
        symbol,
        commodityKey,
        contractLabel: item.month?.trim() || FALLBACK_CONTRACT_LABEL,
        lastPrice: toNumber(item.last),
        netChange: toNumber(item.change),
        percentChange: toNumber(item.percent),
        updatedAt: item.updatedAt ?? raw.updatedAt ?? null
      } satisfies FuturesDataItem;
    })
    .filter((item): item is FuturesDataItem => item !== null);
}

async function readScrapedFile(): Promise<FuturesDataResult> {
  try {
    const filePath = join(process.cwd(), "public", "data", "futures.json");
    const content = await readFile(filePath, "utf8");
    const parsed = JSON.parse(content) as ScrapedFile;
    const items = normalizeScrapedItems(parsed);

    return {
      items,
      updatedAt: parsed.updatedAt,
      source: "barchart_scrape"
    };
  } catch {
    return { items: [], source: "unavailable" };
  }
}

export async function getFuturesData(): Promise<FuturesDataResult> {
  if (hasApiKey()) {
    const apiItems = await getFuturesQuotes();
    if (apiItems && apiItems.length > 0) {
      return {
        items: apiItems,
        updatedAt: apiItems.find((item) => item.updatedAt)?.updatedAt ?? undefined,
        source: "barchart_api"
      };
    }

    return {
      items: [],
      source: "unavailable"
    };
  }

  return readScrapedFile();
}
