import type { ComponentProps } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LeadForm } from "@/components/forms/LeadForm";

export function EnquirySection({
  id,
  eyebrow,
  title,
  body,
  note,
  form,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  note?: string;
  form: ComponentProps<typeof LeadForm>;
}) {
  return (
    <section id={id} className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading tone="ter" eyebrow={eyebrow} title={title} body={body} />
          {note && <Reveal as="p" className="mt-6 max-w-sm text-sm leading-relaxed text-neu-600">{note}</Reveal>}
        </div>
        <Reveal className="lg:col-span-7">
          <LeadForm {...form} />
        </Reveal>
      </Container>
    </section>
  );
}
