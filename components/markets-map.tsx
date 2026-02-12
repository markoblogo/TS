"use client";

import Image from "next/image";
import { useState } from "react";

type Marker = {
  key: string;
  label: string;
};

type Props = {
  markers: Marker[];
  activeKey: string | null;
  onRegionHover: (key: string) => void;
  onRegionLeave: () => void;
  onRegionSelect: (key: string) => void;
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
  { id: "it", label: "Italy", region: "region-south", x: 44.14, y: 62.81 },
  { id: "bg", label: "Bulgaria", region: "region-southeast", x: 58.15, y: 59.75, isBulgaria: true },
  { id: "ro", label: "Romania", region: "region-southeast", x: 74.82, y: 53.09 },
  { id: "rs", label: "Serbia", region: "region-southeast", x: 49.82, y: 55.46 },
  { id: "hr", label: "Croatia", region: "region-southeast", x: 40.0, y: 52.7 },
  { id: "de", label: "Germany", region: "region-central", x: 47.32, y: 34.08 },
  { id: "pl", label: "Poland", region: "region-central", x: 50.72, y: 26.24 },
  { id: "sk", label: "Slovakia", region: "region-central", x: 72.84, y: 35.35 },
  { id: "hu", label: "Hungary", region: "region-central", x: 65.16, y: 52.58 },
  { id: "md", label: "Moldova", region: "region-east", x: 80.38, y: 59.62 },
  { id: "ua", label: "Ukraine", region: "region-east", x: 76.86, y: 61.41 }
];

type MapMarkerProps = {
  country: CountryMarker;
  isActive: boolean;
  isDimmed: boolean;
  showTooltip: boolean;
  onHover: (countryId: string, region: string) => void;
  onLeave: (countryId: string) => void;
  onSelect: (region: string) => void;
};

function MapMarker({ country, isActive, isDimmed, showTooltip, onHover, onLeave, onSelect }: MapMarkerProps) {
  const baseOpacity = isDimmed ? "opacity-60" : "opacity-95";
  const activeScale = isActive ? (country.isBulgaria ? "scale-[1.25]" : "scale-110") : country.isBulgaria ? "scale-[1.14]" : "scale-100";

  return (
    <button
      type="button"
      aria-label={country.label}
      onMouseEnter={() => onHover(country.id, country.region)}
      onMouseLeave={() => onLeave(country.id)}
      onFocus={() => onHover(country.id, country.region)}
      onBlur={() => onLeave(country.id)}
      onClick={() => onSelect(country.region)}
      className={`group absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${activeScale} hover:scale-125`}
      style={{ left: `${country.x}%`, top: `${country.y}%` }}
    >
      <span
        className={`relative block h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-emerald-300/80 transition-all duration-300 ${baseOpacity} ${
          isActive ? "animate-pulseSoft shadow-[0_0_0_6px_rgba(16,185,129,0.20),0_0_24px_rgba(16,185,129,0.35)]" : "shadow-[0_0_0_3px_rgba(16,185,129,0.14)]"
        }`}
      />
      <span
        className={`pointer-events-none absolute left-3 top-[-10px] whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white transition-opacity duration-200 ${
          showTooltip ? "opacity-100" : "opacity-0"
        }`}
      >
        {country.label}
      </span>
    </button>
  );
}

export function MarketsMap({ markers, activeKey, onRegionHover, onRegionLeave, onRegionSelect }: Props) {
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const activeRegionLabel = markers.find((marker) => marker.key === activeKey)?.label;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-3 shadow-[0_6px_18px_rgba(16,20,28,0.08)] dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[843/559] w-full overflow-hidden rounded-xl">
        <Image src="/markets/markets-we-trade.svg" alt="Europe map" fill priority={false} className="object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/25 via-white/10 to-white/0 dark:from-black/35 dark:via-black/10 dark:to-black/0" />

        {countries.map((country) => {
          const isActive = activeKey === country.region;
          const isDimmed = activeKey ? !isActive : false;
          const showTooltip = hoveredCountryId === country.id;

          return (
            <MapMarker
              key={country.id}
              country={country}
              isActive={isActive}
              isDimmed={isDimmed}
              showTooltip={showTooltip}
              onHover={(countryId, region) => {
                setHoveredCountryId(countryId);
                onRegionHover(region);
              }}
              onLeave={(countryId) => {
                void countryId;
                setHoveredCountryId(null);
                onRegionLeave();
              }}
              onSelect={onRegionSelect}
            />
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
