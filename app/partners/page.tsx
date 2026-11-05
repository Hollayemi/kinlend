import type { Metadata } from "next";
import { photos } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { PartnerPaths } from "@/components/sections/PartnerPaths";
import { InvestorThesis } from "@/components/sections/InvestorThesis";
import { Safeguards } from "@/components/sections/Safeguards";

export const metadata: Metadata = {
  title: "Partners and investors",
  description:
    "Work with KINLEND: invest in community trust infrastructure, onboard a cooperative, or build on KinScore, our trust and credit engine.",
  alternates: { canonical: "/partners" },
};

export default function PartnersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Partners and investors"
        title="Build on community trust."
        emphasis={["trust."]}
        tone="ter"
        lede="KINLEND turns the way communities already trust each other into accountable credit. Whether you fund it, bring your community to it, or build on it, start here."
        photo={photos.marketJos}
      />
      <PartnerPaths />
      <InvestorThesis />
      <Safeguards />
    </SiteShell>
  );
}
