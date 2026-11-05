import type { Metadata } from "next";
import { photos } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { CommunityTrust } from "@/components/sections/CommunityTrust";
import { ImpactMetrics } from "@/components/sections/ImpactMetrics";
import { Safeguards } from "@/components/sections/Safeguards";
import { DataProtection } from "@/components/sections/DataProtection";
import { PartnerBand } from "@/components/sections/PartnerBand";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Who KINLEND serves, how every naira is accounted for, and how we report our results. Community trust, made measurable.",
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Impact"
        title="Proof that community trust repays."
        emphasis={["trust"]}
        lede="KINLEND lends to the traders, artisans and farmers the formal system leaves out. Here is who we serve, how we keep every naira accounted for, and how we report our results."
        photo={photos.marketPortHarcourt}
      />
      <CommunityTrust />
      <ImpactMetrics />
      <Safeguards />
      <DataProtection />
      <PartnerBand />
      <FinalCta />
    </SiteShell>
  );
}
