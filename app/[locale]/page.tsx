import Link from "next/link";
import { notFound } from "next/navigation";

import { FxTicker } from "@/components/fx-ticker";
import { Reveal } from "@/components/reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCopy } from "@/lib/copy";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function HomePage({
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
  const hero = copy.hero[locale];
  const solutions = copy.solutions[locale];
  const process = copy.process[locale];
  const scope = copy.scope[locale];
  const about = copy.about[locale];
  const faq = copy.faq[locale];
  const contact = copy.contact[locale];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: copy.brand.name,
    url: copy.brand.domain,
    email: [copy.brand.emails.trade, copy.brand.emails.execution],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: copy.brand.emails.trade,
        contactType: "trade"
      },
      {
        "@type": "ContactPoint",
        email: copy.brand.emails.execution,
        contactType: "execution"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SiteHeader locale={locale} copy={copy} />

      <main className="section-shell relative py-9 md:py-12">
        <div className="pointer-events-none absolute left-0 top-2 z-0 text-[180px] font-light leading-none tracking-tight text-[var(--fg)] opacity-[0.055] md:text-[280px]">
          TS
        </div>
        <div className="subtle-grid pointer-events-none absolute inset-x-0 top-0 z-0 h-[320px] opacity-40" />

        <Reveal className="relative z-10 grid gap-5 pb-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <div className="grid gap-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{copy.brand.subtagline[locale]}</p>
            <h1 className="max-w-4xl text-4xl font-light tracking-tight md:text-6xl">
              {hero.h1Lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="max-w-4xl text-base text-[var(--muted)] md:text-[17px]">
              {hero.leadLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <Link
                className="focus-ring rounded border border-emeraldSignal bg-emeraldSignal px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0a6b58] active:bg-[#095a4b]"
                href={hero.ctaPrimary.href}
              >
                {hero.ctaPrimary.label}
              </Link>
              <Link
                className="focus-ring rounded border border-emeraldSignal px-3.5 py-2 text-sm font-medium text-[var(--fg)] transition-colors hover:bg-[rgba(14,124,102,0.08)] active:bg-[rgba(14,124,102,0.14)]"
                href={hero.ctaSecondary.href}
              >
                {hero.ctaSecondary.label}
              </Link>
            </div>
          </div>
          {copy.live.fx.enabled ? (
            <aside className="w-full max-w-[360px] lg:justify-self-end">
              <FxTicker
                title="FX REFERENCE RATES"
                pairs={copy.live.fx.pairs}
                label={copy.live.fx.sourceLabel[locale]}
                fixedConversion={copy.live.fx.staticNote[locale]}
                unavailable={copy.ui[locale].ratesUnavailable}
              />
            </aside>
          ) : null}
        </Reveal>

        <Reveal className="thin-rule border-t py-7" id="solutions">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">{solutions.title}</h2>
          <p className="mb-4 text-[var(--muted)]">{solutions.subtitle}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {solutions.items.map((item) => (
              <article key={item.title} className="rounded-lg border bg-[var(--panel)] p-4 transition-transform hover:-translate-y-0.5 hover:border-[#96a2b1]">
                <h3 className="mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-7" id="process">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">{process.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {process.steps.map((step) => (
              <article key={step.title} className="rounded-lg border bg-[var(--panel)] p-4 transition-transform hover:-translate-y-0.5 hover:border-[#96a2b1]">
                <h3 className="mb-2 text-lg">{step.title}</h3>
                <p className="mb-3 text-sm text-[var(--muted)]">{step.text}</p>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{step.meta.join(" · ")}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-7" id="scope">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">{scope.title}</h2>
          <p className="mb-4 text-[var(--muted)]">{scope.subtitle}</p>
          <div className="grid gap-4 md:grid-cols-2">
            <section className="rounded-lg border bg-[var(--panel)] p-4 transition-transform hover:-translate-y-0.5 hover:border-[#96a2b1]">
              <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{scope.matrix.leftTitle}</h3>
              <ul className="grid gap-2">
                {scope.matrix.leftItems.map((item) => (
                  <li key={item} className="border-b border-dashed pb-2 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border bg-[var(--panel)] p-4 transition-transform hover:-translate-y-0.5 hover:border-[#96a2b1]">
              <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{scope.matrix.rightTitle}</h3>
              <ul className="grid gap-2">
                {scope.matrix.rightItems.map((item) => (
                  <li key={item} className="border-b border-dashed pb-2 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">{scope.note}</p>
        </Reveal>

        <Reveal className="thin-rule border-t py-7" id="about">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight">{about.title}</h2>
          <p className="max-w-4xl leading-relaxed text-[var(--muted)]">{about.text}</p>
        </Reveal>

        <Reveal className="thin-rule border-t py-7" id="faq">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight">{faq.title}</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {faq.items.map((item) => (
              <details key={item.q} className="rounded-lg border bg-[var(--panel)] p-4 transition-transform hover:-translate-y-0.5 hover:border-[#96a2b1]">
                <summary className="cursor-pointer text-base font-medium">{item.q}</summary>
                <p className="mt-3 text-sm text-[var(--muted)]">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-7" id="contact">
          <h2 className="mb-2 text-2xl font-semibold tracking-tight">{contact.title}</h2>
          <p className="mb-4 text-[var(--muted)]">{contact.lead}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {contact.cards.map((card) => (
              <article key={card.email} className="rounded-lg border bg-[var(--panel)] p-4 transition-transform hover:-translate-y-0.5 hover:border-[#96a2b1]">
                <h3 className="mb-2 text-lg">{card.title}</h3>
                <Link className="focus-ring font-mono text-sm hover:underline" href={`mailto:${card.email}`}>
                  {card.email}
                </Link>
              </article>
            ))}
          </div>
        </Reveal>
      </main>

      <SiteFooter locale={locale} copy={copy} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
    </div>
  );
}
