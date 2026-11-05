"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type TrackEvent, type TrackProps } from "@/lib/analytics";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./button-styles";

type Props = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Fires a tracked hand-off event on click. */
  event?: TrackEvent;
  eventProps?: TrackProps;
};

const isExternal = (href: string) => /^(https?:|tel:|mailto:)/.test(href);

export function ButtonLink({ href, variant, size, event, eventProps, className, onClick, children, ...rest }: Props) {
  const classes = buttonClasses({ variant, size, className });
  const handle: NonNullable<Props["onClick"]> = (e) => {
    if (event) track(event, eventProps);
    onClick?.(e);
  };

  if (isExternal(href)) {
    const web = href.startsWith("http");
    return (
      <a href={href} className={classes} onClick={handle} {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}

/** Text link with the same tracking hook. */
export function TrackedLink({ href, event, eventProps, onClick, children, ...rest }: Omit<Props, "variant" | "size">) {
  const handle: NonNullable<Props["onClick"]> = (e) => {
    if (event) track(event, eventProps);
    onClick?.(e);
  };
  return isExternal(href) ? (
    <a href={href} onClick={handle} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
