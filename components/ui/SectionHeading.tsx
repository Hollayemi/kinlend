import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { tones, type Tone } from "@/lib/tone";
import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "pri",
  onDark = false,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  tone?: Tone;
  onDark?: boolean;
  className?: string;
}) {
  const t = tones[tone];
  return (
    <div className={className}>
      <Reveal>
        <p className={cn("eyebrow", onDark ? t.textOnDark : t.text)}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className={cn("mt-3 text-[2rem] font-semibold leading-[1.08] sm:text-[2.6rem] lg:text-[3rem]", onDark ? "text-white" : "text-neu-900")}>{title}</h2>
      </Reveal>
      {body && (
        <Reveal delay={0.1}>
          <p className={cn("mt-5 max-w-[34rem] text-[1.0625rem] leading-relaxed", onDark ? "text-white/80" : "text-neu-600")}>{body}</p>
        </Reveal>
      )}
    </div>
  );
}
