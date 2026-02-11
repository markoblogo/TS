const ECB_DAILY_URL = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml";

type EcbRate = {
  code: string;
  value: string;
};

export async function getEcbRates(codes: string[]): Promise<{ rates: EcbRate[]; date: string | null }> {
  const response = await fetch(ECB_DAILY_URL, {
    next: { revalidate: 86400 }
  });

  if (!response.ok) {
    throw new Error(`ECB request failed: ${response.status}`);
  }

  const xml = await response.text();
  const dateMatch = xml.match(/time='([^']+)'/);
  const date = dateMatch?.[1] ?? null;

  const rates = codes
    .map((code) => {
      const rateMatch = xml.match(new RegExp(`<Cube currency='${code}' rate='([^']+)'\\/>`));
      return rateMatch ? { code, value: Number(rateMatch[1]).toFixed(4) } : null;
    })
    .filter((entry): entry is EcbRate => entry !== null);

  if (!rates.length) {
    throw new Error("No ECB rates parsed");
  }

  return { rates, date };
}
