import { promises } from "@/config/content";
import { Container } from "@/components/ui/Container";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function TrustBar() {
  return (
    <section aria-label="What you can rely on" className="border-y border-neu-200 bg-white">
      <Container>
        <Stagger as="ul" gap={0.08} className="grid lg:grid-cols-4">
          {promises.map((p) => (
            <StaggerItem
              as="li"
              key={p.kicker}
              className="border-b border-neu-200 py-6 last:border-b-0 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <p className="eyebrow text-pri-700">{p.kicker}</p>
              <p className="mt-2 font-display text-[1.3rem] font-semibold leading-snug text-neu-900">{p.title}</p>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-neu-600">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
