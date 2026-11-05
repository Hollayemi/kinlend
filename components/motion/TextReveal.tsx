import { cn } from "@/lib/cn";

/**
 * Headline that rises in word by word.
 *
 * Deliberately CSS-driven (no JavaScript) so above-the-fold headlines animate
 * on first paint instead of waiting for hydration on a slow connection.
 * Words listed in `emphasis` pick up the accent class.
 */
export function TextReveal({
  text,
  as: Tag = "h1",
  delay = 0,
  step = 70,
  emphasis = [],
  emphasisClassName = "text-pri-700",
  className,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  /** ms before the first word. */
  delay?: number;
  /** ms between words. */
  step?: number;
  emphasis?: string[];
  emphasisClassName?: string;
  className?: string;
}) {
  const words = text.split(" ");
  const clean = (w: string) => w.replace(/[.,!?;:]/g, "").toLowerCase();
  const marked = emphasis.map((w) => w.toLowerCase());

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <span
            data-reveal
            className={cn("inline-block animate-rise", marked.includes(clean(word)) && emphasisClassName)}
            style={{ animationDelay: `${delay + i * step}ms` }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
