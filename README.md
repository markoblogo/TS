# Trade Solutions Bilingual Card Site

Minimal Next.js (App Router) website for Trade Solutions with EN/BG route-localized content, theme toggle, geo-based locale redirect, live ECB ticker, and footer clocks.

## Stack

- Next.js + App Router + TypeScript
- Tailwind CSS
- `next-themes` (class strategy)
- Route i18n by segments: `/en`, `/bg`

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Features implemented

- Thin-line TS identity with emerald signal accent
- Light/Dark theme toggle (persisted in `localStorage` via `next-themes`)
- EN/BG language toggle
- Geo locale middleware redirect:
  - `BG` country => `/bg`
  - all others => `/en`
- SEO:
  - localized metadata (title/description)
  - OG tags
  - `sitemap.xml`
  - `robots.txt`
  - `schema.org` Organization JSON-LD
- Live elements:
  - Header FX ticker from ECB daily XML (`revalidate: 86400`)
  - graceful fallback (`Rates unavailable`)
  - fixed BGN conversion text
  - Footer clocks (Sofia/Kyiv/New York/London)
  - business window status with next window hint, updates every 60s
- Accessibility:
  - keyboard-focus states
  - ARIA labels for toggles
  - high-contrast palette in both themes
- Privacy page with no-cookies and email handling statement

## File structure

```text
.
├── app
│   ├── [locale]
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── privacy
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components
│   ├── fx-ticker.tsx
│   ├── language-toggle.tsx
│   ├── live-clocks.tsx
│   ├── reveal.tsx
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ts-logo.tsx
├── lib
│   ├── clocks.ts
│   ├── copy.ts
│   ├── ecb.ts
│   └── i18n.ts
├── public
│   └── assets
│       └── logos
│           ├── ts-logo-dark.svg
│           └── ts-logo-light.svg
├── middleware.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Logo assets and dark-mode switching

Place brand assets here:

- `public/assets/logos/ts-logo-light.svg`
- `public/assets/logos/ts-logo-dark.svg`

Current header logo component (`components/ts-logo.tsx`) automatically switches by theme class:

- light theme: `block dark:hidden`
- dark theme: `hidden dark:block`

If you prefer PNG variants, keep the same names with `.png` and update paths in `components/ts-logo.tsx`.

## Deploy to Vercel

### Option A: Vercel CLI

1. Install CLI and login:

```bash
npm i -g vercel
vercel login
```

2. Deploy preview:

```bash
vercel
```

3. Deploy production:

```bash
vercel --prod
```

### Option B: Git integration

1. Push repository to GitHub.
2. In Vercel, `Add New Project` and import repo.
3. Build settings:
   - Framework: Next.js (auto)
   - Build command: `npm run build`
   - Output: `.next`

## Attach temporary domain `ts.abvx.xyz`

After first deployment:

1. Open project in Vercel -> `Settings` -> `Domains`.
2. Add `ts.abvx.xyz`.
3. In DNS provider for `abvx.xyz`, create/verify records Vercel requests:
   - typically `CNAME ts -> cname.vercel-dns.com`
   - or an `A` record if Vercel instructs so for apex/subdomain setup
4. Wait for Vercel domain status to become `Valid Configuration`.

## Privacy constraints

- No analytics tools
- No cookies
- Contacts via mailto links only
