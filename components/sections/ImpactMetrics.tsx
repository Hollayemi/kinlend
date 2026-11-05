import { impactMetrics, metricsPlanned } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Only verified, sourced numbers are ever shown (PRD section 16: do not
 * over-promise). Add entries to `impactMetrics` in config/pages.ts as they are
 * confirmed; until then this shows what will be reported.
 */
export function ImpactMetrics({ eyebrow = "Traction", title = "Our numbers, published as they are verified." }: { eyebrow?: string; title?: string }) {
  const has = impactMetrics.length > 0;
  return (
    <section id="traction" className="scroll-mt-24 bg-neu-100 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          body="We would rather show you a real figure with its source than a big one without. Each number below carries where it comes from and the date it covers."
        />

        {has ? (
          <Stagger as="ul" gap={0.08} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-neu-300 bg-neu-300 sm:grid-cols-2 lg:grid-cols-3">
            {impactMetrics.map((m) => (
              <StaggerItem as="li" key={m.label} className="bg-white p-7">
                <p className="text-sm font-semibold text-neu-600">{m.label}</p>
                <p className="mt-2 text-5xl font-extrabold tabular-nums text-pri-700">{m.value}</p>
                {m.note && <p className="mt-2 text-sm text-neu-600">{m.note}</p>}
                <p className="mt-4 text-xs text-neu-500">Source: {m.source}. As of {m.asOf}.</p>
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <>
            <Stagger as="ul" gap={0.07} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-neu-300 bg-neu-300 sm:grid-cols-2 lg:grid-cols-3">
              {metricsPlanned.map((l) => (
                <StaggerItem as="li" key={l} className="bg-white p-7">
                  <p className="text-sm font-semibold text-neu-700">{l}</p>
                  <p aria-hidden className="mt-2 font-mono text-5xl font-semibold text-neu-300">- - -</p>
                  <p className="mt-4 text-xs text-neu-600">To be reported from verified programme data.</p>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal as="p" className="mt-6 max-w-2xl text-sm leading-relaxed text-neu-600">
              These are the measures we will report, with sources and dates. Nothing is estimated or rounded up.
            </Reveal>
          </>
        )}
      </Container>
    </section>
  );
}
