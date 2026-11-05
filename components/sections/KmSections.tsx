import { Check } from "lucide-react";
import { kmDuties, kmFranchise, kmProcess, kmStandards, kmTiers } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ProgressTimeline } from "@/components/motion/ProgressTimeline";

export function KmDuties() {
  return (
    <section className="bg-neu-50 py-20 lg:py-28">
      <Container>
        <SectionHeading tone="sec" eyebrow="The role" title="The person your community vouches through." body="A KinMaster is a vetting facilitator, not a payment handler. You bring the trust. KINLEND brings the rails." />
        <Stagger as="ol" gap={0.1} className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-neu-200 bg-neu-200 lg:grid-cols-3">
          {kmDuties.map((d, i) => (
            <StaggerItem as="li" key={d.title} className="bg-white p-8">
              <p className="font-mono text-sm font-semibold text-sec-700">0{i + 1}</p>
              <h3 className="mt-4 text-2xl font-bold text-neu-900">{d.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-neu-600">{d.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export function KmEarnings() {
  return (
    <section id="earn" className="scroll-mt-24 bg-neu-100 py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading
            tone="sec"
            eyebrow="What you earn"
            title="Tiered income that grows with your track record."
            body="You earn commission on the loans you vouch for, with bonuses and bigger portfolio limits as you move up. Exact rates are set out in your agreement."
          />
          <Stagger as="ol" gap={0.1} className="mt-10 divide-y divide-neu-300 border-y border-neu-300">
            {kmTiers.map((t) => (
              <StaggerItem as="li" key={t.name} className="flex gap-5 py-6">
                <span aria-hidden className={`mt-2 h-3 w-3 shrink-0 rounded-full ${t.dot}`} />
                <div>
                  <h3 className="text-xl font-bold text-neu-900">{t.name}</h3>
                  <p className="mt-1 max-w-md text-[0.9375rem] leading-relaxed text-neu-600">{t.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal className="lg:col-span-5">
          <div className="rounded-2xl bg-sec-900 p-8 text-white">
            <p className="eyebrow text-sec-300">Certified franchise track</p>
            <h3 className="mt-3 text-2xl font-bold leading-snug">A deeper commitment, for those who want to build a business on it.</h3>
            <ul className="mt-6 space-y-3">
              {kmFranchise.map((t) => (
                <li key={t} className="flex gap-3 text-[0.9375rem] text-white/90">
                  <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sec-300" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-sec-200">Rolling out later. Tell us you are interested when you apply.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function KmStandards() {
  return (
    <section className="bg-sec-900 py-20 text-white lg:py-28">
      <Container>
        <SectionHeading
          tone="sec"
          onDark
          eyebrow="The standards"
          title="Clear rules that protect honest KinMasters."
          body="Every KinMaster keeps the same four standards. They are why borrowers trust you, and why KINLEND can trust the network."
        />
        <Stagger as="ol" gap={0.08} className="mt-12 grid gap-x-12 md:grid-cols-2">
          {kmStandards.map((s, i) => (
            <StaggerItem as="li" key={s.title} className="flex gap-5 border-t border-white/15 py-7">
              <span className="font-mono text-sm font-semibold text-sec-300">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-1.5 max-w-md text-[0.9375rem] leading-relaxed text-white/75">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

export function KmProcess() {
  return (
    <section className="bg-neu-50 py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading tone="sec" eyebrow="How to join" title="Four steps from application to your first borrower." body="Applying takes a few minutes. You can save your progress and finish later." />
          </div>
        </div>
        <div className="lg:col-span-7 lg:pt-3">
          <ProgressTimeline>
            <ol className="space-y-12">
              {kmProcess.map((s) => (
                <Reveal as="li" key={s.n} className="relative pl-[4.25rem]">
                  <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-neu-300 bg-neu-50 text-lg font-bold text-neu-900">{s.n}</span>
                  <h3 className="text-[1.75rem] font-bold leading-tight text-neu-900">{s.title}</h3>
                  <p className="mt-2 max-w-lg text-[1.0625rem] leading-relaxed text-neu-600">{s.body}</p>
                </Reveal>
              ))}
            </ol>
          </ProgressTimeline>
        </div>
      </Container>
    </section>
  );
}
