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
          <p>{copy.footer[locale].note}</p>
          <Link href={`/${locale}/privacy`} className="focus-ring hover:text-[var(--fg)]">
            {copy.footer[locale].privacyLabel}
          </Link>
        </div>
      </div>
    </footer>
  );
}
