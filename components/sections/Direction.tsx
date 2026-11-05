import { direction } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Direction() {
  return (
    <section className="bg-neu-100 py-20 lg:py-28">
      <Container>
        <SectionHeading tone="ter" eyebrow="Direction" title="Fix the foundations, then scale." body="We build in a deliberate order: the repayment rails first, then the network, then the intelligence." />
        <Stagger as="ol" gap={0.12} className="mt-12 grid gap-4 lg:grid-cols-3">
          {direction.map((d) => (
            <StaggerItem as="li" key={d.when} className="rounded-2xl border border-neu-300 bg-white p-7">
              <p className="eyebrow text-ter-700">{d.when}</p>
              <h3 className="mt-3 text-xl font-bold text-neu-900">{d.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-neu-600">{d.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal as="p" className="mt-5 text-xs text-neu-600">This shows direction of travel, not a commitment on timing.</Reveal>
      </Container>
    </section>
  );
}
