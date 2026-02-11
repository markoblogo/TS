import type { Metadata } from "next";
import type { ReactNode } from "react";

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
    title: copy.seo[locale].title,
    description: copy.seo[locale].description,
    openGraph: {
      title: copy.seo[locale].ogTitle,
      description: copy.seo[locale].ogDescription,
      type: "website",
      url: `https://trade-solution.eu/${locale}`,
      siteName: copy.brand.name,
      locale: locale === "bg" ? "bg_BG" : "en_US"
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        bg: "/bg"
      }
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return children;
  }

  return <>{children}</>;
}
