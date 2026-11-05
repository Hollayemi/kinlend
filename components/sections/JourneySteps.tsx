import type { ReactNode } from "react";
import { actorTone, journey } from "@/config/pages";
import { tones } from "@/lib/tone";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ApplyVisual, LadderVisual, ReceiptVisual, ReceiveVisual, RepayVisual, VouchVisual } from "./journey/Visuals";

const visuals: Record<(typeof journey)[number]["visual"], ReactNode> = {
  vouch: <VouchVisual />,
  apply: <ApplyVisual />,
  receive: <ReceiveVisual />,
  repay: <RepayVisual />,
  receipt: <ReceiptVisual />,
  ladder: <LadderVisual />,
};

/** The six-step borrower journey, alternating text and illustration. */
export function JourneySteps() {
  return (
    <section id="journey" className="scroll-mt-24 bg-neu-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="The journey"
          title="Six steps, from first conversation to a bigger loan."
          body="Here is exactly what happens, who does what, and where your money goes at each step."
        />

        <ol className="mt-16 space-y-20 lg:space-y-28">
          {journey.map((step, i) => (
            <li key={step.n} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
              <Reveal className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2")}>
                <p className="font-display text-[4.5rem] font-extrabold leading-none tabular-nums text-neu-200 lg:text-[6rem]">{step.n}</p>
                <h3 className="mt-2 text-[1.875rem] font-bold leading-tight text-neu-900 sm:text-[2.25rem]">{step.title}</h3>
                <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-neu-600">{step.body}</p>

                <ul className="mt-6 divide-y divide-neu-200 border-y border-neu-200">
                  {step.actors.map((a) => (
                    <li key={a.who + a.what} className="flex items-baseline gap-4 py-3">
                      <span className="flex w-24 shrink-0 items-center gap-2 text-sm font-semibold text-neu-900">
                        <span aria-hidden className={cn("h-2 w-2 rounded-full", tones[actorTone[a.who]].dot)} />
                        {a.who}
                      </span>
                      <span className="text-[0.9375rem] leading-relaxed text-neu-700">{a.what}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal direction={i % 2 === 1 ? "right" : "left"} className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-1")}>
                {visuals[step.visual]}
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
