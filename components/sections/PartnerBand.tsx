import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

export function PartnerBand() {
  return (
    <section className="bg-ter-900 py-16 text-white lg:py-20">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <Reveal>
          <p className="eyebrow text-ter-300">For investors and partners</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">See the model, the safeguards and how to work with us.</h2>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.routes.investors} variant="onDark" size="lg" event="investor_cta_click" eventProps={{ location: "impact-band" }}>
            For investors <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href={siteConfig.routes.cooperatives} variant="onDarkOutline" size="lg" event="partner_cta_click" eventProps={{ location: "impact-band" }}>
            For partners
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
