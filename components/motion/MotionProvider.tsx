"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Loads only the DOM animation features (a fraction of the full bundle, which
 * matters on a low-end phone over 3G) and honours the visitor's
 * reduced-motion setting everywhere. Use `m.*` components, not `motion.*`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
