"use client";

import { useState } from "react";
import { Check, Copy, MapPin, Phone } from "lucide-react";
import { siteConfig, ussdDialHref } from "@/config/site";
import { track } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buttonClasses } from "@/components/ui/button-styles";
import { UssdCodeLoader } from "./UssdCodeLoader";

/**
 * Contents of the "Apply / Repay" reveal. No transaction happens here: it only
 * shows the code and explains the flow (PRD section 8). On touch devices the
 * code is a tap-to-dial link; elsewhere it is large text plus a copy button.
 */
export function UssdRevealPanel({ source }: { source: string }) {
  const code = siteConfig.ussd.code;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      track("ussd_code_copy", { source });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard can be blocked; the code is still on screen. */
    }
  };

  return (
    <div>
      <p className="text-sm font-medium text-neu-600">Dial this on any phone</p>
      <UssdCodeLoader size="lg" loop={false} className="mt-2" />

      <div className="mt-5 flex flex-col gap-2">
        {/* Wrapped, not class-switched on the button: the button's own display class would win. */}
        <div className="hidden pointer-coarse:block">
          <a
            href={ussdDialHref()}
            onClick={() => track("ussd_tap_to_dial", { source })}
            className={buttonClasses({ variant: "ter", size: "md", className: "w-full" })}
          >
            <Phone className="h-4 w-4" />
            Tap to dial {code}
          </a>
        </div>
        <div className="pointer-coarse:hidden">
          <button type="button" onClick={copy} className={buttonClasses({ variant: "secondary", size: "md", className: "w-full" })}>
            {copied ? <Check className="h-4 w-4 text-pri-700" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy code"}
          </button>
        </div>
      </div>

      <p className="mt-4 border-t border-neu-200 pt-4 text-[0.8125rem] leading-relaxed text-neu-600">
        Repayment goes straight to KINLEND and returns an instant SMS receipt. No KinMaster ever holds your money.
      </p>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-neu-600">
        Not enrolled yet?{" "}
        <ButtonLink
          href={siteConfig.routes.findKinMaster}
          variant="ghost"
          size="sm"
          event="find_kinmaster_click"
          eventProps={{ location: `reveal-${source}` }}
          className="!h-auto !px-0 !py-0 font-semibold text-pri-700 underline underline-offset-2 hover:bg-transparent"
        >
          <MapPin className="h-3.5 w-3.5" />
          Find a KinMaster
        </ButtonLink>{" "}
        to get started.
      </p>
    </div>
  );
}
