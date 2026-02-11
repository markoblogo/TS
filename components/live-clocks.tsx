"use client";

import { useEffect, useState } from "react";

import { formatClock, getOfficeStatus } from "@/lib/clocks";

type Props = {
  locale: "en" | "bg";
  zones: Array<{ label: string; tz: string }>;
  businessWindow: { tz: string; open: string; close: string; weekdays: number[] };
  openLabel: string;
  closedLabel: string;
  nextWindowLabel: string;
};

export function LiveClocks({
  locale,
  zones,
  businessWindow,
  openLabel,
  closedLabel,
  nextWindowLabel
}: Props) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const clocks = zones.map((city) => ({
    city: city.label,
    value: formatClock(city.tz, locale, now)
  }));

  const status = getOfficeStatus(now, locale, businessWindow);

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {clocks.map((clock) => (
          <div key={clock.city} className="rounded-lg border bg-[var(--panel)] p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">{clock.city}</p>
            <p className="font-mono text-lg">{clock.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-[var(--panel)] p-3">
        <span
          aria-live="polite"
          className={`inline-flex h-2.5 w-2.5 rounded-sm ${status.isOpen ? "bg-emeraldSignal animate-pulseSignal" : "bg-[var(--muted)]"}`}
        />
        <p className="font-mono text-sm uppercase tracking-[0.14em]">
          {status.isOpen ? openLabel : closedLabel}
        </p>
        <p className="text-sm text-[var(--muted)]">
          {nextWindowLabel}: {status.nextWindowLabel}
        </p>
      </div>
    </div>
  );
}
