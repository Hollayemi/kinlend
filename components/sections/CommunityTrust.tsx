import { communityTrust as c } from "@/config/pages";
import { photos } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";

export function CommunityTrust() {
  return (
    <section className="bg-neu-50 py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} />
          <div className="mt-6 space-y-4">
            {c.body.map((p) => (
              <Reveal as="p" key={p} className="max-w-lg text-[1.0625rem] leading-relaxed text-neu-600">{p}</Reveal>
            ))}
          </div>
          <Reveal as="ul" className="mt-8 divide-y divide-neu-200 border-y border-neu-200">
            {c.points.map((t) => (
              <li key={t} className="flex items-center gap-3 py-3.5 text-[1rem] text-neu-800">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-pri-600" />
                {t}
              </li>
            ))}
          </Reveal>
        </div>

        <div className="grid grid-cols-5 gap-4 lg:col-span-6">
          <Reveal direction="left" className="col-span-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-pri-900">
              <Media slot={photos.marketPortHarcourt} sizes="(min-width: 1024px) 30vw, 60vw" />
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="col-span-2 pt-12">
            <div className="relative aspect-[3/5] overflow-hidden rounded-2xl bg-sec-900">
              <Media slot={photos.ruralWoman} tone="sec" sizes="(min-width: 1024px) 20vw, 40vw" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
