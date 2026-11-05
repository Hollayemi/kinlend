"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { MessageCircle, Plus } from "lucide-react";
import { faqs } from "@/config/content";
import { siteConfig, whatsappHref } from "@/config/site";
import { track } from "@/lib/analytics";
import { collapseMotion, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/motion/Reveal";

type Item = { readonly q: string; readonly a: string };

export function Faq({
  items = faqs,
  eyebrow = "Questions",
  title = "Plain answers.",
  body = "If something is not clear here, ask. We would rather explain than have you guess.",
}: {
  items?: readonly Item[];
  eyebrow?: string;
  title?: string;
  body?: string;
} = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <section id="faq" className="scroll-mt-24 bg-neu-50 py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={eyebrow} title={title} body={body} />
          <Reveal className="mt-8">
            <ButtonLink href={whatsappHref()} variant="secondary" size="md" event="whatsapp_click" eventProps={{ location: "faq" }}>
              <MessageCircle className="h-4 w-4" />
              Ask on WhatsApp
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal as="ul" className="divide-y divide-neu-200 border-y border-neu-200 lg:col-span-8">
          {items.map((f, i) => {
            const isOpen = open === i;
            const panel = `${base}-p${i}`;
            return (
              <li key={f.q}>
                <h3 className="font-sans text-base">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panel}
                    onClick={() => {
                      if (!isOpen) track("faq_open", { question: f.q });
                      setOpen(isOpen ? null : i);
                    }}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className={cn("font-display text-[1.25rem] font-semibold leading-snug tracking-[-0.01em] transition-colors", isOpen ? "text-pri-800" : "text-neu-900")}>
                      {f.q}
                    </span>
                    <m.span aria-hidden animate={{ rotate: isOpen ? 45 : 0 }} transition={spring.snappy} className="shrink-0 text-neu-700">
                      <Plus className="h-5 w-5" />
                    </m.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div id={panel} role="region" {...collapseMotion} className="overflow-hidden">
                      <p className="max-w-2xl pb-6 text-[1.0625rem] leading-relaxed text-neu-700">{f.a.replaceAll("{{ussd}}", siteConfig.ussd.code)}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
