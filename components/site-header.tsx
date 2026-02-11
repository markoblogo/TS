import Link from "next/link";

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
      <div className="section-shell flex items-center justify-between gap-3 py-2.5">
        <div className="flex min-w-0 items-center gap-4">
          <Link href={`/${locale}`} className="focus-ring flex items-center gap-2.5 rounded">
            <TsLogo priority className="shrink-0" />
            <div>
              <p className="text-base font-medium tracking-tight">{copy.brand.name}</p>
            </div>
          </Link>
          <nav className="hidden min-w-0 items-center gap-2 text-sm text-[var(--fg)] lg:flex">
            {copy.nav[locale].map((item: { label: string; href: string }) => (
              <Link key={item.href} href={item.href} className="focus-ring rounded px-1 hover:text-emeraldSignal">
                {item.label}
              </Link>
            ))}
            <Link href={`/${locale}/privacy`} className="focus-ring hover:text-[var(--fg)]">
              {copy.footer[locale].privacyLabel}
            </Link>
          </nav>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <LanguageToggle locale={locale} label={copy.ui[locale].switchLanguage} />
          <ThemeToggle label={copy.ui[locale].switchTheme} />
        </div>
      </div>
    </header>
  );
}
