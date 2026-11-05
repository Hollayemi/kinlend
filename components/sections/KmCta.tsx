import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

export function KmCta() {
  return (
    <section className="bg-sec-800 py-20 text-white lg:py-24">
      <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem]">Ready to put your standing to work?</h2>
          <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-white/80">Apply in a few minutes. Already a KinMaster? Go straight to your dashboard.</p>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={siteConfig.routes.becomeKinMaster} variant="onDark" size="lg" event="kinmaster_apply_click" eventProps={{ location: "kinmasters-cta" }}>
            Apply to be a KinMaster
          </ButtonLink>
          <ButtonLink href={siteConfig.routes.kinMasterLogin} variant="onDarkOutline" size="lg" event="kinmaster_login_click" eventProps={{ location: "kinmasters-cta" }}>
            KinMaster login
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
