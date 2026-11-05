import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language. Everything animates transform and opacity only
 * (cheap on low-end Android) and respects prefers-reduced-motion through
 * <MotionProvider />.
 */

export type Bezier = [number, number, number, number];

export const easeOut: Bezier = [0.22, 1, 0.36, 1];
export const easeInOut: Bezier = [0.65, 0, 0.35, 1];

export const spring = {
  soft: { type: "spring", stiffness: 220, damping: 26 },
  snappy: { type: "spring", stiffness: 420, damping: 32 },
  press: { type: "spring", stiffness: 600, damping: 30 },
} satisfies Record<string, Transition>;

/** Scroll-triggered defaults: fire once, a little before the element is fully in view. */
export const viewportOnce = { once: true, margin: "0px 0px -10% 0px" } as const;

export type Direction = "up" | "down" | "left" | "right" | "none";

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up": return { y: distance };
    case "down": return { y: -distance };
    case "left": return { x: distance };
    case "right": return { x: -distance };
    default: return {};
  }
};

/** Fade + slide in from a direction. */
export const reveal = ({
  direction = "up",
  distance = 24,
  duration = 0.6,
  delay = 0,
}: { direction?: Direction; distance?: number; duration?: number; delay?: number } = {}): Variants => ({
  hidden: { opacity: 0, ...offset(direction, distance) },
  show: { opacity: 1, x: 0, y: 0, transition: { duration, delay, ease: easeOut } },
});

/** Fade + scale up. */
export const scaleIn = ({ from = 0.94, duration = 0.6, delay = 0 }: { from?: number; duration?: number; delay?: number } = {}): Variants => ({
  hidden: { opacity: 0, scale: from },
  show: { opacity: 1, scale: 1, transition: { duration, delay, ease: easeOut } },
});

/** Parent variant that staggers children using their own "hidden"/"show" variants. */
export const stagger = ({ gap = 0.08, delay = 0 }: { gap?: number; delay?: number } = {}): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** Hover / tap feedback for buttons and cards. Spread onto an m.* element. */
export const press = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.97 },
  transition: spring.press,
};

/** Popover / dropdown panel. */
export const popoverMotion = (from: "top" | "bottom" = "top") => ({
  initial: { opacity: 0, scale: 0.96, y: from === "top" ? -8 : 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: from === "top" ? -4 : 4 },
  transition: { duration: 0.2, ease: easeOut },
});

/** Height-auto collapse (accordions, inline reveals). */
export const collapseMotion = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.28, ease: easeOut },
};

/** Bar that slides up from the bottom edge (mobile sticky action). */
export const slideUpMotion = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { duration: 0.32, ease: easeOut },
};
