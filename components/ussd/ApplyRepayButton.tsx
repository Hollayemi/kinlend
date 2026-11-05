"use client";

import { RevealButton, type RevealPlacement } from "@/components/motion/RevealButton";
import type { ButtonSize, ButtonVariant } from "@/components/ui/button-styles";
import { track } from "@/lib/analytics";
import { UssdRevealPanel } from "./UssdRevealPanel";

/** The site-wide "Apply / Repay" action: reveals the USSD code and the way to a KinMaster. */
export function ApplyRepayButton({
  placement = "bottom-start",
  size = "lg",
  variant = "primary",
  source,
  className,
}: {
  placement?: RevealPlacement;
  size?: ButtonSize;
  variant?: ButtonVariant;
  /** Where the button sits; sent with the tracking event. */
  source: string;
  className?: string;
}) {
  return (
    <RevealButton
      label="Apply / Repay"
      placement={placement}
      size={size}
      variant={variant}
      panelLabel="USSD code to apply or repay"
      onReveal={() => track("ussd_code_reveal", { source })}
      className={className}
    >
      <UssdRevealPanel source={source} />
    </RevealButton>
  );
}
