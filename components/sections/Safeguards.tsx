import { safeguards } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Safeguards() {
  return (
    <section id="safeguards" className="scroll-mt-24 bg-ter-900 py-20 text-white lg:py-28">
      <Container>
        <SectionHeading
          tone="ter"
          onDark
          eyebrow="How every naira is accounted for"
          title="Built so trust can be checked."
          body="Our anti-fraud framework, DIRECT, rests on one idea: the people who vouch never hold the money, and every movement leaves a record."
        />

        <Stagger as="ol" gap={0.08} className="mt-14 grid gap-x-12 md:grid-cols-2">
          {safeguards.map((s, i) => (
            <StaggerItem as="li" key={s.n} className={`flex gap-5 border-t border-white/15 py-7 ${i === safeguards.length - 1 ? "md:col-span-2" : ""}`}>
              <span className="font-mono text-sm font-semibold text-ter-300">{s.n}</span>
              <div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-1.5 max-w-md text-[0.9375rem] leading-relaxed text-white/75">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal as="p" className="mt-4 max-w-2xl text-[0.8125rem] leading-relaxed text-ter-200">
          Some of these controls roll out in phases as the KINLEND platform is built.
        </Reveal>
      </Container>
    </section>
  );
}
