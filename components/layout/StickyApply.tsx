"use client";

import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { siteConfig } from "@/config/site";
import { slideUpMotion } from "@/lib/motion";
import { ApplyRepayButton } from "@/components/ussd/ApplyRepayButton";

/**
 * Persistent Apply / Repay action for phones (the header button covers larger
 * screens). Slides up once the visitor scrolls past the hero.
 */
export function StickyApply() {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > 520));

  return (
    <AnimatePresence>
      {show && (
        <m.div
          {...slideUpMotion}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-neu-200 bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden"
        >
          <div className="mx-auto flex max-w-md items-center justify-between gap-3">
            <div>
              <p className="text-xs text-neu-600">Dial on any phone</p>
              <p className="font-mono text-lg font-semibold leading-tight text-ter-700">{siteConfig.ussd.code}</p>
            </div>
            <ApplyRepayButton placement="top-end" size="md" source="sticky-bar" />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
