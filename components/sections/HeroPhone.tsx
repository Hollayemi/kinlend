"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ussdStages } from "@/config/content";
import { cn } from "@/lib/cn";
import { PhoneDialDemo } from "@/components/ussd/PhoneDialDemo";

/**
 * The phone demo for the hero. It slides up from below on every page load
 * (CSS animation, so it starts before JavaScript hydrates), then plays the
 * dial-and-repay walkthrough. Dots under the phone follow, and jump to, each stage.
 */
export function HeroPhone() {
  const [stage, setStage] = useState(0);
  const [jump, setJump] = useState<{ stage: number; nonce: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.2 });

  return (
    // Desktop: slides up on load. Phones: the demo starts below the fold, so it
    // slides up when it scrolls into view. data-reveal keeps it visible without JS.
    <div
      ref={ref}
      data-reveal
      className={cn("flex flex-col items-center lg:animate-slide-up", seen ? "max-lg:animate-slide-up" : "max-lg:opacity-0")}
    >
      <PhoneDialDemo onStageChange={setStage} jump={jump} />

      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2" role="group" aria-label="Demo steps">
          {ussdStages.map((s, i) => (
            <button
              key={s.title}
              type="button"
              aria-label={`Step ${i + 1}: ${s.title}`}
              aria-current={stage === i ? "step" : undefined}
              onClick={() => setJump({ stage: i, nonce: Date.now() })}
              className="grid h-6 place-items-center px-0.5"
            >
              <span className={cn("block h-1.5 rounded-full bg-white transition-all duration-300", stage === i ? "w-8" : "w-3 opacity-45 hover:opacity-80")} />
            </button>
          ))}
        </div>
        <p className="text-sm font-medium text-white/90" aria-live="off">
          <span className="font-mono text-white/60">0{stage + 1}</span> {ussdStages[stage].title}
        </p>
        <p className="text-xs text-white/60">Illustration. Names and amounts are examples.</p>
      </div>
    </div>
  );
}
