import { ArrowRight, ShieldCheck } from "lucide-react";
import { steps } from "@/config/content";
import { siteConfig } from "@/config/site";
import { tones } from "@/lib/tone";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";
import { ProgressTimeline } from "@/components/motion/ProgressTimeline";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-neu-50 py-20 lg:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="How it works"
              title="Three steps, and none of them is collateral."
              body="Banks ask what you own. KINLEND asks who vouches for you. The answer is your community."
            />
            <Reveal delay={0.1} className="mt-9 hidden lg:block">
              <div className="relative aspect-[4/4.4] overflow-hidden rounded-2xl bg-sec-900">
                <Media slot={siteConfig.media.vouch} sizes="(min-width: 1024px) 34vw, 100vw" tone="sec" />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-50">
          <ProgressTimeline>
            <ol className="space-y-12">
              {steps.map((s) => {
                const t = tones[s.tone];
                return (
                  <Reveal as="li" key={s.n} className="relative pl-[4.25rem]">
                    <span className="absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border border-neu-300 bg-neu-50 font-display text-lg font-semibold text-neu-900">
                      {s.n}
                    </span>
                    <span className={cn("inline-block rounded-md px-2 py-1 text-xs font-semibold", t.chip)}>{s.tag}</span>
                    <h3 className="mt-3 text-[1.75rem] font-semibold leading-tight text-neu-900">{s.title}</h3>
                    <p className="mt-2 max-w-md text-[1.0625rem] leading-relaxed text-neu-600">{s.body}</p>
                  </Reveal>
                );
              })}
            </ol>
          </ProgressTimeline>

          {/* <Reveal className="mt-12 flex gap-4 rounded-xl border-l-4 border-pri-600 bg-pri-50 p-5">
            <ShieldCheck aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-pri-700" />
            <p className="text-[0.9375rem] leading-relaxed text-pri-900">
              <strong className="font-semibold">Your repayment goes straight to KINLEND.</strong> It is never held by an agent, and you get a receipt every time.
            </p>
          </Reveal> */}

          <Reveal className="mt-8">
            <ButtonLink href={siteConfig.routes.howItWorks} variant="ghost" size="md" className="-ml-5 text-pri-700">
              See the full journey <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
