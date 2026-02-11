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
      <main className="section-shell py-16 md:py-20">
        <article className="max-w-3xl space-y-8">
          <header>
            <h1 className="text-4xl font-light tracking-tight md:text-5xl">{copy.privacy[locale].title}</h1>
            <p className="mt-3 text-[var(--muted)]">{copy.privacy[locale].blocks[0]}</p>
          </header>
          {copy.privacy[locale].blocks.map((block, index) => (
            <section key={`${index}-${block}`} className="rounded-xl border bg-[var(--panel)] p-6">
              <p>{block}</p>
            </section>
          ))}
        </article>
      </main>
    </div>
  );
}
