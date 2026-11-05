import { faqs } from "@/config/content";
import { siteConfig } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { UssdSteps } from "@/components/sections/UssdSteps";
import { Ladder } from "@/components/sections/Ladder";
import { Receipt } from "@/components/sections/Receipt";
import { KinMasters } from "@/components/sections/KinMasters";
import { Stories } from "@/components/sections/Stories";
import { Partners } from "@/components/sections/Partners";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

// Structured data for rich results (PRD section 14).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a.replaceAll("{{ussd}}", siteConfig.ussd.code) },
      })),
    },
  ],
};

export default function Home() {
  return (
    <SiteShell>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <UssdSteps />
        <Ladder />
        <Receipt />
        <KinMasters />
        <Stories />
        <Partners />
        <Faq />
        <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </SiteShell>
  );
}
