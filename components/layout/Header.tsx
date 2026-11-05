"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { siteConfig, ussdDialHref, whatsappHref } from "@/config/site";
import { collapseMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ApplyRepayButton } from "@/components/ussd/ApplyRepayButton";

/**
 * Fixed header. Over the hero it is transparent with white text, so it blends
 * into the photo; after a short scroll (or when the mobile menu is open) it
 * turns solid. Pages without a full-bleed hero should add top padding equal to
 * the header height (4rem, 4.5rem from lg).
 */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        solid ? "border-neu-200 bg-neu-50/95" : "border-white/10 bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" aria-label="KINLEND home" className="rounded-md">
          <Logo keepDefault={!solid} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-[0.9375rem] font-semibold transition-colors",
                  solid ? "text-neu-700 hover:bg-neu-100 hover:text-neu-900" : "text-white/90 hover:bg-white/10 hover:text-white",
                  active && (solid ? "text-pri-700" : "text-white"),
                )}
              >
                {item.label}
                {active && <span aria-hidden className={cn("absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full", solid ? "bg-pri-600" : "bg-acc-300")} />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* The USSD code stays visible in the header on phones and wide screens. */}
          <a
            href={ussdDialHref()}
            className={cn(
              "flex items-center gap-2 rounded-md font-mono text-[0.9375rem] font-semibold transition-colors sm:hidden xl:flex",
              solid ? "text-ter-700" : "text-white",
            )}
          >
            <span className={cn("font-sans text-xs font-medium", solid ? "text-neu-600" : "text-white/70")}>Dial</span>
            {siteConfig.ussd.code}
          </a>

          <div className="hidden sm:block">
            <ApplyRepayButton placement="bottom-end" size="md" variant={solid ? "primary" : "onDark"} source="header" />
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className={cn(
              "grid h-11 w-11 place-items-center rounded-lg transition-colors lg:hidden",
              solid ? "text-neu-900 hover:bg-neu-100" : "text-white hover:bg-white/10",
            )}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <AnimatePresence initial={false}>
        {open && (
          <m.div id="mobile-menu" {...collapseMotion} className="overflow-hidden border-t border-neu-200 bg-neu-50 lg:hidden">
            <Container className="py-4">
              <nav aria-label="Mobile" className="flex flex-col">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-neu-200 py-3.5 text-xl font-bold text-neu-900 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex flex-col gap-2">
                <ButtonLink href={siteConfig.routes.findKinMaster} variant="primary" size="lg" event="find_kinmaster_click" eventProps={{ location: "mobile-menu" }}>
                  Find a KinMaster
                </ButtonLink>
                <ButtonLink href={whatsappHref()} variant="secondary" size="lg" event="whatsapp_click" eventProps={{ location: "mobile-menu" }}>
                  <MessageCircle className="h-4 w-4" />
                  Chat on WhatsApp
                </ButtonLink>
              </div>
            </Container>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
