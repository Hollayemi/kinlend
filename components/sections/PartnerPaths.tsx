import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { photos, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const paths = [
  {
    eyebrow: "Impact investors",
    title: "Back a model built on trust, with the controls to prove it.",
    body: "The thesis, the safeguards, the traction we can stand behind and how to request the investor materials.",
    href: siteConfig.routes.investors,
    photo: photos.marketJos,
    tone: "ter" as const,
  },
  {
    eyebrow: "Partners and cooperatives",
    title: "Bring your community, or build on KinScore.",
    body: "Onboard a whole savings group or association, or talk to us about the KinScore data product and an open API.",
    href: siteConfig.routes.cooperatives,
    photo: photos.tailorMachine,
    tone: "sec" as const,
  },
];

export function PartnerPaths() {
  return (
    <section className="bg-neu-50 py-20 lg:py-28">
      <Container>
        <Stagger as="ul" gap={0.12} className="grid gap-4 md:grid-cols-2">
          {paths.map((p) => (
            <StaggerItem as="li" key={p.eyebrow}>
              <Link href={p.href} className="group block overflow-hidden rounded-2xl border border-neu-200 bg-white transition-shadow hover:shadow-pop">
                <div className="relative aspect-[16/9] overflow-hidden bg-neu-900">
                  <Media slot={p.photo} tone={p.tone} sizes="(min-width: 768px) 50vw, 100vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
                </div>
                <div className="p-7 lg:p-8">
                  <p className={`eyebrow ${p.tone === "ter" ? "text-ter-700" : "text-sec-700"}`}>{p.eyebrow}</p>
                  <h2 className="mt-3 text-2xl font-bold leading-snug text-neu-900">{p.title}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-neu-600">{p.body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-neu-900">
                    Explore <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
