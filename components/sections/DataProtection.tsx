import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappHref } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/ButtonLink";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function DataProtection() {
  const { ndpa, disclosures } = siteConfig.compliance;
  const cards = [
    { title: "Your data", body: `${ndpa} You can ask what we hold about you, and ask us to correct or delete it.` },
    { title: "What we never ask for here", body: "This website never asks for your PIN, your loan reference or your BVN/NIN. If anyone asks you for them in KINLEND's name, do not share them, and tell us." },
    {
      title: "Governance and licensing",
      body: disclosures.length ? disclosures.join(" ") : "Licensing and governance documentation is available to partners and investors on request.",
    },
  ];
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Regulation and data" title="Held to account, and open about it." body="Lending to people who have been left out only works if they can trust the lender. That means clear rules on how we handle money and information." />
        <Stagger as="ul" gap={0.1} className="mt-12 grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <StaggerItem as="li" key={c.title} className="rounded-2xl border border-neu-200 bg-neu-50 p-7">
              <h3 className="text-xl font-bold text-neu-900">{c.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-neu-600">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-6 text-sm text-neu-600">
          Questions about your data?{" "}
          <TrackedLink href={whatsappHref("Hello KINLEND, I have a question about my data.")} event="whatsapp_click" eventProps={{ location: "data-protection" }} className="inline-flex items-center gap-1.5 font-semibold text-ter-700 underline underline-offset-2">
            <MessageCircle className="h-3.5 w-3.5" /> Message us
          </TrackedLink>
        </p>
      </Container>
    </section>
  );
}
