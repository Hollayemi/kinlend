import { kinMasterPoints } from "@/config/content";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Media } from "@/components/ui/Media";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const tiers = [
  { name: "Bronze", dot: "bg-tier-bronze" },
  { name: "Silver", dot: "bg-tier-silver" },
  { name: "Gold", dot: "bg-acc-400" },
];

export function KinMasters() {
  return (
    <section id="kinmasters" className="scroll-mt-24 bg-sec-900 py-20 text-white lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            tone="sec"
            onDark
            eyebrow="For KinMasters"
            title="You already know who in your market keeps their word."
            body="As a KinMaster you vet and vouch for the people around you, and you earn for it. You are the reason a loan without collateral works."
          />

          <Stagger as="ul" gap={0.1} className="mt-10 space-y-6">
            {kinMasterPoints.map((p, i) => (
              <StaggerItem as="li" key={p.title} className="flex gap-5">
                <span className="mt-0.5 font-mono text-sm font-semibold text-sec-300">0{i + 1}</span>
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="mt-1 max-w-md text-[1rem] leading-relaxed text-white/75">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2">
            <p className="text-sm text-sec-200">Grow through</p>
            {tiers.map((t) => (
              <span key={t.name} className="inline-flex items-center gap-2 text-sm font-semibold">
                <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${t.dot}`} />
                {t.name}
              </span>
            ))}
          </Reveal>

          <Reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.routes.becomeKinMaster} variant="onDark" size="lg" event="kinmaster_apply_click" eventProps={{ location: "kinmasters-section" }}>
              Become a KinMaster
            </ButtonLink>
            <ButtonLink href={siteConfig.routes.kinMasterLogin} variant="onDarkOutline" size="lg" event="kinmaster_login_click" eventProps={{ location: "kinmasters-section" }}>
              KinMaster login
            </ButtonLink>
          </Reveal>

          <Reveal as="p" className="mt-6 max-w-lg text-[0.8125rem] leading-relaxed text-sec-200">
            What it takes: in-person vetting of every borrower, a signed agreement and, on the franchise track, a refundable security bond. Misconduct leads to blacklisting, which protects honest agents.
          </Reveal>
        </div>

        <Reveal direction="left" className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sec-800">
            <Media slot={siteConfig.media.kinmaster} sizes="(min-width: 1024px) 38vw, 100vw" tone="sec" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
