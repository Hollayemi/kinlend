import { getSteps } from "@/config/pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProgressTimeline } from "@/components/motion/ProgressTimeline";

export function GetKinMasterSteps() {
  return (
    <section id="steps" className="scroll-mt-24 bg-neu-50 py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              tone="sec"
              eyebrow="How to get a KinMaster"
              title="Four steps from asking around to being approved."
              body="A KinMaster is the person in your community who knows you, checks you in person and puts their name behind you. Here is how to find yours."
            />
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-3">
          <ProgressTimeline>
            <ol className="space-y-12">
              {getSteps.map((s) => (
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
