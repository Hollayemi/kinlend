import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { photos, whatsappHref } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { GetKinMasterSteps } from "@/components/sections/GetKinMasterSteps";
import { VettingExpect } from "@/components/sections/VettingExpect";
import { RequestKinMaster } from "@/components/sections/RequestKinMaster";
import { KinMasterInvite } from "@/components/sections/KinMasterInvite";
import { Faq } from "@/components/sections/Faq";

export const metadata: Metadata = {
  title: "Find a KinMaster",
  description:
    "A KinMaster is the trusted person in your community who vets you in person and vouches for you. Here is how to find one and get approved.",
  alternates: { canonical: "/find-a-kinmaster" },
};

export default function FindKinMasterPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Find a KinMaster"
        title="Your loan starts with someone who knows you."
        emphasis={["knows"]}
        tone="sec"
        lede="A KinMaster is the trusted person in your community who checks you in person and vouches for you. Here is how to find yours and get approved."
        photo={photos.elderWorking}
      >
        <ButtonLink href="#request" variant="onDark" size="lg">
          Ask for an introduction
        </ButtonLink>
        <ButtonLink href={whatsappHref()} variant="onDarkOutline" size="lg" event="whatsapp_click" eventProps={{ location: "find-kinmaster-hero" }}>
          <MessageCircle className="h-4 w-4" />
          Chat on WhatsApp
        </ButtonLink>
      </PageHero>

      <GetKinMasterSteps />
      <VettingExpect />
      <RequestKinMaster />
      <KinMasterInvite />
      <Faq />
    </SiteShell>
  );
}
