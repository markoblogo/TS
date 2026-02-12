import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BrandGallery } from "@/components/brand-gallery";
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
    title: `${copy.brandPage[locale].title} | Trade Solutions`,
    description: copy.brandPage[locale].subtitle
  };
}

export default async function BrandPage({
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

  const logoAssets = [
    { id: "logo-dark", src: "/assets/bb/ts-logo-dark.jpg", title: "TS Logo Dark" },
    { id: "logo-light", src: "/assets/bb/ts-logo-light.jpg", title: "TS Logo Light" }
  ];

  const mockupAssets = [
    { id: "bb1", src: "/assets/bb/bb1.png", title: "Mockup 01" },
    { id: "bb2", src: "/assets/bb/bb2.png", title: "Mockup 02" },
    { id: "bb3", src: "/assets/bb/bb3.png", title: "Mockup 03" },
    { id: "bb4", src: "/assets/bb/bb4.png", title: "Mockup 04" }
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader locale={locale} copy={copy} />

      <main className="section-shell py-8 md:py-10">
        <header className="mb-5">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{copy.brandPage[locale].title}</h1>
          <p className="mt-2 text-sm text-[var(--muted)] md:text-base">{copy.brandPage[locale].subtitle}</p>
        </header>

        <section className="thin-rule border-t py-5">
          <h2 className="mb-3 text-xl font-semibold tracking-tight">{copy.brandPage[locale].sections.logos}</h2>
          <BrandGallery assets={logoAssets} copy={copy.brandPage[locale].actions} columnsClassName="md:grid-cols-2" />
        </section>

        <section className="thin-rule border-t py-5">
          <h2 className="mb-3 text-xl font-semibold tracking-tight">{copy.brandPage[locale].sections.mockups}</h2>
          <BrandGallery assets={mockupAssets} copy={copy.brandPage[locale].actions} columnsClassName="md:grid-cols-2 lg:grid-cols-3" />
        </section>
      </main>
    </div>
  );
}
