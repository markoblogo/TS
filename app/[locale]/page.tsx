import Link from "next/link";
import { notFound } from "next/navigation";

import { FxTicker } from "@/components/fx-ticker";
import { HeroMedia } from "@/components/hero-media";
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

      <main className="section-shell py-8 md:py-10">
        <Reveal className="pb-5">
          <section className="relative min-h-[420px] overflow-hidden rounded-xl border bg-[var(--panel)] md:min-h-[460px]">
            <HeroMedia />
            <div className="subtle-grid pointer-events-none absolute inset-0 z-10 opacity-30" />
            <div className="pointer-events-none absolute -left-3 bottom-2 z-10 text-[120px] font-light leading-none tracking-tight text-[var(--fg)] opacity-[0.07] md:text-[210px]">
              TS
            </div>

            <div className="relative z-20 grid gap-5 p-5 md:p-7 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
              <div className="grid content-start gap-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{copy.brand.subtagline[locale]}</p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
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
                    className="focus-ring rounded border border-emeraldSignal bg-emeraldSignal px-3.5 py-2 text-sm font-medium text-white shadow-[0_0_0_rgba(14,124,102,0)] transition-all duration-200 hover:bg-[#0a6b58] hover:shadow-[0_0_20px_rgba(14,124,102,0.25)] active:bg-[#095a4b]"
                    href={hero.ctaPrimary.href}
                  >
                    {hero.ctaPrimary.label}
                  </Link>
                  <Link
                    className="focus-ring rounded border border-emeraldSignal px-3.5 py-2 text-sm font-medium text-[var(--fg)] transition-colors duration-200 hover:bg-[rgba(14,124,102,0.08)] active:bg-[rgba(14,124,102,0.14)]"
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
                className="rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7f8ea0] hover:shadow-[0_10px_20px_rgba(13,18,26,0.1)]"
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
                className="rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7f8ea0] hover:shadow-[0_10px_20px_rgba(13,18,26,0.1)]"
              >
                <h3 className="mb-2 text-lg">{step.title}</h3>
                <p className="mb-3 text-sm text-[var(--muted)]">{step.text}</p>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{step.meta.join(" · ")}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-6" id="scope">
          <h2 className="mb-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
            {scope.title}
          </h2>
          <p className="mb-3 text-[var(--muted)]">{scope.subtitle}</p>
          <div className="grid gap-3 md:grid-cols-2">
            <section className="rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7f8ea0] hover:shadow-[0_10px_20px_rgba(13,18,26,0.1)]">
              <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{scope.matrix.leftTitle}</h3>
              <ul className="grid gap-2">
                {scope.matrix.leftItems.map((item) => (
                  <li key={item} className="border-b border-dashed pb-2 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7f8ea0] hover:shadow-[0_10px_20px_rgba(13,18,26,0.1)]">
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

        <Reveal className="thin-rule border-t py-6" id="faq">
          <h2 className="mb-3 flex items-center gap-2 text-2xl font-semibold tracking-tight">
            <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
            {faq.title}
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {faq.items.map((item) => (
              <details
                key={item.q}
                className="rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7f8ea0] hover:shadow-[0_10px_20px_rgba(13,18,26,0.1)]"
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
                className="rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#7f8ea0] hover:shadow-[0_10px_20px_rgba(13,18,26,0.1)]"
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
