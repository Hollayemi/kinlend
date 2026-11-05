import { Check } from "lucide-react";
import { beforeYouConfirm } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Transparency block. Deliberately shows no fee figures: those come from real
 * pricing (PRD 6.1). The card shows where each number will appear.
 */
export function LoanSummary() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <SectionHeading
            tone="ter"
            eyebrow="Know the cost"
            title="Know the cost before you say yes."
            body="Every loan shows its full cost up front, in plain numbers. You see this before you confirm, and you can ask your KinMaster to walk you through it."
          />
          <Reveal as="ul" className="mt-8 space-y-3.5">
            {beforeYouConfirm.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[1.0625rem] text-neu-800">
                <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ter-600 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </Reveal>
          <Reveal as="p" className="mt-7 max-w-md text-sm leading-relaxed text-neu-600">
            If you cannot see the cost clearly, do not accept. Say so to your KinMaster or message us.
          </Reveal>
        </div>

        <Reveal scale className="lg:col-span-6">
          <div className="mx-auto max-w-md rounded-2xl border border-neu-200 bg-neu-50 p-7 shadow-card">
            <p className="eyebrow text-ter-700">Loan summary</p>
            <p className="mt-1 text-sm text-neu-600">Shown on your phone before you confirm</p>
            <dl className="mt-6 divide-y divide-neu-200 border-y border-neu-200">
              {["You receive", "Fee", "You repay in total", "Length of loan", "Next payment due"].map((l) => (
                <div key={l} className="flex items-center justify-between py-3.5">
                  <dt className="text-[0.9375rem] text-neu-700">{l}</dt>
                  <dd aria-label="Your figure appears here" className="font-mono text-lg font-semibold text-neu-400">- - -</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-neu-600">Illustration. Your own figures appear here.</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
