"use client";

import { useMemo, useState } from "react";

import { EuropeMap } from "@/components/europe-map";

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

const itemMarkerKeys = ["mk-west", "mk-central", "mk-balkans", "mk-blacksea"];

export function Markets({ title, subtitle, items, markers }: Props) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const activeItemIndex = useMemo(() => {
    if (!activeKey) return -1;
    return itemMarkerKeys.indexOf(activeKey);
  }, [activeKey]);

  return (
    <section id="markets" className="grid gap-4 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <EuropeMap markers={markers} activeKey={activeKey} onMarkerEnter={setActiveKey} onMarkerLeave={() => setActiveKey(null)} />

      <article className="rounded-xl border bg-[var(--panel)] p-4 shadow-[0_8px_24px_rgba(13,18,26,0.08)]">
        <h2 className="mb-2 text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mb-4 text-sm text-[var(--muted)]">{subtitle}</p>
        <ul className="grid gap-2.5">
          {items.map((item, idx) => {
            const markerKey = itemMarkerKeys[idx];
            const isActive = activeItemIndex === idx;
            return (
              <li key={item}>
                <button
                  type="button"
                  onMouseEnter={() => setActiveKey(markerKey)}
                  onMouseLeave={() => setActiveKey(null)}
                  onFocus={() => setActiveKey(markerKey)}
                  onBlur={() => setActiveKey(null)}
                  className={`w-full rounded-md border px-3 py-2 text-left text-sm transition-all duration-200 ${
                    isActive
                      ? "border-emerald-500/55 bg-[rgba(14,124,102,0.08)] shadow-[0_8px_18px_rgba(13,18,26,0.10)]"
                      : "border-[var(--line)] hover:-translate-y-[2px] hover:border-emerald-500/40 hover:shadow-[0_8px_18px_rgba(13,18,26,0.08)]"
                  }`}
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
