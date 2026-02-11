"use client";

import { useEffect, useState } from "react";

import { getClockData, getOfficeStatus } from "@/lib/clocks";

type Props = {
  locale: "en" | "bg";
  zones: Array<{ label: string; tz: string }>;
  businessWindow: { tz: string; open: string; close: string; weekdays: number[] };
  businessLinePrefix: string;
  openLabel: string;
  closedLabel: string;
  nextWindowLabel: string;
};

export function LiveClocks({
  locale,
  zones,
  businessWindow,
  businessLinePrefix,
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
    ...getClockData(now, city.tz, locale)
  }));

  const status = getOfficeStatus(now, locale, businessWindow);

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted)]">
        <span>{businessLinePrefix}</span>
        <span aria-live="polite" className={`inline-flex h-2.5 w-2.5 rounded-full ${status.isOpen ? "bg-emeraldSignal animate-pulseSignal" : "bg-rose-500"}`} />
        <span className={`font-mono uppercase tracking-[0.1em] ${status.isOpen ? "text-emeraldSignal" : "text-rose-400"}`}>
          {status.isOpen ? openLabel : closedLabel}
        </span>
        <span>·</span>
        <span>
          {nextWindowLabel}: {status.nextWindowLabel}
        </span>
      </div>
      <div className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-6">
        {clocks.map((clock) => (
          <div key={clock.city} className="rounded-md border bg-[var(--panel)] p-1.5">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 100 100" className="h-10 w-10 shrink-0" aria-hidden="true">
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill={clock.isDaytime ? "#f3f8ff" : "#0e141b"}
                  stroke={clock.isDaytime ? "#8aa0b6" : "#3f4f63"}
                  strokeWidth="2"
                />
                <circle cx="50" cy="50" r="2.5" fill={clock.isDaytime ? "#1a2c40" : "#e2ecf6"} />
                <g strokeLinecap="round">
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="28"
                    stroke={clock.isDaytime ? "#1a2c40" : "#e2ecf6"}
                    strokeWidth="3"
                    transform={`rotate(${clock.hourAngle} 50 50)`}
                  />
                  <line
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="20"
                    stroke={clock.isDaytime ? "#2a3f58" : "#b6cbe0"}
                    strokeWidth="2"
                    transform={`rotate(${clock.minuteAngle} 50 50)`}
                  />
                  <line
                    x1="50"
                    y1="52"
                    x2="50"
                    y2="16"
                    stroke="#19a183"
                    strokeWidth="1.4"
                    transform={`rotate(${clock.secondAngle} 50 50)`}
                  />
                </g>
              </svg>
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--muted)]">{clock.city}</p>
                <p className="font-mono text-sm">{clock.digital}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
