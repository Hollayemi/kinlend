"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Vertical rail that fills as the reader scrolls through the steps.
 * Children render to the right of the rail; give each a `pl-*` that clears it.
 */
export function ProgressTimeline({ children, className, railClassName = "left-[1.375rem]" }: { children: ReactNode; className?: string; railClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <span aria-hidden className={cn("absolute top-3 bottom-3 w-px bg-neu-300", railClassName)} />
      <m.span aria-hidden style={{ scaleY }} className={cn("absolute top-3 bottom-3 w-px origin-top bg-pri-600", railClassName)} />
      {children}
    </div>
  );
}
