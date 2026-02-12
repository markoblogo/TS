"use client";

import { useMemo, useState } from "react";

import { MarketsMap } from "@/components/markets-map";

type Marker = {
  key: string;
  label: string;
};

type Props = {
  title: string;
  subtitle: string;
  items: string[];
  markers: Marker[];
};

export function Markets({ title, subtitle, items, markers }: Props) {
  const [selectedRegion, setSelectedRegion] = useState<string>(markers.find((m) => m.key === "region-southeast")?.key ?? markers[0]?.key ?? "");
  const [hoverRegion, setHoverRegion] = useState<string | null>(null);
  const activeRegion = hoverRegion ?? selectedRegion;

  const activeItemIndex = useMemo(() => {
    if (!activeRegion) return -1;
    return markers.findIndex((marker) => marker.key === activeRegion);
  }, [activeRegion, markers]);

  return (
    <section id="markets" className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <MarketsMap
        markers={markers}
        activeKey={activeRegion}
        onRegionHover={setHoverRegion}
        onRegionLeave={() => setHoverRegion(null)}
        onRegionSelect={setSelectedRegion}
      />

      <article className="rounded-xl border bg-[var(--panel)] p-4 shadow-[0_8px_24px_rgba(13,18,26,0.08)]">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mb-4 text-sm text-[var(--muted)]">{subtitle}</p>
        <ul className="grid gap-2.5">
          {items.map((item, idx) => {
            const markerKey = markers[idx]?.key;
            const isActive = activeItemIndex === idx;
            return (
              <li key={item}>
                <button
                  type="button"
                  onMouseEnter={() => markerKey && setHoverRegion(markerKey)}
                  onMouseLeave={() => setHoverRegion(null)}
                  onFocus={() => markerKey && setHoverRegion(markerKey)}
                  onBlur={() => setHoverRegion(null)}
                  onClick={() => markerKey && setSelectedRegion(markerKey)}
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-all duration-200 ${
                    isActive
                      ? "border-emerald-500/55 bg-[rgba(14,124,102,0.08)] shadow-[0_8px_18px_rgba(13,18,26,0.10)]"
                      : "border-[var(--line)] hover:-translate-y-[2px] hover:border-emerald-500/40 hover:shadow-[0_8px_18px_rgba(13,18,26,0.08)]"
                  } active:scale-[0.98]`}
                  aria-pressed={markerKey ? selectedRegion === markerKey : false}
                >
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}
