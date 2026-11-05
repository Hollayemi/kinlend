"use client";

import { useId, useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { siteConfig, whatsappHref } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/button-styles";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT (Abuja)","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];
const BUSINESS = ["Market trading", "Artisan or craft", "Farming", "Cooperative or savings group", "Other small business"];

const field = "mt-2 h-12 w-full rounded-lg border border-neu-300 bg-white px-4 text-base text-neu-900 placeholder:text-neu-400 focus:border-ter-600 focus:outline-none focus:ring-2 focus:ring-ter-600/25";

/**
 * Request an introduction. It opens WhatsApp with a ready-made message, so it
 * works today with no backend and no lead can be silently lost. Nothing is sent
 * until the visitor presses send in WhatsApp. Swap for a CRM submit when the
 * backend exists (PRD section 7, lead capture).
 */
export function RequestKinMaster() {
  const id = useId();
  const [errors, setErrors] = useState<{ name?: string; community?: string }>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const community = String(f.get("community") ?? "").trim();
    const state = String(f.get("state") ?? "");
    const business = String(f.get("business") ?? "");

    const next: typeof errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!community) next.community = "Please tell us your market, town or community.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const where = [community, state].filter(Boolean).join(", ");
    const what = business ? ` I work in: ${business.toLowerCase()}.` : "";
    const text = `Hello KINLEND, my name is ${name}. I am in ${where}.${what} I would like to be introduced to a KinMaster.`;

    track("find_kinmaster_click", { location: "request-form" });
    window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="request" className="scroll-mt-24 bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tone="sec"
            eyebrow="Ask for an introduction"
            title="Cannot find a KinMaster yet? We will help."
            body="Tell us where you are and what you do. We will open a WhatsApp chat with your details ready, and help connect you to a KinMaster."
          />
          <Reveal as="p" className="mt-6 max-w-sm text-sm leading-relaxed text-neu-600">
            This opens WhatsApp with your message written for you. Nothing is sent until you press send there.
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-neu-200 bg-neu-50 p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="text-sm font-semibold text-neu-900">Your name</label>
                <input id={`${id}-name`} name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-e` : undefined} className={cn(field, errors.name && "border-neu-900")} />
                {errors.name && <p id={`${id}-name-e`} className="mt-1.5 text-sm font-medium text-neu-900">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor={`${id}-community`} className="text-sm font-semibold text-neu-900">Market, town or community</label>
                <input id={`${id}-community`} name="community" aria-invalid={!!errors.community} aria-describedby={errors.community ? `${id}-community-e` : undefined} className={cn(field, errors.community && "border-neu-900")} />
                {errors.community && <p id={`${id}-community-e`} className="mt-1.5 text-sm font-medium text-neu-900">{errors.community}</p>}
              </div>
              <div>
                <label htmlFor={`${id}-state`} className="text-sm font-semibold text-neu-900">State</label>
                <select id={`${id}-state`} name="state" defaultValue="" className={field}>
                  <option value="">Choose your state</option>
                  {STATES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor={`${id}-business`} className="text-sm font-semibold text-neu-900">What do you do?</label>
                <select id={`${id}-business`} name="business" defaultValue="" className={field}>
                  <option value="">Choose one</option>
                  {BUSINESS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button type="submit" className={buttonClasses({ variant: "sec", size: "lg" })}>
                <MessageCircle className="h-4 w-4" />
                Continue on WhatsApp
              </button>
              <a
                href={`tel:${siteConfig.ussd.code.replace(/#/g, "%23")}`}
                className="hidden text-sm text-neu-600 underline underline-offset-2 pointer-coarse:inline"
              >
                Already enrolled? Dial {siteConfig.ussd.code}
              </a>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
