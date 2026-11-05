import { socialReturn } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function SocialReturn() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Social return" title="Return that goes beyond the loan book." body="We describe the change we are building for. Measured outcomes are reported in the traction section, with sources." />
        <Stagger as="ul" gap={0.08} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-neu-200 bg-neu-200 sm:grid-cols-2">
          {socialReturn.map((s) => (
            <StaggerItem as="li" key={s.title} className="bg-white p-8">
              <h3 className="text-xl font-bold text-neu-900">{s.title}</h3>
              <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-neu-600">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
