import type { Metadata } from "next";
import { Clock, ShieldCheck, Smartphone } from "lucide-react";
import { photos } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { KinMasterApplication } from "@/components/forms/KinMasterApplication";

export const metadata: Metadata = {
  title: "Apply to be a KinMaster",
  description: "Apply to become a KINLEND KinMaster in four short steps. Save your progress and come back any time.",
  alternates: { canonical: "/kinmasters/apply" },
};

const before = [
  { icon: Clock, title: "About five minutes", body: "Four short steps. Your progress saves on this device as you go, so you can stop and come back." },
  { icon: Smartphone, title: "Have two references ready", body: "Two people who know you well and are not family. Their names and mobile numbers." },
  { icon: ShieldCheck, title: "What we never ask for", body: "Not your BVN or NIN, your PIN, or any payment details. Identity checks happen later, in person, during vetting." },
];

export default function ApplyPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Apply"
        title="Apply to be a KinMaster."
        emphasis={["KinMaster."]}
        tone="sec"
        lede="Tell us about you, your community and two people who can vouch for you. Then agree to the standards every KinMaster keeps."
        photo={photos.elderWorking}
      />

      <section className="bg-neu-100 py-14 lg:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal as="p" className="eyebrow text-sec-700">Before you start</Reveal>
              <ul className="mt-5 space-y-6">
                {before.map(({ icon: Icon, title, body }) => (
                  <Reveal as="li" key={title} className="flex gap-4">
                    <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sec-100 text-sec-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-neu-900">{title}</h2>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-neu-600">{body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <KinMasterApplication />
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
