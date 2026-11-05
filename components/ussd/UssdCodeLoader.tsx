"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Phase = "typing" | "connecting" | "ready";

const sizes = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
  xl: "text-6xl sm:text-7xl",
} as const;

const tones = {
  /** On light backgrounds. */
  ink: "text-ter-700",
  /** On dark backgrounds. */
  light: "text-white",
} as const;

const TYPE_MS = 170; // per character
const CONNECT_MS = 1500; // "connecting" bar
const HOLD_MS = 2600; // how long the finished code rests before looping

const labels: Record<Phase, string> = {
  typing: "Dialing…",
  connecting: "Connecting to KINLEND…",
  ready: "Ready. Dial now.",
};

/**
 * The USSD short-code, animated like it is being dialed: characters type in
 * one at a time with a caret, a progress bar sweeps while "connecting", then it
 * settles on "Ready".
 *
 * Reads the code from siteConfig.ussd.code (or pass `code`). Renders the full
 * code on the server and with reduced motion, so it is always readable.
 */
export function UssdCodeLoader({
  code = siteConfig.ussd.code,
  size = "lg",
  tone = "ink",
  loop = true,
  status = true,
  className,
}: {
  code?: string;
  size?: keyof typeof sizes;
  tone?: keyof typeof tones;
  /** Replay after a short rest. When false it plays once. */
  loop?: boolean;
  /** Show the progress bar and status line under the code. */
  status?: boolean;
  className?: string;
}) {
  const chars = useMemo(() => Array.from(code), [code]);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-8% 0px" });
  const played = useRef(false);

  const [count, setCount] = useState(chars.length);
  const [phase, setPhase] = useState<Phase>("ready");

  useEffect(() => {
    if (reduced || !inView) return;
    if (!loop && played.current) return;
    played.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    const run = () => {
      setCount(0);
      setPhase("typing");
      chars.forEach((_, i) => at(380 + i * TYPE_MS, () => setCount(i + 1)));
      const typed = 380 + chars.length * TYPE_MS;
      at(typed + 220, () => setPhase("connecting"));
      at(typed + 220 + CONNECT_MS, () => setPhase("ready"));
      if (loop) at(typed + 220 + CONNECT_MS + HOLD_MS, run);
    };
    run();

    return () => timers.forEach(clearTimeout);
  }, [chars, reduced, inView, loop]);

  const caret = (side: "left" | "right") => (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-[0.1em] top-[0.1em] w-[0.07em] animate-caret rounded-full bg-current",
        side === "left" ? "-left-[0.05em]" : "-right-[0.05em]",
      )}
    />
  );

  return (
    <div ref={ref} className={cn("inline-flex flex-col items-start gap-3", className)}>
      <span className="sr-only">USSD code {code}</span>

      <div aria-hidden className={cn("relative inline-flex font-mono font-semibold leading-none tabular-nums", sizes[size], tones[tone])}>
        {chars.map((ch, i) => (
          <span key={i} className="relative inline-flex">
            {phase === "typing" && count === i && caret("left")}
            <m.span
              data-reveal
              initial={false}
              animate={i < count ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: "0.3em", scale: 0.7 }}
              transition={spring.snappy}
              className="inline-block"
            >
              {ch}
            </m.span>
            {phase === "typing" && count === chars.length && i === chars.length - 1 && caret("right")}
          </span>
        ))}
      </div>

      {status && (
        <div aria-hidden className={cn("w-full min-w-[9rem]", tones[tone])}>
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-current/15">
            {phase === "connecting" ? (
              <m.span
                className="absolute inset-y-0 left-0 w-2/5 rounded-full bg-current"
                initial={{ x: "-100%" }}
                animate={{ x: "260%" }}
                transition={{ duration: 1.05, ease: "easeInOut", repeat: Infinity }}
              />
            ) : (
              <m.span
                className="absolute inset-0 origin-left rounded-full bg-current"
                initial={false}
                animate={{ scaleX: phase === "ready" ? 1 : count / chars.length }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            )}
          </div>
          <div className="mt-2 h-4 overflow-hidden text-xs font-medium tracking-wide opacity-80">
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={phase}
                className="block"
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {labels[phase]}
              </m.span>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
