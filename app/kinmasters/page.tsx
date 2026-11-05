import type { Metadata } from "next";
import { kmFaqs } from "@/config/pages";
import { photos, siteConfig } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { KmDuties, KmEarnings, KmProcess, KmStandards } from "@/components/sections/KmSections";
import { KmCta } from "@/components/sections/KmCta";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "For KinMasters",
  description:
    "Become a KinMaster: vet and vouch for people you know, earn tiered commissions, and never handle repayment money. Apply online or log in to the KinMaster app.",
  alternates: { canonical: "/kinmasters" },
};

export default function KinMastersPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="For KinMasters"
        title="You already know who keeps their word."
        emphasis={["know"]}
        tone="sec"
        lede="As a KinMaster you vet and vouch for the people around you, and you earn for it. You never touch repayment money. You are the reason a loan without collateral works."
        photo={photos.elderWorking}
      >
        <ButtonLink href={siteConfig.routes.becomeKinMaster} variant="onDark" size="lg" event="kinmaster_apply_click" eventProps={{ location: "kinmasters-hero" }}>
          Apply to be a KinMaster
        </ButtonLink>
        <ButtonLink href={siteConfig.routes.kinMasterLogin} variant="onDarkOutline" size="lg" event="kinmaster_login_click" eventProps={{ location: "kinmasters-hero" }}>
          KinMaster login
        </ButtonLink>
      </PageHero>

      <KmDuties />
      <KmEarnings />
      <KmStandards />
      <KmProcess />
      <Faq items={kmFaqs} eyebrow="KinMaster questions" title="Before you apply." body="Straight answers on money, standards and how to join." />
      <KmCta />
    </SiteShell>
  );
}
