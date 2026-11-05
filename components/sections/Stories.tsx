"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { story } from "@/config/content";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/motion/Reveal";

const serves = ["Market traders", "Artisans", "Smallholder farmers", "Cooperative and ajo/esusu members"];

/**
 * Borrower story. The video is click-to-play and only starts downloading on
 * click, so it costs a metered phone nothing until the visitor asks for it.
 */
export function Stories() {
  const slot = siteConfig.media.story;
  const [playing, setPlaying] = useState(false);

  return (
    <section id="stories" className="scroll-mt-24 bg-neu-50 py-20 lg:py-28">
      <Container>
        <SectionHeading eyebrow="Impact" title="Heard in the market." body="Real borrowers, in their own words. Shared with their consent." />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neu-900 sm:aspect-[16/11]">
              {playing && slot.video ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  poster={slot.src}
                  className="absolute inset-0 h-full w-full bg-neu-900 object-contain"
                >
                  {slot.videoWebm && <source src={slot.videoWebm} type="video/webm" />}
                  <source src={slot.video} type="video/mp4" />
                </video>
              ) : (
                <>
                  <Media slot={{ ...slot, video: undefined }} sizes="(min-width: 1024px) 56vw, 100vw" tone="pri" />
                  <div aria-hidden className="absolute inset-0 bg-neu-900/25" />
                  {slot.video && (
                    <button
                      type="button"
                      onClick={() => {
                        track("video_play", { id: "borrower-story" });
                        setPlaying(true);
                      }}
                      className="group absolute inset-0 grid place-items-center"
                      aria-label="Play the borrower story"
                    >
                      <span className="grid h-20 w-20 place-items-center rounded-full bg-white text-pri-800 shadow-pop transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
                        <Play className="ml-1 h-8 w-8" fill="currentColor" strokeWidth={0} />
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <blockquote>
                <p className="font-display text-[1.875rem] font-medium leading-[1.2] text-neu-900 sm:text-[2.25rem]">“{story.quote}”</p>
                <footer className="mt-6">
                  <p className="font-semibold text-neu-900">{story.name}</p>
                  <p className="text-sm text-neu-600">{story.place}</p>
                </footer>
              </blockquote>
              {process.env.NODE_ENV !== "production" && story.isSample && (
                <p className="mt-4 inline-block rounded border border-dashed border-acc-600 bg-acc-50 px-2 py-1 text-xs text-acc-800">
                  Sample copy. Replace with a consented borrower story before launch.
                </p>
              )}
            </Reveal>

            <Reveal delay={0.1} className="mt-10 border-t border-neu-200 pt-6">
              <p className="eyebrow text-neu-600">Who we lend to</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {serves.map((s) => (
                  <li key={s} className="rounded-md border border-neu-300 bg-white px-3 py-1.5 text-sm text-neu-800">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
