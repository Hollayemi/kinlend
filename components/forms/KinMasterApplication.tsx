"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, MessageCircle, RotateCcw } from "lucide-react";
import { siteConfig, whatsappHref } from "@/config/site";
import { submitLead } from "@/lib/leads";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { buttonClasses } from "@/components/ui/button-styles";
import { CheckField, Honeypot, SelectField, TextAreaField, TextField } from "./fields";

const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT (Abuja)","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
const YEARS = ["Less than 2 years", "2 to 5 years", "6 to 10 years", "More than 10 years"];
const VOUCH = ["Fewer than 10", "10 to 25", "26 to 50", "More than 50"];
const CONTACT = ["WhatsApp", "SMS", "Phone call"];

type V = {
  fullName: string; phone: string; email: string; contactVia: string;
  community: string; state: string; lga: string; occupation: string; years: string; standing: string; vouchFor: string;
  ref1Name: string; ref1Phone: string; ref1Relation: string; ref2Name: string; ref2Phone: string; ref2Relation: string;
  franchise: boolean;
  ackVetting: boolean; ackNoCash: boolean; ackAccountability: boolean; ackBlacklist: boolean; consent: boolean;
  website: string;
};
const empty: V = {
  fullName: "", phone: "", email: "", contactVia: "WhatsApp",
  community: "", state: "", lga: "", occupation: "", years: "", standing: "", vouchFor: "",
  ref1Name: "", ref1Phone: "", ref1Relation: "", ref2Name: "", ref2Phone: "", ref2Relation: "",
  franchise: false,
  ackVetting: false, ackNoCash: false, ackAccountability: false, ackBlacklist: false, consent: false,
  website: "",
};
type Errors = Partial<Record<keyof V, string>>;

const STORAGE_KEY = "kinlend:kinmaster-application:v1";
const STEPS = ["About you", "Your community", "References", "Agreement"] as const;

// Nigerian mobile: 0 or +234 or 234, then 7/8/9, then 0/1, then 8 digits.
const phoneOk = (p: string) => /^(?:\+?234|0)[789][01]\d{8}$/.test(p.replace(/[\s-]/g, ""));
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const req = (v: string, msg: string) => (v.trim() ? undefined : msg);

function validate(step: number, v: V): Errors {
  const e: Errors = {};
  if (step === 0) {
    e.fullName = req(v.fullName, "Please enter your full name.");
    if (!phoneOk(v.phone)) e.phone = "Enter a Nigerian mobile number, like 0803 123 4567.";
    if (v.email.trim() && !EMAIL.test(v.email.trim())) e.email = "That email does not look right.";
  }
  if (step === 1) {
    e.community = req(v.community, "Tell us your market, town or community.");
    e.state = req(v.state, "Choose your state.");
    e.occupation = req(v.occupation, "Tell us what you do.");
    e.years = req(v.years, "Choose one.");
    e.standing = req(v.standing, "Tell us how people in your community know you.");
    e.vouchFor = req(v.vouchFor, "Choose one.");
  }
  if (step === 2) {
    for (const n of ["1", "2"] as const) {
      e[`ref${n}Name`] = req(v[`ref${n}Name`], "Enter their name.");
      if (!phoneOk(v[`ref${n}Phone`])) e[`ref${n}Phone`] = "Enter their Nigerian mobile number.";
      e[`ref${n}Relation`] = req(v[`ref${n}Relation`], "How do you know them?");
    }
    if (v.ref1Phone && v.ref1Phone.replace(/\D/g, "") === v.ref2Phone.replace(/\D/g, "")) e.ref2Phone = "Use two different people.";
  }
  if (step === 3) {
    const need = "Please confirm to continue.";
    if (!v.ackVetting) e.ackVetting = need;
    if (!v.ackNoCash) e.ackNoCash = need;
    if (!v.ackAccountability) e.ackAccountability = need;
    if (!v.ackBlacklist) e.ackBlacklist = need;
    if (!v.consent) e.consent = need;
  }
  return Object.fromEntries(Object.entries(e).filter(([, m]) => m)) as Errors;
}

/**
 * Staged KinMaster application with save-and-resume (PRD section 9).
 *  - Progress is kept in this browser's localStorage, on every change, and is
 *    cleared when the application is accepted. Nothing leaves the device until submit.
 *  - Submit posts to /api/leads. If no endpoint is configured, or it fails, the
 *    applicant can send the same details on WhatsApp. We never say "received"
 *    unless the server accepted it.
 *  - No BVN/NIN, PIN or payment data is collected here.
 */
export function KinMasterApplication() {
  const [v, setV] = useState<V>(empty);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"editing" | "sending" | "sent" | "failed">("editing");
  const [restored, setRestored] = useState(false);
  const [saved, setSaved] = useState(false);
  const loaded = useRef(false);
  const top = useRef<HTMLDivElement>(null);

  const set = <K extends keyof V>(k: K) => (val: V[K]) => {
    setV((p) => ({ ...p, [k]: val }));
    setErrors((p) => (p[k] ? { ...p, [k]: undefined } : p));
  };

  // Restore once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { v?: Partial<V>; step?: number };
        if (parsed.v) {
          setV({ ...empty, ...parsed.v, website: "" });
          setStep(Math.min(Math.max(parsed.step ?? 0, 0), STEPS.length - 1));
          setRestored(true);
        }
      }
    } catch {
      /* Storage can be unavailable or corrupt; start fresh. */
    }
    loaded.current = true;
  }, []);

  // Save on every change.
  useEffect(() => {
    if (!loaded.current || status === "sent") return;
    // Nothing entered yet: nothing to save.
    if (step === 0 && JSON.stringify({ ...v, website: "" }) === JSON.stringify(empty)) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: { ...v, website: "" }, step }));
        setSaved(true);
      } catch {
        setSaved(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [v, step, status]);

  const goTo = (n: number) => {
    setStep(n);
    setErrors({});
    setRestored(false);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const next = () => {
    const e = validate(step, v);
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (step === 0) track("kinmaster_apply_click", { step: "1-complete" });
      goTo(step + 1);
    }
  };

  const submit = async () => {
    const e = validate(3, v);
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("sending");
    const result = await submitLead("kinmaster_application", { ...v });
    if (result === "sent") {
      track("kinmaster_apply_click", { step: "submitted" });
      try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
      setStatus("sent");
    } else {
      setStatus("failed");
    }
  };

  const startOver = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setV(empty); setStep(0); setErrors({}); setRestored(false); setSaved(false); setStatus("editing");
  };

  const summary = [
    "Hello KINLEND, I would like to apply to be a KinMaster.",
    `Name: ${v.fullName}`, `Phone: ${v.phone}`, v.email && `Email: ${v.email}`, `Contact me by: ${v.contactVia}`,
    `Community: ${v.community}, ${v.state}${v.lga ? ` (${v.lga})` : ""}`,
    `I do: ${v.occupation}`, `Years in community: ${v.years}`, `Known as: ${v.standing}`, `Could vouch for: ${v.vouchFor}`,
    `Reference 1: ${v.ref1Name}, ${v.ref1Phone} (${v.ref1Relation})`,
    `Reference 2: ${v.ref2Name}, ${v.ref2Phone} (${v.ref2Relation})`,
    v.franchise && "Interested in the certified franchise track.",
    "I have read and agree to the KinMaster standards.",
  ].filter(Boolean).join("\n");

  if (status === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-neu-200 bg-white p-8 sm:p-10">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-sec-600 text-white"><Check className="h-6 w-6" strokeWidth={3} /></span>
        <h2 className="mt-6 text-3xl font-bold text-neu-900">Application received.</h2>
        <p className="mt-3 max-w-lg text-[1.0625rem] leading-relaxed text-neu-600">
          Thank you, {v.fullName.split(" ")[0] || "and welcome"}. We will confirm by {v.contactVia === "Phone call" ? "phone call" : v.contactVia} with the next steps. We may also contact your references as part of vetting.
        </p>
        <button type="button" onClick={startOver} className={buttonClasses({ variant: "secondary", size: "md", className: "mt-7" })}>
          Start another application
        </button>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-28 rounded-2xl border border-neu-200 bg-white shadow-card">
      {/* Progress */}
      <div className="border-b border-neu-200 p-6 sm:p-8">
        <ol className="flex gap-2" aria-label="Application progress">
          {STEPS.map((s, i) => (
            <li key={s} className="flex-1" aria-current={i === step ? "step" : undefined}>
              <span className={cn("block h-1.5 rounded-full transition-colors duration-300", i <= step ? "bg-sec-600" : "bg-neu-200")} />
              <span className={cn("mt-2 hidden text-xs font-semibold sm:block", i === step ? "text-sec-700" : "text-neu-500")}>{i + 1}. {s}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm font-semibold text-sec-700 sm:hidden">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>

        {restored && (
          <p role="status" className="mt-5 flex items-center justify-between gap-3 rounded-lg bg-sec-50 px-4 py-3 text-sm text-sec-900">
            <span>We found your saved application. Carry on where you left off.</span>
            <button type="button" onClick={startOver} className="inline-flex shrink-0 items-center gap-1.5 font-semibold underline underline-offset-2">
              <RotateCcw className="h-3.5 w-3.5" /> Start over
            </button>
          </p>
        )}
      </div>

      <div className="relative p-6 sm:p-8">
        <Honeypot value={v.website} onChange={set("website")} />

        {step === 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField className="sm:col-span-2" label="Full name" name="fullName" value={v.fullName} onChange={set("fullName")} autoComplete="name" error={errors.fullName} />
            <TextField label="Mobile number" name="phone" type="tel" inputMode="tel" value={v.phone} onChange={set("phone")} autoComplete="tel" placeholder="0803 123 4567" error={errors.phone} />
            <TextField label="Email (optional)" name="email" type="email" inputMode="email" value={v.email} onChange={set("email")} autoComplete="email" error={errors.email} />
            <SelectField className="sm:col-span-2" label="How should we reach you?" name="contactVia" value={v.contactVia} onChange={set("contactVia")} options={CONTACT} placeholder="Choose one" hint="We will confirm your application this way." />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField label="Market, town or community" name="community" value={v.community} onChange={set("community")} error={errors.community} />
            <SelectField label="State" name="state" value={v.state} onChange={set("state")} options={STATES} placeholder="Choose your state" error={errors.state} />
            <TextField label="Local government area (optional)" name="lga" value={v.lga} onChange={set("lga")} />
            <TextField label="What do you do?" name="occupation" value={v.occupation} onChange={set("occupation")} placeholder="For example: trader, tailor, farmer" error={errors.occupation} />
            <SelectField label="How long have you lived or worked there?" name="years" value={v.years} onChange={set("years")} options={YEARS} error={errors.years} />
            <SelectField label="How many people could you vouch for?" name="vouchFor" value={v.vouchFor} onChange={set("vouchFor")} options={VOUCH} error={errors.vouchFor} hint="People you know well enough to put your name behind." />
            <TextAreaField className="sm:col-span-2" label="How are you known in your community?" name="standing" value={v.standing} onChange={set("standing")} rows={4} placeholder="For example: chairman of the market union, leader of our esusu group, church elder" error={errors.standing} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-neu-600">Give two people who know you well and are not family. Tell them we may call. We use references only for vetting.</p>
            {(["1", "2"] as const).map((n) => (
              <fieldset key={n} className="grid gap-6 rounded-xl border border-neu-200 p-5 sm:grid-cols-3">
                <legend className="px-2 text-sm font-bold text-neu-900">Reference {n}</legend>
                <TextField label="Name" name={`ref${n}Name`} value={v[`ref${n}Name`]} onChange={set(`ref${n}Name`)} error={errors[`ref${n}Name`]} />
                <TextField label="Mobile number" name={`ref${n}Phone`} type="tel" inputMode="tel" value={v[`ref${n}Phone`]} onChange={set(`ref${n}Phone`)} error={errors[`ref${n}Phone`]} />
                <TextField label="How do you know them?" name={`ref${n}Relation`} value={v[`ref${n}Relation`]} onChange={set(`ref${n}Relation`)} placeholder="For example: fellow trader" error={errors[`ref${n}Relation`]} />
              </fieldset>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-neu-600">Please read and confirm each point. These are the standards every KinMaster keeps, and they protect honest agents. You will sign the full agreement later, if you are approved.</p>
            <CheckField name="ackVetting" checked={v.ackVetting} onChange={set("ackVetting")} error={errors.ackVetting}>
              I will meet and vet every borrower <strong>in person</strong> before I vouch for them.
            </CheckField>
            <CheckField name="ackNoCash" checked={v.ackNoCash} onChange={set("ackNoCash")} error={errors.ackNoCash}>
              I will <strong>never collect, hold or pass on repayment money</strong>. Borrowers pay KINLEND directly.
            </CheckField>
            <CheckField name="ackAccountability" checked={v.ackAccountability} onChange={set("ackAccountability")} error={errors.ackAccountability}>
              I understand KinMasters are held to a <strong>72-hour accountability standard</strong>, explained in the agreement.
            </CheckField>
            <CheckField name="ackBlacklist" checked={v.ackBlacklist} onChange={set("ackBlacklist")} error={errors.ackBlacklist}>
              I understand that misconduct can lead to <strong>blacklisting</strong>.
            </CheckField>
            <CheckField name="consent" checked={v.consent} onChange={set("consent")} error={errors.consent}>
              I agree that KINLEND may contact me and my references about this application. {siteConfig.compliance.ndpa}
            </CheckField>
            <div className="border-t border-neu-200 pt-5">
              <CheckField name="franchise" checked={v.franchise} onChange={set("franchise")}>
                Also keep me in mind for the certified franchise track when it opens (optional).
              </CheckField>
            </div>
          </div>
        )}

        {status === "failed" && (
          <div role="alert" className="mt-8 rounded-xl border border-neu-300 bg-neu-50 p-5">
            <p className="font-semibold text-neu-900">We could not send your application just now.</p>
            <p className="mt-1 text-[0.9375rem] leading-relaxed text-neu-600">Nothing is lost: your answers are saved on this device. Try again, or send the same details on WhatsApp.</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={submit} className={buttonClasses({ variant: "sec", size: "md" })}>Try again</button>
              <a href={whatsappHref(summary)} target="_blank" rel="noopener noreferrer" className={buttonClasses({ variant: "secondary", size: "md" })}>
                <MessageCircle className="h-4 w-4" /> Send on WhatsApp
              </a>
            </div>
          </div>
        )}

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-neu-200 pt-6">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            className={cn(buttonClasses({ variant: "ghost", size: "md" }), step === 0 && "invisible")}
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <p aria-live="polite" className="hidden text-xs text-neu-600 sm:block">{saved ? "Saved on this device" : ""}</p>

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={next} className={buttonClasses({ variant: "sec", size: "md" })}>
              Continue <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button type="button" onClick={submit} disabled={status === "sending"} className={buttonClasses({ variant: "sec", size: "md" })}>
              {status === "sending" ? "Sending…" : "Submit application"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
