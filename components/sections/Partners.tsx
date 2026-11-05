import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { TrackedLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

const cards = [
  {
    eyebrow: "Impact investors",
    title: "See the model, the traction and the safeguards.",
    body: "How community trust becomes a repayable loan book, and the controls that keep every payment accounted for.",
    cta: "View investor materials",
    href: siteConfig.routes.investors,
    event: "investor_cta_click" as const,
  },
  {
    eyebrow: "Partners and cooperatives",
    title: "Bring your whole community on board.",
    body: "Savings groups, churches, unions, MFIs and fintechs. KinScore gives lenders a trust signal where credit files are thin.",
    cta: "Start a conversation",
    href: siteConfig.routes.cooperatives,
    event: "partner_cta_click" as const,
  },
];

/** Deliberately quiet: the borrower's first impression comes first (PRD section 3). */
export function Partners() {
  return (
    <section id="partners" className="scroll-mt-24 border-t border-neu-200 bg-white py-16 lg:py-20">
      <Container>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-neu-200 bg-neu-200 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.eyebrow} delay={i * 0.08} className="bg-white p-8 lg:p-10">
              <p className="eyebrow text-ter-700">{c.eyebrow}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-snug text-neu-900">{c.title}</h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-neu-600">{c.body}</p>
              <TrackedLink
                href={c.href}
                event={c.event}
                eventProps={{ location: "partners-band" }}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-ter-700 underline-offset-4 hover:underline"
              >
                {c.cta} <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
