import { ladder } from "@/config/content";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const cap = ["bg-pri-600", "bg-tier-bronze", "bg-tier-silver", "bg-acc-500"];
const rise = ["lg:min-h-[18rem]", "lg:min-h-[22rem]", "lg:min-h-[26rem]", "lg:min-h-[30rem]"];

/** Indicative figures: confirm against real pricing before publishing (PRD 6.1). */
export function Ladder() {
  return (
    <section id="ladder" className="scroll-mt-24 bg-neu-100 py-20 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow="Loans and the ladder"
            title="A ladder, not a trap."
            body="You start small with a trust loan. Repay on time and you climb: bigger loans, better terms. KINLEND grows with you."
          />
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-xl border border-neu-300 bg-neu-50 p-5">
              <p className="eyebrow text-ter-700">KinScore</p>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-neu-800">
                Repay well, climb the ladder. The more reliably you and your community repay, the stronger your KinScore and the more you can borrow.
              </p>
            </div>
          </Reveal>
        </div>

        <Stagger as="ol" gap={0.12} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:items-end">
          {ladder.map((r, i) => (
            <StaggerItem
              as="li"
              key={r.id}
              distance={32}
              className={cn(
                "flex flex-col overflow-hidden rounded-2xl border",
                r.id === "gold" ? "border-acc-300 bg-acc-50" : "border-neu-200 bg-white",
                rise[i],
              )}
            >
              <span aria-hidden className={cn("h-1.5 w-full", cap[i])} />
              <div className="flex flex-1 flex-col p-6">
                <p className="eyebrow text-neu-600">Rung {i + 1}</p>
                <h3 className="mt-2 text-2xl font-semibold text-neu-900">{r.name}</h3>
                <p className="mt-4 break-words font-display text-[1.375rem] font-semibold leading-tight tabular-nums text-neu-900">{r.size}</p>
                <p className="mt-1 text-sm text-neu-600">{r.cycle === "Set at enrolment" ? r.cycle : `${r.cycle}, typical`}</p>

                <dl className="mt-auto space-y-3 pt-8 text-sm">
                  <div>
                    <dt className="font-semibold text-neu-900">Who it is for</dt>
                    <dd className="mt-0.5 leading-relaxed text-neu-600">{r.who}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-neu-900">How you reach it</dt>
                    <dd className="mt-0.5 leading-relaxed text-neu-600">{r.how}</dd>
                  </div>
                </dl>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal as="p" className="mt-6 max-w-2xl text-[0.8125rem] leading-relaxed text-neu-600">
          Amounts and terms are indicative. Your exact limit, the fee and the full amount you will repay are shown before you confirm any loan.
        </Reveal>
      </Container>
    </section>
  );
}
