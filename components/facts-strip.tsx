type Props = {
  items: string[];
};

export function FactsStrip({ items }: Props) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, idx) => (
        <article
          key={item}
          className="facts-item interactive-card group min-h-[74px] rounded-lg border bg-[var(--panel)] p-3.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)]"
          style={{ ["--stagger" as string]: `${idx * 80}ms` }}
        >
          <p className="flex items-start gap-2.5 text-sm font-medium tracking-tight">
            <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-sm bg-emeraldSignal transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            {item}
          </p>
        </article>
      ))}
    </section>
  );
}
