import { Fragment } from "react";
import { ArrowRight, ArrowDown, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

// Only name channels that are live, so the page never over-promises (PRD section 16).
const live = siteConfig.channels.filter((c) => c.status === "live").map((c) => c.name);
const channels = live.join(" · ") + (live.length < siteConfig.channels.length ? " and more as they open" : "");

/** Where repayments go, drawn as a simple left-to-right flow (stacks on phones). */
export function MoneyFlow() {
  const nodes = [
    { label: "You", sub: "Repay with your phone" },
    { label: "A KINLEND channel", sub: channels },
    { label: "KINLEND", sub: "Receives the money directly" },
    { label: "SMS receipt", sub: "Back to you, straight away" },
  ];

  return (
    <section className="bg-ter-900 py-20 text-white lg:py-28">
      <Container>
        <SectionHeading
          tone="ter"
          onDark
          eyebrow="Where your money goes"
          title="Never through an agent's hands."
          body="Every repayment goes digitally and directly to KINLEND. That is how you stay protected, and how every payment is on record."
        />

        <Stagger as="ol" gap={0.12} className="mt-14 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {nodes.map((n, i) => (
            <Fragment key={n.label}>
              <StaggerItem as="li" className="rounded-xl border border-white/20 bg-white/5 p-5">
                <p className="text-lg font-bold">{n.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{n.sub}</p>
              </StaggerItem>
              {i < nodes.length - 1 && (
                <li key={`a${i}`} aria-hidden className="grid place-items-center text-ter-300">
                  <ArrowDown className="h-5 w-5 lg:hidden" />
                  <ArrowRight className="hidden h-5 w-5 lg:block" />
                </li>
              )}
            </Fragment>
          ))}
        </Stagger>

        <Reveal className="mt-8 flex items-start gap-4 rounded-xl border border-dashed border-white/30 p-5">
          <span aria-hidden className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10">
            <X className="h-4 w-4" />
          </span>
          <p className="text-[0.9375rem] leading-relaxed text-white/85">
            <strong className="font-semibold text-white">Not in the picture: an agent's pocket.</strong> A KinMaster vets and vouches. They never collect, hold or pass on your repayment.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
