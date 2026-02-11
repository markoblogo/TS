import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { getCopy } from "@/lib/copy";
import { isLocale, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : "en";
  const copy = getCopy();

  return {
    title: `${copy.privacy[locale].title} | Trade Solutions`,
    description: copy.privacy[locale].blocks[0]
  };
}

export default async function PrivacyPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const copy = getCopy();

  return (
    <div className="min-h-screen">
      <SiteHeader locale={locale} copy={copy} />
      <main className="section-shell py-10 md:py-14">
        <article className="mx-auto max-w-3xl space-y-6">
          <header>
            <h1 className="text-4xl font-light tracking-tight md:text-5xl">{copy.privacy[locale].title}</h1>
            <p className="mt-3 text-[var(--muted)]">
              {locale === "bg"
                ? "Настоящата страница описва как сайтът обработва данни при нормална употреба."
                : "This page explains how data is handled when using this website."}
            </p>
          </header>
          <section className="space-y-3">
            <h2 className="text-xl font-medium">
              {locale === "bg" ? "Бисквитки и аналитика" : "Cookies and analytics"}
            </h2>
            <p className="text-[var(--muted)]">{copy.privacy[locale].blocks[0]}</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-medium">
              {locale === "bg" ? "Лични данни" : "Personal data"}
            </h2>
            <p className="text-[var(--muted)]">{copy.privacy[locale].blocks[1]}</p>
          </section>
          <section className="space-y-3">
            <h2 className="text-xl font-medium">
              {locale === "bg" ? "Имейл комуникация" : "Email communication"}
            </h2>
            <p className="text-[var(--muted)]">{copy.privacy[locale].blocks[2]}</p>
            <p className="text-[var(--muted)]">{copy.privacy[locale].blocks[3]}</p>
          </section>
        </article>
      </main>
    </div>
  );
}
