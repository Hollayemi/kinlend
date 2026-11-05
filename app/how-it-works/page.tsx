import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { photos, siteConfig } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ApplyRepayButton } from "@/components/ussd/ApplyRepayButton";
import { TrustBar } from "@/components/sections/TrustBar";
import { JourneySteps } from "@/components/sections/JourneySteps";
import { MoneyFlow } from "@/components/sections/MoneyFlow";
import { Roles } from "@/components/sections/Roles";
import { Ladder } from "@/components/sections/Ladder";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From a KinMaster's vouch to your first repayment and a bigger loan: the six steps of a KINLEND loan, who does what, and where your money goes.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="How it works"
        title="A loan backed by people, not property."
        emphasis={["people"]}
        lede="Six steps from the first conversation to a bigger loan. Here is exactly what happens, who does what, and where your money goes."
        photo={photos.marketJos}
      >
        <ApplyRepayButton variant="onDark" size="lg" source="how-it-works-hero" />
        <ButtonLink href={siteConfig.routes.findKinMaster} variant="onDarkOutline" size="lg" event="find_kinmaster_click" eventProps={{ location: "how-it-works-hero" }}>
          <MapPin className="h-4 w-4" />
          Find a KinMaster
        </ButtonLink>
      </PageHero>

      <TrustBar />
      <JourneySteps />
      <MoneyFlow />
      <Roles />
      <Ladder />
      <Faq />
      <FinalCta />
    </SiteShell>
  );
}
