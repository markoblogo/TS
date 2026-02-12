import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { promisify } from "node:util";
import { execFile } from "node:child_process";

import { chromium, type Page } from "playwright";

type ScrapedItem = {
  symbol: string;
  name: "Corn" | "Wheat" | "Soybeans";
  month: string;
  last: number | null;
  change: number | null;
  percent: number | null;
};

type Target = {
  name: ScrapedItem["name"];
  symbolHint: string;
  url: string;
};

const TARGETS: Target[] = [
  {
    name: "Corn",
    symbolHint: "ZCH26",
    url: "https://www.barchart.com/futures/quotes/ZC*0/futures-prices?viewName=main"
  },
  {
    name: "Wheat",
    symbolHint: "ZWH26",
    url: "https://www.barchart.com/futures/quotes/ZW*0/futures-prices?viewName=main"
  },
  {
    name: "Soybeans",
    symbolHint: "ZSH26",
    url: "https://www.barchart.com/futures/quotes/ZS*0/futures-prices?viewName=main"
  }
];

const DEFAULT_MONTH = "Mar '26";
const execFileAsync = promisify(execFile);

function decodeHtml(value: string): string {
  return value
    .replaceAll("&quot;", "\"")
    .replaceAll("&#039;", "'")
    .replaceAll("&#x27;", "'")
    .replaceAll("&amp;", "&");
}

function parseNumber(value: string | null | undefined): number | null {
  if (!value) return null;
  const normalized = value.replaceAll(",", "").replaceAll("%", "").replace(/\s+/g, "").trim();
  if (!normalized || normalized === "-") return null;

  const fractionMatch = normalized.match(/^([+-]?\d+)-(\d+)$/);
  if (fractionMatch) {
    const whole = Number(fractionMatch[1]);
    const fraction = Number(fractionMatch[2]);
    if (Number.isFinite(whole) && Number.isFinite(fraction)) {
      const sign = whole < 0 ? -1 : 1;
      return sign * (Math.abs(whole) + fraction / 8);
    }
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeMonth(value: string | null | undefined): string {
  if (!value) return DEFAULT_MONTH;

  const monthMatch = value.match(/([A-Za-z]{3})\s*'?\s*(\d{2})/);
  if (!monthMatch) return DEFAULT_MONTH;

  const month = monthMatch[1];
  const year = monthMatch[2];
  return `${month} '${year}`;
}

function normalizeSymbol(contractCell: string | null | undefined, fallback: string): string {
  if (!contractCell) return fallback;

  const symbolMatch = contractCell.match(/[A-Z]{2,4}[FGHJKMNQUVXZ]\d{2}/);
  return symbolMatch?.[0] ?? fallback;
}

async function waitForRows(page: Page): Promise<void> {
  await page.waitForSelector("table tbody tr", { timeout: 20_000 });
  await page.waitForFunction(() => {
    const rows = document.querySelectorAll("table tbody tr");
    return rows.length >= 2;
  });
}

async function scrapeTarget(page: Page, target: Target): Promise<ScrapedItem | null> {
  try {
    await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    let parsed: { contract: string; last: string; change: string; percent: string } | null = null;

    try {
      await waitForRows(page);
      parsed = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll("table tbody tr"));
        const secondRow = rows[1];
        if (!secondRow) return null;

        const cells = Array.from(secondRow.querySelectorAll("td")).map((td) => td.textContent?.trim() ?? "");
        const headers = Array.from(document.querySelectorAll("table thead th")).map((th) => th.textContent?.trim().toLowerCase() ?? "");

        const findIndex = (patterns: string[]): number => {
          for (const pattern of patterns) {
            const index = headers.findIndex((header) => header.includes(pattern));
            if (index !== -1) return index;
          }
          return -1;
        };

        const contractIdx = findIndex(["contract", "symbol"]);
        const lastIdx = findIndex(["last"]);
        const changeIdx = findIndex(["change"]);
        const percentIdx = findIndex(["%", "percent"]);

        return {
          contract: contractIdx >= 0 ? cells[contractIdx] ?? "" : cells[0] ?? "",
          last: lastIdx >= 0 ? cells[lastIdx] ?? "" : "",
          change: changeIdx >= 0 ? cells[changeIdx] ?? "" : "",
          percent: percentIdx >= 0 ? cells[percentIdx] ?? "" : ""
        };
      });
    } catch {
      parsed = null;
    }

    if (!parsed) {
      parsed = await page.evaluate(() => {
        const node = document.querySelector("[data-symbol]");
        const encoded = node?.getAttribute("data-symbol");
        if (!encoded) return null;

        try {
          const payload = JSON.parse(encoded) as {
            symbol?: string;
            contractName?: string;
            lastPrice?: string;
            priceChange?: string;
            percentChange?: string;
          };

          return {
            contract: `${payload.contractName ?? ""} (${payload.symbol ?? ""})`.trim(),
            last: payload.lastPrice ?? "",
            change: payload.priceChange ?? "",
            percent: payload.percentChange ?? ""
          };
        } catch {
          try {
            const payload = JSON.parse(decodeHtml(encoded)) as {
              symbol?: string;
              contractName?: string;
              lastPrice?: string;
              priceChange?: string;
              percentChange?: string;
            };

            return {
              contract: `${payload.contractName ?? ""} (${payload.symbol ?? ""})`.trim(),
              last: payload.lastPrice ?? "",
              change: payload.priceChange ?? "",
              percent: payload.percentChange ?? ""
            };
          } catch {
            return null;
          }
        }
      });
    }

    if (!parsed) return null;

    return {
      symbol: normalizeSymbol(parsed.contract, target.symbolHint),
      name: target.name,
      month: normalizeMonth(parsed.contract),
      last: parseNumber(parsed.last),
      change: parseNumber(parsed.change),
      percent: parseNumber(parsed.percent)
    };
  } catch {
    return null;
  }
}

function parseDataSymbolFromHtml(html: string, target: Target): ScrapedItem | null {
  const match = html.match(/data-symbol='([^']+)'/);
  if (!match) return null;

  try {
    const payload = JSON.parse(decodeHtml(match[1])) as {
      symbol?: string;
      contractName?: string;
      lastPrice?: string;
      priceChange?: string;
      percentChange?: string;
    };

    const contract = `${payload.contractName ?? ""} (${payload.symbol ?? ""})`.trim();
    return {
      symbol: normalizeSymbol(contract, target.symbolHint),
      name: target.name,
      month: normalizeMonth(contract),
      last: parseNumber(payload.lastPrice),
      change: parseNumber(payload.priceChange),
      percent: parseNumber(payload.percentChange)
    };
  } catch {
    return null;
  }
}

async function scrapeTargetFromHtml(target: Target): Promise<ScrapedItem | null> {
  try {
    let html = "";

    try {
      const response = await fetch(target.url, {
        headers: {
          "user-agent": "Mozilla/5.0 (compatible; TS-FuturesBot/1.0; +https://trade-solution.eu/)"
        }
      });
      if (response.ok) html = await response.text();
    } catch {
      html = "";
    }

    if (!html) {
      try {
        const { stdout } = await execFileAsync("curl", ["--globoff", "-Ls", target.url]);
        html = stdout;
      } catch {
        html = "";
      }
    }

    if (!html) {
      try {
        const py = [
          "import sys, urllib.request",
          "req = urllib.request.Request(sys.argv[1], headers={'User-Agent': 'Mozilla/5.0'})",
          "print(urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'ignore'))"
        ].join("; ");
        const { stdout } = await execFileAsync("python3", ["-c", py, target.url], { maxBuffer: 20 * 1024 * 1024 });
        html = stdout;
      } catch {
        html = "";
      }
    }

    if (!html) return null;
    return parseDataSymbolFromHtml(html, target);
  } catch {
    return null;
  }
}

async function run(): Promise<void> {
  const items: ScrapedItem[] = [];
  let browserError = false;

  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: "Mozilla/5.0 (compatible; TS-FuturesBot/1.0; +https://trade-solution.eu/)"
    });

    const page = await context.newPage();
    for (const target of TARGETS) {
      const item = await scrapeTarget(page, target);
      if (item) items.push(item);
    }

    await context.close();
    await browser.close();
  } catch {
    browserError = true;
  }

  if (!items.length && browserError) {
    for (const target of TARGETS) {
      const item = await scrapeTargetFromHtml(target);
      if (item) items.push(item);
    }
  }

  const payload = {
    updatedAt: new Date().toISOString().slice(0, 10),
    source: "barchart_scrape",
    items
  };

  const outputPath = join(process.cwd(), "public", "data", "futures.json");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

run().catch(async () => {
  const outputPath = join(process.cwd(), "public", "data", "futures.json");
  const fallbackPayload = {
    updatedAt: new Date().toISOString().slice(0, 10),
    source: "barchart_scrape",
    items: []
  };

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(fallbackPayload, null, 2)}\n`, "utf8");
  process.exit(0);
});
