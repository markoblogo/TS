import Link from "next/link";

import { FxTicker } from "@/components/fx-ticker";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { TsLogo } from "@/components/ts-logo";
import type { SiteCopy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  copy: SiteCopy;
};

export async function SiteHeader({ locale, copy }: Props) {
  return (
    <header className="thin-rule border-b">
      <div className="section-shell flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <Link href={`/${locale}`} className="focus-ring flex items-center gap-3 rounded">
            <TsLogo priority className="shrink-0" />
            <div>
              <p className="text-lg font-medium tracking-tight">{copy.brand.name}</p>
              <p className="text-xs text-[var(--muted)]">{copy.brand.subtagline[locale]}</p>
            </div>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
            {copy.nav[locale].map((item: { label: string; href: string }) => (
              <Link key={item.href} href={item.href} className="focus-ring hover:text-[var(--fg)]">
                {item.label}
              </Link>
            ))}
            <Link href={`/${locale}/privacy`} className="focus-ring hover:text-[var(--fg)]">
              {copy.footer[locale].privacyLabel}
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          {copy.live.fx.enabled ? (
            <FxTicker
              title={copy.live.fx.title[locale]}
              pairs={copy.live.fx.pairs}
              label={copy.live.fx.sourceLabel[locale]}
              fixedConversion={copy.live.fx.staticNote[locale]}
              unavailable={copy.ui[locale].ratesUnavailable}
            />
          ) : null}
          <div className="flex items-center gap-2">
            <LanguageToggle locale={locale} label={copy.ui[locale].switchLanguage} />
            <ThemeToggle
              label={copy.ui[locale].switchTheme}
              lightLabel={copy.ui[locale].themeLight}
              darkLabel={copy.ui[locale].themeDark}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
