import type { Metadata } from "next";
import { ArrowRight, Lock, MessageCircle } from "lucide-react";
import { photos, siteConfig, whatsappHref } from "@/config/site";
import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";
import { ButtonLink, TrackedLink } from "@/components/ui/ButtonLink";
import { buttonClasses } from "@/components/ui/button-styles";

export const metadata: Metadata = {
  title: "KinMaster login",
  description: "Sign in to the KinMaster app to manage your community portfolio.",
  robots: { index: false },
  alternates: { canonical: "/kinmasters/login" },
};

/**
 * Hand-off only. KinMasters sign in once, in the KinMaster app, through the
 * shared identity provider (single sign-on, PRD sections 7 and 9). This site
 * never collects or sees a KinMaster's credentials.
 */
export default function KinMasterLoginPage() {
  const portal = siteConfig.portalUrl;
  return (
    <SiteShell>
      <section className="relative isolate overflow-hidden text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-sec-900">
          <Media slot={photos.elderWorking} tone="sec" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-r from-sec-900/95 via-sec-900/85 to-sec-900/60" />
        </div>

        <Container className="grid min-h-[100svh] items-center gap-12 pb-16 pt-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow animate-fade-up text-sec-200">KinMaster login</p>
            <h1 className="mt-4 animate-fade-up text-[2.5rem] font-extrabold leading-[1.05] sm:text-[3.4rem]" style={{ animationDelay: "80ms" }}>
              Welcome back to your community.
            </h1>
            <p className="mt-6 max-w-md animate-fade-up text-[1.1875rem] leading-relaxed text-white/85" style={{ animationDelay: "200ms" }}>
              Your KinMaster app is where you manage your portfolio, see loan statuses and repayment schedules, flag problems and track your tier.
            </p>
          </div>

          <div className="animate-fade-up lg:col-span-5 lg:col-start-8" style={{ animationDelay: "320ms" }}>
            <div className="rounded-2xl bg-white p-8 text-neu-900 shadow-pop sm:p-9">
              <span aria-hidden className="grid h-11 w-11 place-items-center rounded-xl bg-sec-100 text-sec-700">
                <Lock className="h-5 w-5" />
              </span>
              <h2 className="mt-5 text-2xl font-bold">Sign in on the KinMaster app</h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-neu-600">
                You sign in once, on KINLEND&apos;s secure KinMaster app, and go straight to your dashboard. We never see your password on this website.
              </p>

              {portal ? (
                <ButtonLink href={portal} variant="sec" size="lg" event="kinmaster_login_click" eventProps={{ location: "login-page" }} className="mt-7 w-full">
                  Continue to the KinMaster app <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              ) : (
                <div className="mt-7">
                  <button type="button" disabled className={buttonClasses({ variant: "sec", size: "lg", className: "w-full" })}>
                    KinMaster app opens soon
                  </button>
                  <p className="mt-3 text-sm leading-relaxed text-neu-600">
                    The KinMaster app is not open for sign-in yet. If you are an approved KinMaster, message us and we will tell you when it is ready.
                  </p>
                  {process.env.NODE_ENV !== "production" && (
                    <p className="mt-3 rounded border border-dashed border-acc-600 bg-acc-50 px-2 py-1 text-xs text-acc-800">
                      Dev note: set NEXT_PUBLIC_KINMASTER_PORTAL_URL to the app&apos;s sign-in URL to enable this button.
                    </p>
                  )}
                </div>
              )}

              <p className="mt-6 border-t border-neu-200 pt-5 text-[0.8125rem] leading-relaxed text-neu-600">
                KINLEND will never ask for your KinMaster password or PIN on WhatsApp, SMS or any site other than the KinMaster app.
              </p>

              <div className="mt-5 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                <TrackedLink href={siteConfig.routes.becomeKinMaster} event="kinmaster_apply_click" eventProps={{ location: "login-page" }} className="font-semibold text-sec-700 underline underline-offset-2">
                  Not a KinMaster yet? Apply
                </TrackedLink>
                <TrackedLink href={whatsappHref("Hello KINLEND, I need help signing in to the KinMaster app.")} event="whatsapp_click" eventProps={{ location: "login-page" }} className="inline-flex items-center gap-1.5 font-semibold text-neu-700 underline underline-offset-2">
                  <MessageCircle className="h-3.5 w-3.5" /> Need help signing in?
                </TrackedLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
