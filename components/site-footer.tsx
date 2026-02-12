import Link from "next/link";

import { LiveClocks } from "@/components/live-clocks";
import type { SiteCopy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  copy: SiteCopy;
};

export function SiteFooter({ locale, copy }: Props) {
  const hoursText =
    locale === "bg"
      ? `${copy.footer[locale].businessWindowLabel}: Пон-Пет ${copy.live.clocks.businessWindow.open}-${copy.live.clocks.businessWindow.close} (София)`
      : `${copy.footer[locale].businessWindowLabel}: Mon-Fri ${copy.live.clocks.businessWindow.open}-${copy.live.clocks.businessWindow.close} (Sofia)`;

  return (
    <footer className="thin-rule mt-10 border-t py-5">
      <div className="section-shell grid gap-2.5">
        <h2 className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{copy.live.clocks.title[locale]}</h2>
        <LiveClocks
          locale={locale}
          zones={copy.live.clocks.zones}
          businessWindow={copy.live.clocks.businessWindow}
          businessLinePrefix={hoursText}
          openLabel={copy.live.clocks.businessWindow.labels[locale].open}
          closedLabel={copy.live.clocks.businessWindow.labels[locale].closed}
          nextWindowLabel={copy.live.clocks.businessWindow.labels[locale].next}
        />
        <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs text-[var(--muted)]">
          <p className="flex flex-wrap items-center gap-0">
            <span>{copy.footer[locale].note}</span>
            <span aria-hidden="true">&nbsp;·&nbsp;</span>
            <Link
              href="https://abvx.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 no-underline transition-opacity hover:opacity-100 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              ABVX.xyz
            </Link>
            <span aria-hidden="true">&nbsp;·&nbsp;</span>
            <Link
              href="https://spike.broker/"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 no-underline transition-opacity hover:opacity-100 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Spike.broker
            </Link>
            <span aria-hidden="true">&nbsp;·&nbsp;</span>
            <Link
              href="https://cropto.abvx.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 no-underline transition-opacity hover:opacity-100 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Cropto
            </Link>
          </p>
          <Link href={`/${locale}/privacy`} className="focus-ring hover:text-[var(--fg)]">
            {copy.footer[locale].privacyLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
