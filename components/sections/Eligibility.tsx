import { MapPin } from "lucide-react";
import { eligibility } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

export function Eligibility() {
  return (
    <section id="eligibility" className="scroll-mt-24 bg-neu-100 py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Who can borrow"
            title="Open to anyone a KinMaster will vouch for."
            body="Access is gated on purpose. Only borrowers a KinMaster has met in person, and KINLEND has approved, can transact. That keeps everyone's money safe."
          />
          <Reveal className="mt-8">
            <ButtonLink href={siteConfig.routes.findKinMaster} variant="primary" size="lg" event="find_kinmaster_click" eventProps={{ location: "eligibility" }}>
              <MapPin className="h-4 w-4" />
              Find a KinMaster
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal as="ol" className="divide-y divide-neu-300 border-y border-neu-300 lg:col-span-7">
          {eligibility.map((t, i) => (
            <li key={t} className="flex gap-5 py-5">
              <span className="font-mono text-sm font-semibold text-pri-700">0{i + 1}</span>
              <p className="text-[1.0625rem] leading-relaxed text-neu-800">{t}</p>
            </li>
          ))}
          <li className="py-5 text-sm leading-relaxed text-neu-600">
            Identity checks happen during enrolment, with your consent. This website never asks for your PIN, loan reference or BVN/NIN.
          </li>
        </Reveal>
      </Container>
    </section>
  );
}
