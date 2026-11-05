/**
 * Intent tracking. The decisive actions (USSD, KinMaster visits) happen off the
 * web, so we record the hand-off moments, not just page views (PRD section 14).
 *
 * This only dispatches a DOM event. Wire a consent-aware analytics provider to
 * listen for "kinlend:track" once NDPA consent is in place. Never put PII in props.
 */
export type TrackEvent =
  | "ussd_code_reveal"
  | "ussd_tap_to_dial"
  | "ussd_code_copy"
  | "find_kinmaster_click"
  | "kinmaster_apply_click"
  | "kinmaster_login_click"
  | "whatsapp_click"
  | "investor_cta_click"
  | "partner_cta_click"
  | "faq_open"
  | "video_play";

export type TrackProps = Record<string, string | number | boolean>;

export function track(event: TrackEvent, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("kinlend:track", { detail: { event, props, ts: Date.now() } }));
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, props);
}
