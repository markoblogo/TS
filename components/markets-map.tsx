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

const markerPositions: Record<string, { left: string; top: string; size: string }> = {
  "mk-6": { left: "35.01%", top: "50.86%", size: "h-3.5 w-3.5" },
  "mk-14": { left: "63.76%", top: "72.13%", size: "h-3.5 w-3.5" },
  "mk-20": { left: "85.67%", top: "77.10%", size: "h-3.5 w-3.5" },
  "mk-23": { left: "28.52%", top: "83.48%", size: "h-3.5 w-3.5" }
};

export function MarketsMap({ markers, activeKey, onMarkerEnter, onMarkerLeave }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-3 shadow-[0_6px_18px_rgba(16,20,28,0.08)] dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[900/560] overflow-hidden rounded-xl">
        <Image src="/assets/maps/mapTS.svg" alt="Europe map" fill priority={false} className="object-contain" />

        {markers.map((marker) => {
          const position = markerPositions[marker.key];
          if (!position) return null;
          const isActive = activeKey === marker.key;

          return (
            <button
              key={marker.key}
              type="button"
              aria-label={marker.label}
              onMouseEnter={() => onMarkerEnter(marker.key)}
              onMouseLeave={onMarkerLeave}
              onFocus={() => onMarkerEnter(marker.key)}
              onBlur={onMarkerLeave}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                isActive ? "scale-[1.15]" : "scale-100"
              }`}
              style={{ left: position.left, top: position.top }}
            >
              <span
                className={`map-marker relative block rounded-full border border-white/70 bg-emeraldSignal dark:bg-[#22c79b] ${position.size} ${
                  isActive ? "map-marker-active opacity-100 shadow-[0_0_0_5px_rgba(14,124,102,0.22)]" : "opacity-90"
                }`}
              />
              <span
                className={`pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-black/10 bg-white/85 px-1.5 py-0.5 text-[10px] font-medium text-[var(--fg)] shadow-sm backdrop-blur-sm transition-all duration-200 dark:border-white/10 dark:bg-black/70 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                }`}
                aria-hidden="true"
              >
                {marker.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
