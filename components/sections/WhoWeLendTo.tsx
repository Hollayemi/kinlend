import { lendTo } from "@/config/pages";
import { photos } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function WhoWeLendTo() {
  return (
    <section className="bg-neu-50 py-20 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow="Who we lend to"
          title="People the formal system has overlooked."
          body="You may not have a bank account, a credit file or anything to put up as security. You have something better: a reputation."
        />

        <Stagger as="ul" gap={0.12} className="mt-12 grid gap-4 md:grid-cols-3">
          {lendTo.map((c) => (
            <StaggerItem as="li" key={c.title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-pri-900">
                <Media slot={photos[c.photo]} sizes="(min-width: 768px) 33vw, 100vw" imgClassName="transition-transform duration-700 group-hover:scale-[1.03]" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-neu-900/85 via-neu-900/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-bold">{c.title}</h3>
                  <p className="mt-1.5 max-w-xs text-[0.9375rem] leading-relaxed text-white/85">{c.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal as="p" className="mt-6 text-[0.9375rem] text-neu-600">
          Also for members of cooperatives and ajo / esusu savings groups, where the group itself can stand behind its members.
        </Reveal>
      </Container>
    </section>
  );
}
