import Link from "next/link";
import { notFound } from "next/navigation";

import { FactsStrip } from "@/components/facts-strip";
import { FxTicker } from "@/components/fx-ticker";
import { FuturesStrip } from "@/components/futures-strip";
import { HeroMedia } from "@/components/hero-media";
import { Markets } from "@/components/markets";
import { MoodTeaser } from "@/components/mood-teaser";
import { OperationalNetwork } from "@/components/operational-network";
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
  const factsStrip = copy.factsStrip[locale];
  const markets = copy.markets[locale];
  const network = copy.network[locale];
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

      <main className="section-shell py-8 md:py-10">
        <div className="mb-4">
          <FuturesStrip copy={copy.futures[locale]} />
        </div>

        <Reveal className="pb-5">
          <section className="relative min-h-[380px] overflow-hidden rounded-xl border bg-[var(--panel)] sm:min-h-[410px] md:min-h-[460px]">
            <HeroMedia />
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[78%] bg-gradient-to-r from-white/85 via-white/45 to-transparent dark:from-black/70 dark:via-black/35 dark:to-transparent sm:w-[72%] md:w-[62%] lg:w-[55%]" />
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.20),transparent_54%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.24),transparent_56%)]" />
            <div className="subtle-grid pointer-events-none absolute inset-0 z-10 opacity-30" />
            <div className="pointer-events-none absolute -left-3 bottom-2 z-10 hidden text-[120px] font-light leading-none tracking-tight text-[var(--fg)] opacity-[0.07] sm:block md:text-[210px]">
              TS
            </div>

            <div className="relative z-20 grid gap-4 p-4 sm:gap-5 sm:p-5 md:p-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
              <div className="grid content-start gap-4">
                <div className="max-w-[520px] rounded-2xl bg-white/75 p-4 shadow-[0_12px_34px_rgba(0,0,0,0.12)] backdrop-blur-md ring-1 ring-black/10 dark:bg-black/50 dark:shadow-[0_14px_36px_rgba(0,0,0,0.2)] dark:ring-white/10 sm:p-5 lg:ml-5 lg:max-w-[560px] lg:p-6">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:text-xs">{copy.brand.subtagline[locale]}</p>
                  <h1 className="hero-heading-shadow mt-2 max-w-4xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl">
                    {hero.h1Lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>
                  <p className="hero-copy-shadow mt-2.5 max-w-4xl text-sm text-slate-700 dark:text-slate-200 sm:text-base md:mt-3 md:text-[17px]">
                    {hero.leadLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                  <div className="mt-3.5 grid gap-2 sm:mt-4 sm:flex sm:flex-wrap sm:items-center sm:gap-2.5">
                    <Link
                      className="focus-ring rounded border border-emeraldSignal bg-emeraldSignal px-3.5 py-2 text-center text-sm font-medium text-white shadow-[0_0_0_rgba(14,124,102,0)] transition-all duration-200 hover:-translate-y-px hover:bg-[#0a6b58] hover:shadow-[0_0_20px_rgba(14,124,102,0.25)] active:scale-[0.98] active:bg-[#095a4b] sm:text-left"
                      href={hero.ctaPrimary.href}
                    >
                      {hero.ctaPrimary.label}
                    </Link>
                    <Link
                      className="focus-ring rounded border border-emeraldSignal px-3.5 py-2 text-center text-sm font-medium text-[var(--fg)] transition-all duration-200 hover:-translate-y-px hover:bg-[rgba(14,124,102,0.08)] active:scale-[0.98] active:bg-[rgba(14,124,102,0.14)] sm:text-left"
                      href={hero.ctaSecondary.href}
                    >
                      {hero.ctaSecondary.label}
                    </Link>
                  </div>
                </div>
              </div>

              {copy.live.fx.enabled ? (
                <aside className="w-full max-w-[340px] sm:max-w-[360px] lg:self-start lg:justify-self-end">
                  <FxTicker
                    title="FX REFERENCE RATES"
                    pairs={copy.live.fx.pairs}
                    label={copy.live.fx.sourceLabel[locale]}
                    fixedConversion={copy.live.fx.staticNote[locale]}
                    unavailable={copy.ui[locale].ratesUnavailable}
                  />
                  <span className="mt-3 inline-flex h-2.5 w-2.5 rounded-sm bg-emeraldSignal animate-pulseSignal" aria-hidden="true" />
                </aside>
              ) : null}
            </div>
          </section>
        </Reveal>

        <Reveal className="thin-rule border-t py-6" id="solutions">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
            {solutions.title}
          </h2>
          <p className="mb-3 text-[var(--muted)]">{solutions.subtitle}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {solutions.items.map((item) => (
              <article
                key={item.title}
                className="interactive-card rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)]"
              >
                <h3 className="mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-6" id="process">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
            {process.title}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {process.steps.map((step) => (
              <article
                key={step.title}
                className="interactive-card rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)]"
              >
                <h3 className="mb-2 text-lg">{step.title}</h3>
                <p className="mb-3 text-sm text-[var(--muted)]">{step.text}</p>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{step.meta.join(" · ")}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-6">
          <FactsStrip items={factsStrip.items} />
        </Reveal>

        <Reveal className="thin-rule border-t py-6">
          <Markets title={markets.title} subtitle={markets.subtitle} items={markets.items} markers={markets.markers} />
        </Reveal>

        <Reveal className="thin-rule border-t py-6">
          <OperationalNetwork title={network.title} items={network.items} />
        </Reveal>

        <Reveal className="thin-rule border-t py-6" id="scope">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
            {scope.title}
          </h2>
          <p className="mb-3 text-[var(--muted)]">{scope.subtitle}</p>
          <div className="grid gap-3 md:grid-cols-2">
            <section className="interactive-card rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)]">
              <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{scope.matrix.leftTitle}</h3>
              <ul className="grid gap-2">
                {scope.matrix.leftItems.map((item) => (
                  <li key={item} className="border-b border-dashed pb-2 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="interactive-card rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)]">
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

        <Reveal className="thin-rule border-t py-6" id="about">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
            {about.title}
          </h2>
          <p className="max-w-4xl leading-relaxed text-[var(--muted)]">{about.text}</p>
        </Reveal>

        <Reveal className="py-4">
          <MoodTeaser />
        </Reveal>

        <Reveal className="thin-rule border-t py-6" id="faq">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
            {faq.title}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {faq.items.map((item) => (
              <details
                key={item.q}
                className="interactive-card rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)]"
              >
                <summary className="cursor-pointer text-base font-medium">{item.q}</summary>
                <p className="mt-3 text-sm text-[var(--muted)]">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-6" id="contact">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
            {contact.title}
          </h2>
          <p className="mb-3 text-[var(--muted)]">{contact.lead}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {contact.cards.map((card) => (
              <article
                key={card.email}
                className="interactive-card rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)]"
              >
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
