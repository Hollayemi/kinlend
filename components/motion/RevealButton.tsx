"use client";

import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Plus } from "lucide-react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/button-styles";
import { collapseMotion, popoverMotion, spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

export type RevealPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end" | "inline";

const panelPosition: Record<Exclude<RevealPlacement, "inline">, string> = {
  "bottom-start": "left-0 top-full mt-3 origin-top-left",
  "bottom-end": "right-0 top-full mt-3 origin-top-right",
  "top-start": "left-0 bottom-full mb-3 origin-bottom-left",
  "top-end": "right-0 bottom-full mb-3 origin-bottom-right",
};

/**
 * A button that reveals content with motion: a popover in any direction, or an
 * inline expansion that pushes the page down.
 *
 *   <RevealButton label="Apply / Repay" onReveal={() => track("ussd_code_reveal")}>
 *     {({ close }) => <YourPanel onDone={close} />}
 *   </RevealButton>
 *
 * Closes on Escape and on outside click. The "+" turns into "×".
 */
export function RevealButton({
  label,
  icon,
  children,
  placement = "bottom-start",
  variant = "primary",
  size = "lg",
  panelLabel,
  onReveal,
  onClose,
  defaultOpen = false,
  className,
  panelClassName,
}: {
  label: ReactNode;
  icon?: ReactNode;
  children: ReactNode | ((api: { close: () => void }) => ReactNode);
  placement?: RevealPlacement;
  variant?: ButtonVariant;
  size?: ButtonSize;
  panelLabel?: string;
  onReveal?: () => void;
  onClose?: () => void;
  defaultOpen?: boolean;
  className?: string;
  panelClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const inline = placement === "inline";

  const close = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => {
      if (!inline && root.current && !root.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, inline, close]);

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) onReveal?.();
    else onClose?.();
  };

  const motionProps = inline ? collapseMotion : popoverMotion(placement.startsWith("top") ? "bottom" : "top");

  return (
    <div ref={root} className={cn(inline ? "block" : "relative inline-block", className)}>
      <m.button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        whileTap={{ scale: 0.97 }}
        transition={spring.press}
        className={buttonClasses({ variant, size })}
      >
        {icon}
        <span>{label}</span>
        <m.span aria-hidden animate={{ rotate: open ? 135 : 0 }} transition={spring.snappy} className="-mr-1 inline-flex">
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </m.span>
      </m.button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="panel"
            id={id}
            role="region"
            aria-label={panelLabel ?? (typeof label === "string" ? label : undefined)}
            {...motionProps}
            className={cn(
              inline
                ? "overflow-hidden"
                : cn("absolute z-50 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-neu-200 bg-white p-5 text-neu-900 shadow-pop", panelPosition[placement]),
              panelClassName,
            )}
          >
            {typeof children === "function" ? children({ close }) : children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
