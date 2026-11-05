import { MapPin } from "lucide-react";
import { ussdStages } from "@/config/content";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { UssdCodeLoader } from "@/components/ussd/UssdCodeLoader";
import Image from "next/image";

/** Swap this for your asset — `/images/...` (in `public/`) or a remote URL. */
const BACKGROUND_IMAGE = "/images/ussd.png";

/** The written version of the hero phone demo, plus the whitelist note (PRD section 8). */
export function UssdSteps() {
  const code = siteConfig.ussd.code;
  return (
    <section
      id="ussd"
      className="relative scroll-mt-24 overflow-hidden py-20 text-white lg:py-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={BACKGROUND_IMAGE}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Brand wash — keeps the ter-900 identity even over a busy photo. */}
        <div className="absolute inset-0 bg-ter-900/80" />
        {/* Vertical fade — darker at the edges, so copy sits on the darkest zone. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ter-900/70 via-ter-900/50 to-ter-900/85" />
        {/* Corner glow — matches the accent color used in the code pill. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(45,212,191,0.18),transparent_55%)]" />
        {/* Faint grid — 1px lines on a 56px pitch, very low opacity. */}
        
      </div>

      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="ter"
            onDark
            eyebrow="Built for any phone"
            title="Repay from any phone. No data. No app."
            body="If it works on a feature phone with one bar of signal, it works for everyone."
          />
          <Reveal className="mt-9">
            <p className="text-sm font-medium text-white/70">Your code</p>
            <UssdCodeLoader size="xl" tone="light" className="mt-2" />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Stagger
            as="ol"
            gap={0.1}
            className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 backdrop-blur-sm sm:grid-cols-2"
          >
            {ussdStages.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="bg-ter-900/85 p-6 backdrop-blur-sm">
                <span className="font-mono text-sm font-semibold text-ter-300">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-white/75">
                  {s.body.replace("{code}", code)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-8 rounded-xl border border-white/15 bg-ter-900/60 p-5 backdrop-blur-sm">
            <p className="text-[0.9375rem] leading-relaxed text-white/85">
              <strong className="font-semibold text-white">
                Only vetted borrowers can transact.
              </strong>{" "}
              A KinMaster has met you in person and KINLEND has approved you. That is a
              safety feature, not a barrier.
            </p>
            <ButtonLink
              href={siteConfig.routes.findKinMaster}
              variant="onDark"
              size="md"
              event="find_kinmaster_click"
              eventProps={{ location: "ussd-steps" }}
              className="mt-4"
            >
              <MapPin className="h-4 w-4" />
              Find a KinMaster to get started
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}