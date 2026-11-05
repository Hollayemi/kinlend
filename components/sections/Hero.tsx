import { MapPin, Phone as PhoneIcon, ChevronDown } from "lucide-react";
import { siteConfig, ussdDialHref } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { TextReveal } from "@/components/motion/TextReveal";
import { ApplyRepayButton } from "@/components/ussd/ApplyRepayButton";
import { HeroSlides } from "./HeroSlides";
import { HeroPhone } from "./HeroPhone";

const AUDIENCE = ["Traders", "Artisans", "Farmers"] as const;

/**
 * Full-screen hero. The (transparent) header sits on top of it. Headline and
 * copy are CSS-animated so they paint at once on a slow connection; the phone
 * slides up on load and runs the USSD walkthrough.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <HeroSlides />

      {/* Soft radial glow so white copy reads over any slide frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-full bg-[radial-gradient(ellipse_at_20%_40%,rgba(15,23,42,0.72),transparent_60%)] lg:w-[70%]"
      />
      {/* Vignette bottom so the scroll cue + phone don't float off into nothing. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-t from-black/60 to-transparent"
      />

      <Container className="relative z-10 grid min-h-[100svh] items-center gap-12 pb-24 pt-28 lg:grid-cols-12 lg:gap-6 lg:pb-20 lg:pt-32">
        {/* ── copy column ───────────────────────────────────────────── */}
        <div className="flex flex-col lg:col-span-7 lg:max-w-[40rem]">
          <p
            className="eyebrow animate-fade-up text-pri-200"
            style={{ "--d": "60ms" } as React.CSSProperties}
          >
            Loans for traders, artisans and farmers
          </p>

          <TextReveal
            text="No collateral. Your community vouches for you."
            emphasis={["community", "vouches"]}
            emphasisClassName="text-acc-300"
            delay={120}
            className="mt-5 text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.02em] text-white sm:text-[3.6rem] lg:text-[4.25rem]"
          />

          <p
            className="mt-7 max-w-[32rem] animate-fade-up text-[1.1875rem] leading-relaxed text-white/85"
            style={{ "--d": "620ms" } as React.CSSProperties}
          >
            A loan approved by people who know you. Repaid on any phone, with an
            SMS receipt in your hand every time.
          </p>

          {/* Audience chips — pulls the "who it's for" out of the eyebrow. */}
          <ul
            aria-label="Built for"
            className="mt-6 flex flex-wrap items-center gap-2 animate-fade-up"
            style={{ "--d": "700ms" } as React.CSSProperties}
          >
            {AUDIENCE.map((label) => (
              <li
                key={label}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm"
              >
                {label}
              </li>
            ))}
          </ul>

          <div
            className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--d": "820ms" } as React.CSSProperties}
          >
            <ApplyRepayButton
              placement="bottom-start"
              size="lg"
              variant="onDark"
              source="hero"
            />
            <ButtonLink
              href={siteConfig.routes.findKinMaster}
              variant="onDarkOutline"
              size="lg"
              event="find_kinmaster_click"
              eventProps={{ location: "hero" }}
            >
              <MapPin className="h-4 w-4" />
              Find a KinMaster
            </ButtonLink>
          </div>

          {/* USSD callout — promoted from plain underlined text to a pill. */}
          <a
            href={ussdDialHref()}
            className="mt-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/85 backdrop-blur-sm transition-colors hover:border-white/30 hover:bg-white/10 animate-fade-up"
            style={{ "--d": "940ms" } as React.CSSProperties}
          >
            <PhoneIcon className="h-4 w-4 text-pri-200" />
            <span>
              No smartphone? Dial{" "}
              <span className="font-mono font-semibold text-white">
                {siteConfig.ussd.code}
              </span>{" "}
              from any phone.
            </span>
          </a>

          {/* Scroll cue — only on mobile where the phone sits below. */}
          <div
            aria-hidden
            className="mt-10 flex items-center gap-2 text-xs text-white/60 lg:hidden animate-fade-up"
            style={{ "--d": "1100ms" } as React.CSSProperties}
          >
            <ChevronDown className="h-4 w-4 animate-bounce" />
            Scroll to see it work
          </div>
        </div>

        {/* ── phone column ──────────────────────────────────────────── */}
        <div className="relative lg:col-span-5 lg:justify-self-center lg:-ml-4 xl:-ml-10">
          {/*
            `min-h` prevents layout jump while the phone mounts. The phone
            itself already has [perspective] + cursor tilt, so no wrapper
            transform here — otherwise it fights the tilt.
          */}
          <div className="mx-auto min-h-[36rem] w-full max-w-[19rem] sm:max-w-[20rem] lg:min-h-[40rem]">
            <HeroPhone />
          </div>
        </div>
      </Container>
    </section>
  );
}