import Link from "next/link";
import { notFound } from "next/navigation";

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

      <main className="section-shell relative py-16 md:py-20">
        <div className="pointer-events-none absolute left-0 top-2 z-0 text-[180px] font-light leading-none tracking-tight text-[var(--fg)] opacity-[0.055] md:text-[280px]">
          TS
        </div>

        <Reveal className="relative z-10 grid gap-8 pb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{copy.brand.subtagline[locale]}</p>
          <h1 className="max-w-4xl text-4xl font-light tracking-tight md:text-6xl">
            {hero.h1Lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="max-w-4xl text-base text-[var(--muted)] md:text-lg">
            {hero.leadLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="grid gap-3 border p-4 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Domain</p>
              <p className="font-mono text-sm">{copy.brand.domain}</p>
            </div>
            <Link className="focus-ring rounded border px-3 py-2 text-sm hover:bg-[var(--panel)]" href={hero.ctaPrimary.href}>
              {hero.ctaPrimary.label}
            </Link>
            <Link className="focus-ring rounded border px-3 py-2 text-sm hover:bg-[var(--panel)]" href={hero.ctaSecondary.href}>
              {hero.ctaSecondary.label}
            </Link>
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-12" id="solutions">
          <h2 className="mb-2 text-2xl font-light tracking-tight">{solutions.title}</h2>
          <p className="mb-6 text-[var(--muted)]">{solutions.subtitle}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {solutions.items.map((item) => (
              <article key={item.title} className="rounded-xl border bg-[var(--panel)] p-6">
                <h3 className="mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-12" id="process">
          <h2 className="mb-6 text-2xl font-light tracking-tight">{process.title}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {process.steps.map((step) => (
              <article key={step.title} className="rounded-xl border bg-[var(--panel)] p-6">
                <h3 className="mb-2 text-lg">{step.title}</h3>
                <p className="mb-3 text-sm text-[var(--muted)]">{step.text}</p>
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]">{step.meta.join(" · ")}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-12" id="scope">
          <h2 className="mb-2 text-2xl font-light tracking-tight">{scope.title}</h2>
          <p className="mb-6 text-[var(--muted)]">{scope.subtitle}</p>
          <div className="grid gap-8 md:grid-cols-2">
            <section className="rounded-xl border bg-[var(--panel)] p-6">
              <h3 className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">{scope.matrix.leftTitle}</h3>
              <ul className="grid gap-2">
                {scope.matrix.leftItems.map((item) => (
                  <li key={item} className="border-b border-dashed pb-2 last:border-b-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section className="rounded-xl border bg-[var(--panel)] p-6">
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
          <p className="mt-4 text-sm text-[var(--muted)]">{scope.note}</p>
        </Reveal>

        <Reveal className="thin-rule border-t py-12" id="about">
          <h2 className="mb-3 text-2xl font-light tracking-tight">{about.title}</h2>
          <p className="max-w-4xl text-[var(--muted)]">{about.text}</p>
        </Reveal>

        <Reveal className="thin-rule border-t py-12" id="faq">
          <h2 className="mb-6 text-2xl font-light tracking-tight">{faq.title}</h2>
          <div className="grid gap-3">
            {faq.items.map((item) => (
              <details key={item.q} className="rounded-xl border bg-[var(--panel)] p-5">
                <summary className="cursor-pointer text-base font-medium">{item.q}</summary>
                <p className="mt-3 text-sm text-[var(--muted)]">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal className="thin-rule border-t py-12" id="contact">
          <h2 className="mb-2 text-2xl font-light tracking-tight">{contact.title}</h2>
          <p className="mb-6 text-[var(--muted)]">{contact.lead}</p>
          <div className="grid gap-4 md:grid-cols-2">
            {contact.cards.map((card) => (
              <article key={card.email} className="rounded-xl border bg-[var(--panel)] p-6">
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
