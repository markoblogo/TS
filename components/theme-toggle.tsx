"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type Props = {
  label: string;
  lightLabel: string;
  darkLabel: string;
};

export function ThemeToggle({ label, lightLabel, darkLabel }: Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className="focus-ring inline-flex h-9 items-center justify-center rounded-full border px-3 text-xs font-medium uppercase tracking-[0.14em]"
      aria-label={label}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? darkLabel : lightLabel}
    </button>
  );
}
