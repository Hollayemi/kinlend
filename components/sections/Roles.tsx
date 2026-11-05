import { actorTone, roles } from "@/config/pages";
import { tones } from "@/lib/tone";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Roles() {
  return (
    <section className="bg-neu-100 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Who does what" title="Three parties, three clear jobs." body="Keeping the jobs separate is what keeps the money safe." />
        <Stagger as="div" gap={0.1} className="mt-12 grid gap-4 lg:grid-cols-3">
          {roles.map((r) => {
            const t = tones[actorTone[r.who]];
            return (
              <StaggerItem key={r.who} className="overflow-hidden rounded-2xl border border-neu-200 bg-white">
                <span aria-hidden className={cn("block h-1.5", t.fill)} />
                <div className="p-7">
                  <p className={cn("eyebrow", t.text)}>{r.tag}</p>
                  <h3 className="mt-2 text-2xl font-bold text-neu-900">{r.who}</h3>
                  <ul className="mt-5 space-y-3">
                    {r.items.map((it) => (
                      <li key={it} className="flex gap-3 text-[0.9375rem] leading-relaxed text-neu-700">
                        <span aria-hidden className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", t.dot)} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
