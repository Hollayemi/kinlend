import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";
import { ApplyRepayButton } from "@/components/ussd/ApplyRepayButton";

/** Two quiet exits: people who already have a KinMaster, and people who want to be one. */
export function KinMasterInvite() {
  return (
    <section className="bg-neu-100 py-16 lg:py-20">
      <Container className="grid gap-4 md:grid-cols-2">
        <Reveal className="rounded-2xl border border-neu-200 bg-white p-8">
          <p className="eyebrow text-pri-700">Already approved?</p>
          <h3 className="mt-3 text-2xl font-bold text-neu-900">Dial the code and you are in.</h3>
          <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-neu-600">Once a KinMaster has vouched for you and KINLEND has approved you, apply and repay from any phone.</p>
          <div className="mt-6">
            <ApplyRepayButton size="md" source="find-kinmaster-approved" />
          </div>
        </Reveal>
        <Reveal delay={0.08} className="rounded-2xl bg-sec-900 p-8 text-white">
          <p className="eyebrow text-sec-300">Want to be one?</p>
          <h3 className="mt-3 text-2xl font-bold">Become the person your community vouches through.</h3>
          <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-white/80">KinMasters earn tiered commissions and never handle repayment cash.</p>
          <div className="mt-6">
            <ButtonLink href={siteConfig.routes.becomeKinMaster} variant="onDark" size="md" event="kinmaster_apply_click" eventProps={{ location: "find-kinmaster-invite" }}>
              Become a KinMaster
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
