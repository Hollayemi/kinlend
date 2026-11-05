import { Check } from "lucide-react";
import { partnerOffer, partnerTypes } from "@/config/pages";
import { tones } from "@/lib/tone";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function PartnerTypes() {
  return (
    <section className="bg-neu-50 py-20 lg:py-28">
      <Container>
        <SectionHeading tone="sec" eyebrow="Who we work with" title="Communities that already hold trust." body="If people in your group already vouch for each other, KINLEND can put that trust to work." />
        <Stagger as="ul" gap={0.08} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-neu-200 bg-neu-200 sm:grid-cols-2">
          {partnerTypes.map((p) => (
            <StaggerItem as="li" key={p.title} className="bg-white p-8">
              <h3 className="text-xl font-bold text-neu-900">{p.title}</h3>
              <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-neu-600">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export function PartnerOffer() {
  return (
    <section className="bg-neu-100 py-20 lg:py-28">
      <Container>
        <SectionHeading tone="ter" eyebrow="What you get" title="One platform, three ways to work together." />
        <Stagger as="ul" gap={0.1} className="mt-12 grid gap-4 lg:grid-cols-3">
          {partnerOffer.map((o) => {
            const t = tones[o.tone];
            return (
              <StaggerItem as="li" key={o.title} className="overflow-hidden rounded-2xl border border-neu-300 bg-white">
                <span aria-hidden className={cn("block h-1.5", t.fill)} />
                <div className="p-7">
                  <p className={cn("eyebrow", t.text)}>{o.who}</p>
                  <h3 className="mt-3 text-2xl font-bold leading-snug text-neu-900">{o.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {o.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-[0.9375rem] leading-relaxed text-neu-700">
                        <Check aria-hidden className={cn("mt-1 h-4 w-4 shrink-0", t.text)} strokeWidth={3} />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
