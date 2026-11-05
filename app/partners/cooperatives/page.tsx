import type { Metadata } from "next";
import { partnerInterests } from "@/config/pages";
import { photos } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { PartnerOffer, PartnerTypes } from "@/components/sections/PartnerOffer";
import { Onboarding } from "@/components/sections/Onboarding";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "For partners and cooperatives",
  description:
    "Onboard a whole community onto KINLEND, or talk to us about KinScore, our trust-scoring data product, and an open API.",
  alternates: { canonical: "/partners/cooperatives" },
};

const faqs = [
  { q: "Do we need to be a registered cooperative?", a: "No fixed rule is set out here. What matters is that people in your group already know and vouch for each other. Tell us about your group and we will say how it could work." },
  { q: "What is KinScore?", a: "KinScore is KINLEND's trust and credit engine. It builds a behavioural profile from repayment history, community referral networks, on-time rates and community default rates, so lenders can see reliability where a credit file is thin." },
  { q: "Can we see live scores?", a: "Not publicly. Scores are only shared under a contract, with controlled access. We can set up a sandbox so you can test how KinScore would work for you." },
  { q: "Is there an API?", a: "An open API for partners is part of where we are heading. Tell us what you want to build and we will say what is possible now." },
] as const;

export default function CooperativesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Partners and cooperatives"
        title="Bring your community. Or build on KinScore."
        emphasis={["community."]}
        tone="sec"
        lede="Onboard a whole savings group, association or congregation, or talk to us about the KinScore data product and an open API for MFIs, fintechs and insurers."
        photo={photos.tailorMachine}
      >
        <ButtonLink href="#talk" variant="onDark" size="lg" event="partner_cta_click" eventProps={{ location: "cooperatives-hero" }}>
          Start a conversation
        </ButtonLink>
      </PageHero>

      <PartnerTypes />
      <PartnerOffer />
      <Onboarding />
      <EnquirySection
        id="talk"
        eyebrow="Start a conversation"
        title="Tell us about your group or product."
        body="A short note is enough. We will reply to explain how KINLEND could fit, and what a pilot would look like."
        form={{
          type: "partner",
          interests: partnerInterests,
          submitLabel: "Send enquiry",
          successTitle: "Thank you. We have your enquiry.",
          successBody: "A member of the team will get back to you to talk about what a first step could look like.",
          messagePlaceholder: "For example: who your members are, roughly how many, and where you are based.",
        }}
      />
      <Faq items={faqs} eyebrow="Partner questions" title="Before you reach out." body="Short answers to what partners ask first." />
    </SiteShell>
  );
}
