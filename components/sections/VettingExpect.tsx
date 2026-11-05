import { Check, X } from "lucide-react";
import { kinMasterWill, kinMasterWontEver } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

export function VettingExpect() {
  return (
    <section className="bg-neu-100 py-20 lg:py-28">
      <Container>
        <SectionHeading
          tone="sec"
          eyebrow="What to expect"
          title="What a KinMaster will, and will never, do."
          body="Know the difference. If anyone claiming to be a KinMaster breaks the second list, do not go ahead, and tell us."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-neu-200 bg-white p-7">
            <p className="eyebrow text-pri-700">A KinMaster will</p>
            <ul className="mt-5 space-y-4">
              {kinMasterWill.map((t) => (
                <li key={t} className="flex gap-3 text-[1rem] leading-relaxed text-neu-800">
                  <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pri-100 text-pri-800">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-2xl border border-neu-900 bg-neu-900 p-7 text-white">
            <p className="eyebrow text-neu-300">A KinMaster will never</p>
            <ul className="mt-5 space-y-4">
              {kinMasterWontEver.map((t) => (
                <li key={t} className="flex gap-3 text-[1rem] leading-relaxed text-white/90">
                  <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/15">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
