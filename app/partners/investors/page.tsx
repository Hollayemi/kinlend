import type { Metadata } from "next";
import { investorInterests } from "@/config/pages";
import { photos } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InvestorThesis } from "@/components/sections/InvestorThesis";
import { Safeguards } from "@/components/sections/Safeguards";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { SocialReturn } from "@/components/sections/SocialReturn";
import { Direction } from "@/components/sections/Direction";
import { DataProtection } from "@/components/sections/DataProtection";
import { EnquirySection } from "@/components/sections/EnquirySection";

export const metadata: Metadata = {
  title: "For impact investors",
  description:
    "The KINLEND model, its safeguards, traction and social return, and how to request the investor materials.",
  alternates: { canonical: "/partners/investors" },
};

export default function InvestorsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Impact investors"
        title="A lending model that can show its work."
        emphasis={["show"]}
        tone="ter"
        lede="Community trust as collateral, repayment rails that cannot leak, and a data asset that compounds. See the model, the controls and the traction, and ask for the full materials."
        photo={photos.marketAbuja}
      >
        <ButtonLink href="#materials" variant="onDark" size="lg" event="investor_cta_click" eventProps={{ location: "investors-hero" }}>
          Request the investor materials
        </ButtonLink>
      </PageHero>

      <InvestorThesis />
      <Safeguards />
      <ImpactMetrics eyebrow="Traction" title="Traction we can stand behind." />
      <SocialReturn />
      <Direction />
      <DataProtection />
      <EnquirySection
        id="materials"
        eyebrow="Investor materials"
        title="Request the deck and blueprint summary."
        body="Tell us who you are and what you are looking at. We will send the investor deck and blueprint summary, and set up a conversation."
        note="We share the full materials directly, so we can have the right conversation with the right people."
        form={{
          type: "investor",
          interests: investorInterests,
          submitLabel: "Request the materials",
          successTitle: "Thank you. We have your request.",
          successBody: "A member of the team will be in touch with the investor materials and to arrange a conversation.",
          messagePlaceholder: "For example: our focus, ticket size, or what you would like to see.",
        }}
      />
    </SiteShell>
  );
}
