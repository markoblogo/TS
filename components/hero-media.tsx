"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const MEDIA = [
  "/assets/hero/hero1.svg",
  "/assets/hero/hero2.svg",
  "/assets/hero/hero3.svg",
  "/assets/hero/hero4.svg"
] as const;

export function HeroMedia() {
  const [index, setIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % MEDIA.length);
    }, 8500);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      setScrollY(Math.min(window.scrollY * 0.06, 24));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  const offsetY = useMemo(() => scrollY, [scrollY]);

  return (
    <div className="absolute inset-0">
      {MEDIA.map((src, i) => {
        const isActive = i === index;

        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-800 ${isActive ? "opacity-100" : "opacity-0"}`}
            style={{ transform: `translateY(${reducedMotion ? 0 : offsetY}px)` }}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              className={`object-cover ${isActive && !reducedMotion ? "animate-kenBurns" : ""}`}
              sizes="(min-width: 1024px) 72vw, 100vw"
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute bottom-3.5 right-3.5 z-20 flex items-center gap-1.5">
        {MEDIA.map((_, i) => (
          <span
            key={i}
            className={`inline-flex h-1.5 w-1.5 rounded-full border border-white/50 ${
              i === index ? "bg-emeraldSignal" : "bg-white/60 dark:bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
