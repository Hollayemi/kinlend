import { demo, naira } from "@/config/content";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const proofs = ["Amount received", "Balance left", "A reference you can quote"];

export function Receipt() {
  const { disclosures } = siteConfig.compliance;
  return (
    <section id="receipt" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal scale className="order-2 lg:order-1 lg:col-span-5">
          <div className="rounded-2xl bg-ter-50 p-6 sm:p-8">
            <div className="mx-auto max-w-sm">
              <p className="text-center text-xs text-neu-600">Today, 10:26</p>
              <div className="mt-3 rounded-2xl rounded-tl-sm bg-white p-4 shadow-card ring-1 ring-neu-200">
                <p className="text-xs font-semibold text-ter-700">KINLEND</p>
                <p className="mt-1.5 font-mono text-[0.8125rem] leading-relaxed text-neu-900">
                  Payment received. {naira(demo.amount)} for loan {demo.loanRef}. Balance {naira(demo.balance)}. Paid direct to KINLEND. Ref {demo.receiptRef}. Thank you, {demo.name}.
                </p>
              </div>

              <ul className="mt-6 space-y-2.5">
                {proofs.map((p, i) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-neu-800">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-ter-600 text-[0.6875rem] font-semibold text-white">{i + 1}</span>
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-center text-xs text-neu-600">Illustration. Names and amounts are examples.</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <SectionHeading
            tone="ter"
            eyebrow="Your money, your proof"
            title="Pay straight to KINLEND. Get a receipt every time."
            body="Every repayment goes digitally and directly to KINLEND and returns an instant SMS receipt. No cash changes hands with an agent, so no one can hold your money hostage."
          />

          <Stagger as="ul" gap={0.07} className="mt-9 divide-y divide-neu-200 border-y border-neu-200">
            {siteConfig.channels.map((c) => (
              <StaggerItem as="li" key={c.id} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="font-semibold text-neu-900">{c.name}</p>
                  <p className="mt-0.5 text-[0.9375rem] text-neu-600">{c.note}</p>
                </div>
                <span
                  className={cn(
                    "mt-0.5 shrink-0 rounded-md px-2 py-1 text-xs font-semibold",
                    c.status === "live" ? "bg-pri-100 text-pri-800" : "bg-neu-100 text-neu-700",
                  )}
                >
                  {c.status === "live" ? "Available" : "Coming soon"}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          {disclosures.length > 0 && (
            <div className="mt-6 space-y-2 text-xs leading-relaxed text-neu-600">
              {disclosures.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
