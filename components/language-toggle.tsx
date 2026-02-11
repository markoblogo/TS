import Link from "next/link";

import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  label: string;
};

export function LanguageToggle({ locale, label }: Props) {
  return (
    <div
      className="inline-flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-medium uppercase tracking-[0.14em]"
      role="group"
      aria-label={label}
    >
      <Link href="/en" lang="en" className={`focus-ring rounded px-1 ${locale === "en" ? "text-[var(--fg)]" : "text-[var(--muted)]"}`}>
        EN
      </Link>
      <span aria-hidden="true" className="text-[var(--muted)]">
        |
      </span>
      <Link href="/bg" lang="bg" className={`focus-ring rounded px-1 ${locale === "bg" ? "text-[var(--fg)]" : "text-[var(--muted)]"}`}>
        BG
      </Link>
    </div>
  );
}
