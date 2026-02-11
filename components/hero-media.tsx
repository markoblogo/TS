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
    }, 7000);

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
            className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
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

      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/35 to-transparent dark:from-black/70 dark:via-black/35 dark:to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.36),transparent_58%)] dark:bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.38),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,124,102,0.12),transparent_44%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(25,161,131,0.16),transparent_46%)]" />
    </div>
  );
}
