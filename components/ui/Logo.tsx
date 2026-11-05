'use client';
import { cn } from "@/lib/cn";
import Image from "next/image";
import { useEffect, useState } from "react";


function useScrolledPast(threshold = 200) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setPast(window.scrollY > threshold);
        ticking = false;
      });
    };

    // Sync on mount in case the page loads mid-scroll (refresh / anchor link).
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return past;
}

/**
 * Placeholder mark: three overlapping circles in the brand trio (mission,
 * community, money). Replace with the supplied logo file when it arrives.
 */
export function LogoMark({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  const blend = onDark ? "screen" : "multiply";
  const c = onDark ? ["var(--color-pri-400)", "var(--color-sec-400)", "var(--color-ter-400)"] : ["var(--color-pri-600)", "var(--color-sec-600)", "var(--color-ter-600)"];
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("h-8 w-8", className)} style={{ isolation: "isolate" }}>
      <circle cx="12" cy="12.5" r="8" fill={c[0]} style={{ mixBlendMode: blend }} />
      <circle cx="20" cy="12.5" r="8" fill={c[1]} style={{ mixBlendMode: blend }} />
      <circle cx="16" cy="20" r="8" fill={c[2]} style={{ mixBlendMode: blend }} />
    </svg>
  );
}



export function Logo({
  keepDefault = false,
  className,
}: {
  keepDefault?: boolean;
  className?: string;
}) {
  const scrolledPast = useScrolledPast();
  const inverted = keepDefault ? false : scrolledPast;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/kinlend-logo.png"
        alt="KINLEND logo"
        width={900}
        height={900}
        className={cn(
          "h-8 w-34 mt-2 transition-[filter] duration-300 ease-out",
          inverted && "invert"
        )}
      />
    </span>
  );
}