"use client";

import Image from "next/image";

type Marker = {
  key: string;
  label: string;
};

type Props = {
  markers: Marker[];
  activeKey: string | null;
  onMarkerEnter: (key: string) => void;
  onMarkerLeave: () => void;
};

type CountryMarker = {
  id: string;
  label: string;
  region: string;
  x: number;
  y: number;
  isBulgaria?: boolean;
};

const countries: CountryMarker[] = [
  { id: "it", label: "Italy", region: "region-south", x: 35.01, y: 50.86 },
  { id: "bg", label: "Bulgaria", region: "region-southeast", x: 63.76, y: 72.13, isBulgaria: true },
  { id: "ro", label: "Romania", region: "region-southeast", x: 66.8, y: 68.1 },
  { id: "rs", label: "Serbia", region: "region-southeast", x: 59.6, y: 69.5 },
  { id: "hr", label: "Croatia", region: "region-southeast", x: 54.8, y: 67.2 },
  { id: "de", label: "Germany", region: "region-central", x: 49.0, y: 55.2 },
  { id: "pl", label: "Poland", region: "region-central", x: 56.8, y: 57.0 },
  { id: "sk", label: "Slovakia", region: "region-central", x: 58.4, y: 61.2 },
  { id: "hu", label: "Hungary", region: "region-central", x: 60.4, y: 64.1 },
  { id: "md", label: "Moldova", region: "region-east", x: 76.8, y: 71.0 },
  { id: "ua", label: "Ukraine", region: "region-east", x: 85.67, y: 77.1 }
];

export function MarketsMap({ markers, activeKey, onMarkerEnter, onMarkerLeave }: Props) {
  const activeRegionLabel = markers.find((marker) => marker.key === activeKey)?.label;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-3 shadow-[0_6px_18px_rgba(16,20,28,0.08)] dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[900/560] overflow-hidden rounded-xl">
        <Image src="/assets/maps/mapTS.svg" alt="Europe map" fill priority={false} className="object-contain" />

        {countries.map((country) => {
          const isActive = activeKey === country.region;
          const isBulgaria = Boolean(country.isBulgaria);

          return (
            <button
              key={country.id}
              type="button"
              aria-label={country.label}
              onMouseEnter={() => onMarkerEnter(country.region)}
              onMouseLeave={onMarkerLeave}
              onFocus={() => onMarkerEnter(country.region)}
              onBlur={onMarkerLeave}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                isActive ? "scale-[1.15]" : isBulgaria ? "scale-[1.12]" : "scale-100"
              }`}
              style={{ left: `${country.x}%`, top: `${country.y}%` }}
            >
              <span
                className={`map-marker relative block rounded-full border border-white/70 bg-emeraldSignal dark:bg-[#22c79b] ${
                  isBulgaria ? "h-4 w-4" : "h-3.5 w-3.5"
                } ${isActive ? "map-marker-active opacity-100 shadow-[0_0_0_5px_rgba(14,124,102,0.22)]" : "opacity-90"} ${
                  isBulgaria ? "shadow-[0_0_0_4px_rgba(14,124,102,0.18)]" : ""
                }`}
              />
              <span
                className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-black/10 bg-white/85 px-1.5 py-0.5 text-[10px] font-medium text-[var(--fg)] shadow-sm backdrop-blur-sm transition-all duration-200 dark:border-white/10 dark:bg-black/70 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
                aria-hidden="true"
              >
                {country.label}
              </span>
            </button>
          );
        })}

        {activeRegionLabel ? (
          <span className="pointer-events-none absolute left-3 top-3 rounded-md border border-black/10 bg-white/85 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--fg)] shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-black/70">
            {activeRegionLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
