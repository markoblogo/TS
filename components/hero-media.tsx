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

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % MEDIA.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(Math.min(window.scrollY * 0.06, 24));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const offsetY = useMemo(() => scrollY, [scrollY]);

  return (
    <div className="absolute inset-0">
      {MEDIA.map((src, i) => {
        const isActive = i === index;

        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              className="object-cover transition-transform duration-[7000ms] ease-out"
              style={{ transform: `translateY(${offsetY}px) scale(${isActive ? 1.02 : 1})` }}
              sizes="(min-width: 1024px) 72vw, 100vw"
            />
          </div>
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/35 to-white/12 dark:from-black/60 dark:via-black/35 dark:to-black/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(14,124,102,0.14),transparent_44%)] dark:bg-[radial-gradient(circle_at_80%_20%,rgba(25,161,131,0.16),transparent_46%)]" />
    </div>
  );
}
