"use client";

import { useState, type FormEvent } from "react";
import { Check, Mail, MessageCircle } from "lucide-react";
import { siteConfig, whatsappHref } from "@/config/site";
import { submitLead, type LeadType } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { buttonClasses } from "@/components/ui/button-styles";
import { CheckField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";

type Values = { name: string; organisation: string; role: string; email: string; phone: string; interest: string; message: string; consent: boolean; website: string };
const empty: Values = { name: "", organisation: "", role: "", email: "", phone: "", interest: "", message: "", consent: false, website: "" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Investor / partner enquiry. Posts to /api/leads. If no lead endpoint is
 * configured, or it fails, it offers WhatsApp and email with the message
 * pre-written, and never says "sent" unless the server accepted it.
 */
export function LeadForm({
  type,
  interests,
  submitLabel,
  successTitle,
  successBody,
  messagePlaceholder,
}: {
  type: Extract<LeadType, "investor" | "partner">;
  interests: string[];
  submitLabel: string;
  successTitle: string;
  successBody: string;
  messagePlaceholder?: string;
}) {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const set = <K extends keyof Values>(k: K) => (val: Values[K]) => setV((p) => ({ ...p, [k]: val }));

  const summary = [
    `Hello KINLEND, ${type === "investor" ? "an investor enquiry" : "a partner enquiry"}.`,
    `Name: ${v.name}`,
    `Organisation: ${v.organisation}`,
    v.role && `Role: ${v.role}`,
    `Email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    v.interest && `Interested in: ${v.interest}`,
    v.message && `Message: ${v.message}`,
  ].filter(Boolean).join("\n");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!v.name.trim()) next.name = "Please tell us your name.";
    if (!v.organisation.trim()) next.organisation = "Please tell us your organisation.";
    if (!EMAIL.test(v.email.trim())) next.email = "Please enter a valid email address.";
    if (!v.consent) next.consent = "We need your agreement to contact you.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    track(type === "investor" ? "investor_cta_click" : "partner_cta_click", { location: "enquiry-form" });
    const result = await submitLead(type, { ...v, consent: true });
    setStatus(result === "sent" ? "sent" : "failed");
  };

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-neu-200 bg-neu-50 p-8">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-pri-600 text-white"><Check className="h-5 w-5" strokeWidth={3} /></span>
        <h3 className="mt-5 text-2xl font-bold text-neu-900">{successTitle}</h3>
        <p className="mt-2 max-w-md text-[1rem] leading-relaxed text-neu-600">{successBody}</p>
      </div>
    );
  }

  const mail = siteConfig.contact.email;
  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-2xl border border-neu-200 bg-neu-50 p-6 sm:p-8">
      <Honeypot value={v.website} onChange={set("website")} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Your name" name="name" value={v.name} onChange={set("name")} autoComplete="name" error={errors.name} />
        <TextField label="Organisation" name="organisation" value={v.organisation} onChange={set("organisation")} autoComplete="organization" error={errors.organisation} />
        <TextField label="Your role" name="role" value={v.role} onChange={set("role")} autoComplete="organization-title" />
        <TextField label="Email" name="email" type="email" inputMode="email" value={v.email} onChange={set("email")} autoComplete="email" error={errors.email} />
        <TextField label="Phone (optional)" name="phone" type="tel" inputMode="tel" value={v.phone} onChange={set("phone")} autoComplete="tel" />
        <SelectField label="What are you interested in?" name="interest" value={v.interest} onChange={set("interest")} options={interests} />
        <TextAreaField className="sm:col-span-2" label="Anything we should know? (optional)" name="message" value={v.message} onChange={set("message")} placeholder={messagePlaceholder} />
      </div>

      <div className="mt-6">
        <CheckField name="consent" checked={v.consent} onChange={set("consent")} error={errors.consent}>
          I agree that KINLEND may contact me about this enquiry. {siteConfig.compliance.ndpa}
        </CheckField>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={status === "sending"} className={buttonClasses({ variant: "ter", size: "lg" })}>
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
      </div>

      {status === "failed" && (
        <div role="alert" className="mt-6 rounded-xl border border-neu-300 bg-white p-5">
          <p className="font-semibold text-neu-900">We could not send this just now.</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-neu-600">Your details are still here. Send them another way and we will pick them up.</p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <a href={whatsappHref(summary)} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: "secondary", size: "md" })}>
              <MessageCircle className="h-4 w-4" /> Send on WhatsApp
            </a>
            {mail && (
              <a
                href={`mailto:${mail}?subject=${encodeURIComponent(type === "investor" ? "Investor enquiry" : "Partner enquiry")}&body=${encodeURIComponent(summary)}`}
                className={buttonClasses({ variant: "secondary", size: "md" })}
              >
                <Mail className="h-4 w-4" /> Send by email
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
