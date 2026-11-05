"use client";

import type { ReactNode } from "react";
import { m, type HTMLMotionProps } from "framer-motion";
import { reveal, scaleIn, stagger, viewportOnce, type Direction } from "@/lib/motion";

type Tag = "div" | "section" | "article" | "header" | "footer" | "figure" | "ul" | "ol" | "li" | "p" | "span" | "h2" | "h3";

type Base = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "whileInView" | "viewport" | "children"> & {
  as?: Tag;
  className?: string;
  children?: ReactNode;
};

/**
 * Scroll reveal: fades and slides in once when it enters the viewport.
 *   <Reveal direction="left" delay={0.1}>…</Reveal>
 *
 * Content stays visible if JavaScript never loads (see the <noscript> rule in
 * app/layout.tsx, which targets [data-reveal]).
 */
export function Reveal({
  as = "div",
  direction = "up",
  distance = 24,
  duration = 0.6,
  delay = 0,
  scale,
  once = true,
  children,
  ...rest
}: Base & { direction?: Direction; distance?: number; duration?: number; delay?: number; scale?: boolean; once?: boolean }) {
  const Tag = m[as] as typeof m.div;
  return (
    <Tag
      data-reveal
      variants={scale ? scaleIn({ duration, delay }) : reveal({ direction, distance, duration, delay })}
      initial="hidden"
      whileInView="show"
      viewport={{ ...viewportOnce, once }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Staggered group. Direct or nested <StaggerItem>s animate one after another.
 *   <Stagger as="ul" gap={0.1}><StaggerItem as="li">…</StaggerItem></Stagger>
 */
export function Stagger({
  as = "div",
  gap = 0.08,
  delay = 0,
  once = true,
  children,
  ...rest
}: Base & { gap?: number; delay?: number; once?: boolean }) {
  const Tag = m[as] as typeof m.div;
  return (
    <Tag variants={stagger({ gap, delay })} initial="hidden" whileInView="show" viewport={{ ...viewportOnce, once }} {...rest}>
      {children}
    </Tag>
  );
}

/** Must sit inside a <Stagger>; it inherits the parent's hidden/show state. */
export function StaggerItem({
  as = "div",
  direction = "up",
  distance = 20,
  duration = 0.55,
  children,
  ...rest
}: Base & { direction?: Direction; distance?: number; duration?: number }) {
  const Tag = m[as] as typeof m.div;
  return (
    <Tag data-reveal variants={reveal({ direction, distance, duration })} {...rest}>
      {children}
    </Tag>
  );
}
