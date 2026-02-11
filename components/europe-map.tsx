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
  "mk-west": { left: "35.0%", top: "50.9%", size: "h-3.5 w-3.5" },
  "mk-central": { left: "47.8%", top: "44.6%", size: "h-3.5 w-3.5" },
  "mk-balkans": { left: "57.8%", top: "58.9%", size: "h-3.5 w-3.5" },
  "mk-blacksea": { left: "69.4%", top: "63.9%", size: "h-3.5 w-3.5" },
  "mk-bg": { left: "63.9%", top: "65.4%", size: "h-4.5 w-4.5" }
};

export function EuropeMap({ markers, activeKey, onMarkerEnter, onMarkerLeave }: Props) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white/70 p-3 shadow-[0_6px_18px_rgba(16,20,28,0.08)] dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[900/560] overflow-hidden rounded-lg">
        <Image src="/assets/graphics/europe-map.svg" alt="Europe map" fill priority={false} className="object-cover" />

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
                isActive ? "scale-[1.18]" : "scale-100"
              }`}
              style={{ left: position.left, top: position.top }}
            >
              <span
                className={`map-marker relative block rounded-full border border-white/70 bg-emeraldSignal dark:bg-[#22c79b] ${position.size} ${
                  isActive ? "opacity-100 shadow-[0_0_0_5px_rgba(14,124,102,0.22)]" : "opacity-90"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
