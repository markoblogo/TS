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
    description: copy.privacy[locale].sections[0]?.text ?? copy.privacy[locale].title
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
      <main className="section-shell py-9 md:py-12">
        <article className="mx-auto max-w-3xl space-y-5">
          <header>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{copy.privacy[locale].title}</h1>
          </header>
          {copy.privacy[locale].sections.map((section) => (
            <section key={section.heading} className="space-y-2.5">
              <h2 className="text-lg font-semibold">{section.heading}</h2>
              <p className="leading-relaxed text-[var(--muted)]">{section.text}</p>
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}
