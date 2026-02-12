# Trade Solutions — bilingual website (EN/BG)

Minimal, fast, bilingual website for Trade Solutions with EN/BG route-localized content, theme toggle, geo-based locale redirect, live operational widgets (FX reference rates, futures strip, business window clocks), and a clean, structured layout.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- `next-themes` (class strategy)
- Route i18n by segments: `/en`, `/bg`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Data sources and live modules

### 1) FX reference rates (ECB)

- FX rates are fetched from the European Central Bank daily feed (SSR with `revalidate: 86400`).
- Displayed as a compact Market Pulse panel in the Hero.
- Graceful fallback message if rates are unavailable.

### 2) Futures strip (Corn/Wheat/Soybeans)

The futures strip supports two modes:

#### Mode A — Barchart OnDemand API (optional)

- If `BARCHART_API_KEY` (or supported aliases) is present in runtime, the site fetches quotes via Barchart OnDemand `getQuote.json`.

#### Mode B — No API key (default-friendly)

- If there is no API key, the strip reads `public/data/futures.json`.
- `public/data/futures.json` is updated daily by GitHub Actions (`.github/workflows/scrape-futures.yml`).

Manual refresh:

```bash
npm run scrape:futures
```

## Key UI features

- Bilingual EN/BG content via route segments (`/en`, `/bg`)
- Theme toggle (light/dark) persisted via `next-themes`
- Geo locale redirect middleware:
  - BG country => `/bg`
  - all others => `/en`
- Hero module:
  - editorial photo slider (crossfade + subtle motion)
  - left editorial overlay copy + CTAs
  - right Market Pulse panel (FX)
- Structured sections:
  - Solutions / How we work / Facts strip
  - Markets / Geography: map + interactive markers and list-driven highlighting
  - Operational network: category social proof without partner logos
- Footer:
  - world time micro-cards + business window status (updates regularly)
- SEO:
  - localized metadata (title/description)
  - Open Graph tags
  - `sitemap.xml`, `robots.txt`
  - JSON-LD Organization schema

## Accessibility

- Keyboard focus states (`focus-visible`)
- ARIA labels on toggles where applicable
- Contrast-aware styling for both themes
- Reduced-motion friendly animation choices (where possible)

## Project structure

```text
.
├── app
│   ├── [locale]
│   │   ├── brand
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── privacy
│   │       └── page.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components
│   ├── brand-gallery.tsx
│   ├── fx-ticker.tsx
│   ├── futures-strip.tsx
│   ├── live-clocks.tsx
│   ├── markets.tsx
│   ├── markets-map.tsx
│   ├── reveal.tsx
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ts-logo.tsx
├── lib
│   ├── barchart.ts
│   ├── clocks.ts
│   ├── copy.ts
│   ├── ecb.ts
│   ├── futures-data.ts
│   └── i18n.ts
├── public
│   ├── assets
│   │   ├── bb
│   │   └── logos
│   └── data
│       └── futures.json
├── scripts
│   └── scrape-barchart-futures.ts
├── .github
│   └── workflows
│       └── scrape-futures.yml
├── middleware.ts
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

Notes:

- `public/assets/bb/` is used for brandbook-style assets (logos + mockups) on the Brand page.
- `public/data/futures.json` is the no-API-key data source for the futures strip.

## Environment variables

### Optional (API mode)

- `BARCHART_API_KEY` — enables Barchart OnDemand mode for futures quotes.
  - Supported aliases may be implemented for convenience (see `lib/barchart.ts`).

No env vars are required if you use the daily-updated `public/data/futures.json` mode.

## Logo assets and theme switching

Place brand assets here:

- `public/assets/logos/ts-logo-light.svg`
- `public/assets/logos/ts-logo-dark.svg`

The header logo component (`components/ts-logo.tsx`) switches automatically by theme class.

If you prefer PNG variants, keep naming consistent and update paths in `components/ts-logo.tsx`.

## Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

### Option B: Git integration

1. Push repo to GitHub.
2. In Vercel, import the repository.
3. Build settings:
   - Build command: `npm run build`
   - Output: `.next`

## Privacy constraints

- No analytics tools
- No marketing cookies
- Contacts via `mailto` links only
