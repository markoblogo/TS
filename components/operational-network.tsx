type Props = {
  title: string;
  items: string[];
};

export function OperationalNetwork({ title, items }: Props) {
  return (
    <section id="network" className="grid gap-3">
      <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
        <span className="inline-flex h-2 w-2 rounded-sm bg-emeraldSignal animate-riseFade" aria-hidden="true" />
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <article
            key={item}
            className="rounded-lg border bg-[var(--panel)] px-3 py-2.5 shadow-[0_2px_8px_rgba(13,18,26,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-[0_10px_20px_rgba(13,18,26,0.1)]"
          >
            <p className="flex items-center gap-2 text-sm font-medium">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emeraldSignal" aria-hidden="true" />
              {item}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
