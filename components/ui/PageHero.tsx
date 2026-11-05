import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { MediaSlot } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { TextReveal } from "@/components/motion/TextReveal";

const wash = {
  pri: "from-pri-900/95 via-pri-900/80 to-pri-900/45",
  sec: "from-sec-900/95 via-sec-900/80 to-sec-900/45",
  ter: "from-ter-900/95 via-ter-900/80 to-ter-900/45",
} as const;

const eyebrowTone = { pri: "text-pri-200", sec: "text-sec-200", ter: "text-ter-200" } as const;

/**
 * Hero for inner pages. Sits under the transparent header, so it must stay dark
 * and full-bleed. Headline is CSS-animated (paints before hydration).
 */
export function PageHero({
  eyebrow,
  title,
  emphasis = [],
  lede,
  photo,
  tone = "pri",
  children,
}: {
  eyebrow: string;
  title: string;
  emphasis?: string[];
  lede: string;
  photo: MediaSlot;
  tone?: keyof typeof wash;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-neu-900">
        <Media slot={photo} tone={tone} priority sizes="100vw" />
        <div className={`absolute inset-0 bg-gradient-to-r ${wash[tone]}`} />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
      </div>

      <Container className="relative pb-16 pt-32 lg:pb-24 lg:pt-44">
        <nav aria-label="Breadcrumb" className="animate-fade-up text-sm text-white/70">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white">Home</Link>
            </li>
            <ChevronRight aria-hidden className="h-3.5 w-3.5" />
            <li aria-current="page" className="text-white">{eyebrow}</li>
          </ol>
        </nav>

        <p className={`eyebrow mt-8 animate-fade-up ${eyebrowTone[tone]}`} style={{ animationDelay: "60ms" }}>
          {eyebrow}
        </p>
        <TextReveal
          text={title}
          emphasis={emphasis}
          emphasisClassName="text-acc-300"
          delay={100}
          className="mt-4 max-w-3xl text-[2.5rem] font-extrabold leading-[1.05] sm:text-[3.4rem] lg:text-[4rem]"
        />
        <p className="mt-6 max-w-xl animate-fade-up text-[1.1875rem] leading-relaxed text-white/85" style={{ animationDelay: "520ms" }}>
          {lede}
        </p>
        {children && (
          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "640ms" }}>
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
