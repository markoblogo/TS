"use client";

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

const markerPositions: Record<string, { left: string; top: string }> = {
  bg: { left: "58%", top: "58%" },
  "central-europe": { left: "48%", top: "46%" },
  balkans: { left: "54%", top: "54%" },
  "western-europe": { left: "30%", top: "44%" },
  "black-sea-routes": { left: "66%", top: "58%" }
};

export function EuropeMap({ markers, activeKey, onMarkerEnter, onMarkerLeave }: Props) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-black/10 bg-white/70 p-3 shadow-[0_6px_18px_rgba(16,20,28,0.08)] dark:border-white/10 dark:bg-white/5">
      <div className="relative aspect-[4/3]">
        <svg viewBox="0 0 100 74" className="h-full w-full" role="img" aria-label="Europe focus map">
          <defs>
            <linearGradient id="continent" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(165,178,194,0.55)" />
              <stop offset="100%" stopColor="rgba(133,147,166,0.32)" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100" height="74" fill="transparent" />
          <path
            d="M14 38 C18 26,31 18,46 16 C58 14,70 20,78 29 C86 38,88 51,81 59 C74 66,61 68,50 65 C40 62,33 57,26 55 C18 53,11 47,14 38 Z"
            fill="url(#continent)"
            stroke="rgba(83,96,113,0.5)"
            strokeWidth="0.5"
          />
          <g fill="rgba(97,111,130,0.22)">
            {Array.from({ length: 36 }).map((_, idx) => {
              const x = 8 + (idx % 9) * 10.5;
              const y = 8 + Math.floor(idx / 9) * 14.5;
              return <circle key={idx} cx={x} cy={y} r="0.45" />;
            })}
          </g>
        </svg>

        {markers.map((marker) => {
          const position = markerPositions[marker.key] ?? { left: "50%", top: "50%" };
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
                isActive ? "scale-110 shadow-[0_0_0_4px_rgba(14,124,102,0.16)]" : "scale-100"
              }`}
              style={{ left: position.left, top: position.top }}
            >
              <span className={`map-marker relative block h-3.5 w-3.5 rounded-full border border-white/70 bg-emeraldSignal ${isActive ? "opacity-100" : "opacity-85"}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
