"use client";

import { m } from "framer-motion";
import { scoreActions } from "@/config/pages";
import { easeOut, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Arc gauge. Purely illustrative: it never shows or implies a real score. */
function Gauge() {
  const arc = "M 30 150 A 110 110 0 0 1 250 150";
  return (
    <svg viewBox="0 0 280 190" role="img" aria-label="Illustration of a KinScore gauge rising from Bronze through Silver to Gold" className="w-full max-w-sm">
      <path d={arc} fill="none" stroke="white" strokeOpacity={0.15} strokeWidth={18} strokeLinecap="round" />
      <m.path
        d={arc}
        fill="none"
        stroke="var(--color-acc-300)"
        strokeWidth={18}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 0.72 }}
        viewport={viewportOnce}
        transition={{ duration: 1.6, ease: easeOut }}
      />
      <text x="140" y="112" textAnchor="middle" fill="white" fontSize="30" fontWeight="800">KinScore</text>
      <text x="140" y="136" textAnchor="middle" fill="white" fillOpacity={0.7} fontSize="12">Illustration</text>
      {[["Bronze", 30], ["Silver", 140], ["Gold", 250]].map(([l, x]) => (
        <text key={l as string} x={x as number} y={178} textAnchor="middle" fill="white" fillOpacity={0.85} fontSize="12" fontWeight="600">{l}</text>
      ))}
    </svg>
  );
}

export function KinScoreExplainer() {
  return (
    <section className="bg-ter-900 py-20 text-white lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            tone="ter"
            onDark
            eyebrow="KinScore"
            title="Repay well, climb the ladder."
            body="Your KinScore is KINLEND's measure of trust. The more reliably you and your community repay, the stronger it gets, and the more you can borrow. A thin credit file is a starting point, not a dead end."
          />
          <Stagger as="ul" gap={0.1} className="mt-10 divide-y divide-white/15 border-y border-white/15">
            {scoreActions.map((a) => (
              <StaggerItem as="li" key={a.title} className="py-5">
                <h3 className="text-lg font-bold">{a.title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/75">{a.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <Reveal scale className="flex justify-center lg:col-span-5">
          <Gauge />
        </Reveal>
      </Container>
    </section>
  );
}
