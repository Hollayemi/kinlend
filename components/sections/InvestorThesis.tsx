import { modelAtAGlance, thesis } from "@/config/pages";
import { tones } from "@/lib/tone";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function InvestorThesis() {
  return (
    <section className="bg-neu-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          tone="ter"
          eyebrow="The thesis"
          title="Collateral-free lending that is accountable by design."
          body="KINLEND is community trust infrastructure that happens to lend. Three ideas, working together, make it repayable."
        />
        <Stagger as="ul" gap={0.1} className="mt-12 grid gap-4 lg:grid-cols-3">
          {thesis.map((t, i) => {
            const tone = tones[t.tone];
            return (
              <StaggerItem as="li" key={t.title} className="overflow-hidden rounded-2xl border border-neu-200 bg-white">
                <span aria-hidden className={cn("block h-1.5", tone.fill)} />
                <div className="p-7">
                  <p className={cn("font-mono text-sm font-semibold", tone.text)}>0{i + 1}</p>
                  <h3 className="mt-3 text-xl font-bold leading-snug text-neu-900">{t.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-neu-600">{t.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-14">
          <p className="eyebrow text-neu-600">The model at a glance</p>
          <dl className="mt-4 divide-y divide-neu-300 border-y border-neu-300">
            {modelAtAGlance.map((r) => (
              <div key={r.k} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-8">
                <dt className="font-semibold text-neu-900">{r.k}</dt>
                <dd className="text-neu-700">{r.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
