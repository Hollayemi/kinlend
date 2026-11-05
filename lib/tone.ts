/**
 * Tailwind only generates classes it can see as full strings, so tone-based
 * styling is mapped here instead of being built with template literals.
 */
export type Tone = "pri" | "sec" | "ter" | "acc" | "neu";

export const tones: Record<
  Tone,
  { text: string; textOnDark: string; chip: string; dot: string; soft: string; border: string; fill: string }
> = {
  pri: { text: "text-pri-700", textOnDark: "text-pri-300", chip: "bg-pri-100 text-pri-800", dot: "bg-pri-600", soft: "bg-pri-50", border: "border-pri-600", fill: "bg-pri-600" },
  sec: { text: "text-sec-700", textOnDark: "text-sec-300", chip: "bg-sec-100 text-sec-800", dot: "bg-sec-600", soft: "bg-sec-50", border: "border-sec-600", fill: "bg-sec-600" },
  ter: { text: "text-ter-700", textOnDark: "text-ter-300", chip: "bg-ter-100 text-ter-800", dot: "bg-ter-600", soft: "bg-ter-50", border: "border-ter-600", fill: "bg-ter-600" },
  acc: { text: "text-acc-700", textOnDark: "text-acc-300", chip: "bg-acc-100 text-acc-800", dot: "bg-acc-500", soft: "bg-acc-50", border: "border-acc-500", fill: "bg-acc-500" },
  neu: { text: "text-neu-700", textOnDark: "text-neu-300", chip: "bg-neu-100 text-neu-800", dot: "bg-neu-600", soft: "bg-neu-100", border: "border-neu-600", fill: "bg-neu-600" },
};
