"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Asset = {
  id: string;
  src: string;
  title: string;
};

type GalleryCopy = {
  open: string;
  download: string;
  close: string;
  zoom: string;
};

type Props = {
  assets: Asset[];
  copy: GalleryCopy;
  columnsClassName?: string;
};

function FocusTrapModal({
  asset,
  copy,
  onClose
}: {
  asset: Asset;
  copy: GalleryCopy;
  onClose: () => void;
}) {
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const root = dialogRef.current;
    const closeButton = root?.querySelector<HTMLButtonElement>("[data-close]");
    closeButton?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !root) return;

      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true">
      <div ref={dialogRef} className="relative flex max-h-[92vh] w-full max-w-6xl flex-col rounded-xl border bg-[var(--panel)] shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
          <p className="truncate text-sm font-medium">{asset.title}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setZoomed((v) => !v)}
              className="focus-ring rounded border px-3 py-1.5 text-xs hover:border-emeraldSignal"
            >
              {copy.zoom}
            </button>
            <a
              href={asset.src}
              download
              className="focus-ring rounded border px-3 py-1.5 text-xs hover:border-emeraldSignal"
            >
              {copy.download}
            </a>
            <button
              type="button"
              data-close
              onClick={onClose}
              className="focus-ring rounded border px-3 py-1.5 text-xs hover:border-emeraldSignal"
            >
              {copy.close}
            </button>
          </div>
        </div>

        <div className="overflow-auto p-3 md:p-4">
          <div className="mx-auto w-fit overflow-auto rounded-lg border bg-black/10 dark:bg-black/30">
            <img
              src={asset.src}
              alt={asset.title}
              className={`block h-auto max-w-full origin-top-left transition-transform duration-300 ${zoomed ? "scale-[1.7]" : "scale-100"}`}
            />
          </div>
        </div>
      </div>
      <button type="button" aria-label={copy.close} className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}

export function BrandGallery({ assets, copy, columnsClassName = "md:grid-cols-2 lg:grid-cols-3" }: Props) {
  const [selected, setSelected] = useState<Asset | null>(null);

  return (
    <>
      <div className={`grid gap-3 ${columnsClassName}`}>
        {assets.map((asset) => (
          <article key={asset.id} className="interactive-card rounded-xl border bg-[var(--panel)] p-3 shadow-[0_6px_18px_rgba(13,18,26,0.06)]">
            <button
              type="button"
              onClick={() => setSelected(asset)}
              className="focus-ring group relative block w-full overflow-hidden rounded-lg border"
              aria-label={`${copy.open}: ${asset.title}`}
            >
              <div className="relative aspect-[16/10] w-full bg-[var(--panel)]">
                <Image src={asset.src} alt={asset.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            </button>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="truncate text-xs text-[var(--muted)]">{asset.title}</p>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setSelected(asset)} className="focus-ring rounded border px-2 py-1 text-xs hover:border-emeraldSignal">
                  {copy.open}
                </button>
                <a href={asset.src} download className="focus-ring rounded border px-2 py-1 text-xs hover:border-emeraldSignal">
                  {copy.download}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selected ? <FocusTrapModal asset={selected} copy={copy} onClose={() => setSelected(null)} /> : null}
    </>
  );
}
