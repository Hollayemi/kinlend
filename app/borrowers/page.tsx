import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { photos, siteConfig } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ApplyRepayButton } from "@/components/ussd/ApplyRepayButton";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhoWeLendTo } from "@/components/sections/WhoWeLendTo";
import { Ladder } from "@/components/sections/Ladder";
import { LoanSummary } from "@/components/sections/LoanSummary";
import { Eligibility } from "@/components/sections/Eligibility";
import { Receipt } from "@/components/sections/Receipt";
import { KinScoreExplainer } from "@/components/sections/KinScoreExplainer";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "For borrowers",
  description:
    "Loans without collateral for traders, artisans and farmers. Start with a trust loan, repay on any phone, and climb from Bronze to Silver to Gold.",
  alternates: { canonical: "/borrowers" },
};

export default function BorrowersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="For borrowers"
        title="A loan that grows with you."
        emphasis={["grows"]}
        lede="Start small with a trust loan. Repay on time and unlock bigger loans and better terms. No collateral, no bank account needed."
        photo={photos.marketOgun}
      >
        <ApplyRepayButton variant="onDark" size="lg" source="borrowers-hero" />
        <ButtonLink href={siteConfig.routes.findKinMaster} variant="onDarkOutline" size="lg" event="find_kinmaster_click" eventProps={{ location: "borrowers-hero" }}>
          <MapPin className="h-4 w-4" />
          Find a KinMaster
        </ButtonLink>
      </PageHero>

      <TrustBar />
      <WhoWeLendTo />
      <Ladder />
      <LoanSummary />
      <Eligibility />
      <Receipt />
      <KinScoreExplainer />
      <Faq />
      <FinalCta />
    </SiteShell>
  );
}
