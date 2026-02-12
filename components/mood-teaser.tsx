"use client";

import { useEffect, useRef, useState } from "react";

const MOOD_SRC =
  "https://www.youtube-nocookie.com/embed/YOFrlLiPY6A?autoplay=1&mute=1&loop=1&playlist=YOFrlLiPY6A&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3";

export function MoodTeaser() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) return;

    const node = wrapperRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -12% 0px"
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section className="thin-rule border-t pt-6">
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white/60 shadow-sm dark:border-white/10 dark:bg-white/5">
        <div ref={wrapperRef} className="aspect-video w-full">
          {isVisible ? (
            <iframe
              title="Trade Solutions mood teaser"
              src={MOOD_SRC}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <div className="relative h-full w-full overflow-hidden bg-[linear-gradient(120deg,rgba(148,163,184,0.22),rgba(148,163,184,0.08),rgba(148,163,184,0.16))] dark:bg-[linear-gradient(120deg,rgba(30,41,59,0.65),rgba(30,41,59,0.4),rgba(30,41,59,0.58))]">
              <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.35),transparent_32%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(148,163,184,0.15),transparent_36%)]" />
              <div className="subtle-grid absolute inset-0 opacity-20" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
