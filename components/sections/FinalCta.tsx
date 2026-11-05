import { MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { UssdCodeLoader } from "@/components/ussd/UssdCodeLoader";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-pri-800 py-20 text-white lg:py-28">
      <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] opacity-[0.12]">
        <circle cx="150" cy="170" r="110" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="250" cy="170" r="110" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="200" cy="255" r="110" fill="none" stroke="white" strokeWidth="1.5" />
      </svg>

      <Container className="relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="text-[2.25rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[3.5rem]">Ready to start? Find your KinMaster.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/85">
              They will meet you, vouch for you and get you on the ladder. Already enrolled? Dial the code and you are done.
            </p>
          </Reveal>
          <Reveal delay={0.14} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.routes.findKinMaster} variant="onDark" size="lg" event="find_kinmaster_click" eventProps={{ location: "final-cta" }}>
              <MapPin className="h-4 w-4" />
              Find a KinMaster
            </ButtonLink>
            <ButtonLink href={siteConfig.routes.becomeKinMaster} variant="onDarkOutline" size="lg" event="kinmaster_apply_click" eventProps={{ location: "final-cta" }}>
              Become a KinMaster
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal direction="left" className="lg:col-span-5 lg:justify-self-end">
          <div className="rounded-2xl border border-white/20 p-7">
            <p className="text-sm font-medium text-white/75">Apply or repay on any phone</p>
            <UssdCodeLoader size="xl" tone="light" className="mt-3" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
