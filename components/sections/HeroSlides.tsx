"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";

const INTERVAL_MS = 6500;

/**
 * Full-bleed photos that slide in from the right behind the hero, with a dark
 * green overlay so the headline always reads. The first photo is rendered on
 * the server and marked priority; auto-advance stops with reduced motion and
 * while the tab is hidden. Dots let the visitor pick a slide.
 */
export function HeroSlides() {
  const slides = siteConfig.heroSlides;
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  // `i` is a dependency so a manual click restarts the timer.
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => {
      if (!document.hidden) setI((n) => (n + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, [reduced, slides.length, i]);

  const slide = slides[i];

  return (
    <>
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-pri-900">
        <AnimatePresence initial={false}>
          <m.div
            key={i}
            className="absolute inset-0"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-22%", opacity: 0.4 }}
            transition={{ duration: 1.1, ease: easeOut }}
          >
            <Media slot={slide} tone={slide.tone} priority={i === 0} sizes="100vw" />
          </m.div>
        </AnimatePresence>

        {/* Legibility: green wash from the text side, darker at the top for the header. */}
        <div className="absolute inset-0 bg-gradient-to-r from-pri-900/95 via-pri-900/75 to-pri-900/35" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-6 z-20">
        <Container className="flex items-center gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero photos">
            {slides.map((s, n) => (
              <button
                key={s.src}
                type="button"
                role="tab"
                aria-selected={n === i}
                aria-label={s.label}
                onClick={() => setI(n)}
                className="grid h-6 place-items-center px-0.5"
              >
                <span className={cn("block h-1.5 rounded-full bg-white transition-all duration-300", n === i ? "w-8" : "w-3 opacity-45 hover:opacity-80")} />
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <m.p
              key={i}
              className="text-sm font-medium text-white/85"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {slide.label}
            </m.p>
          </AnimatePresence>
        </Container>
      </div>
    </>
  );
}
