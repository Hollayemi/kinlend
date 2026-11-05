import type { Tone } from "@/lib/tone";

/**
 * Landing-page copy. Keep this plain: short sentences, concrete promises, no
 * jargon on borrower-facing blocks (PRD section 12). Move to the CMS later.
 */

/** Example data used by the phone demo and the SMS receipt so they always match. */
export const demo = {
  name: "Amaka",
  loanRef: "20481",
  amount: 12500,
  balance: 37500,
  receiptRef: "KP-48213",
} as const;

export const naira = (n: number) => `₦${n.toLocaleString("en-NG")}`;

export const promises = [
  { kicker: "Community trust", title: "Your KinMaster vouches for you", body: "People who know you decide. There is no collateral list." },
  { kicker: "Direct repayment", title: "Straight to KINLEND", body: "No cash passes through an agent's hands." },
  { kicker: "Proof every time", title: "An SMS receipt, instantly", body: "Every payment is logged and confirmed to you." },
  { kicker: "Any phone", title: "Dial it. No data needed.", body: "Built for feature phones and weak signal." },
] as const;

export const steps: { n: string; title: string; body: string; tag: string; tone: Tone }[] = [
  {
    n: "1",
    title: "Get vouched",
    body: "Meet a KinMaster in your community. They know you, check you in person and stand behind you.",
    tag: "KinMaster",
    tone: "sec",
  },
  {
    n: "2",
    title: "Apply and receive",
    body: "Once KINLEND approves you, apply from your phone. The loan goes to your own vetted wallet.",
    tag: "KinPay",
    tone: "ter",
  },
  {
    n: "3",
    title: "Repay and move up",
    body: "Pay KINLEND directly and keep the SMS receipt. Repay on time and you unlock bigger loans.",
    tag: "KinScore",
    tone: "pri",
  },
];

/** Stages of the phone demo. {code} is replaced with the configured USSD code. */
export const ussdStages = [
  { title: "Dial the code", body: "Dial {code} on any phone. No app, no data, no smartphone." },
  { title: "Choose apply or repay", body: "A welcome with your name appears. Pick what you need." },
  { title: "Enter and confirm", body: "Your loan reference, the amount, then confirm. Nothing else." },
  { title: "Keep your receipt", body: "An SMS receipt arrives straight away. Your repayment went directly to KINLEND." },
] as const;

/**
 * Indicative figures from PRD section 6.1. Confirm every amount, fee and term
 * against real product pricing before publishing.
 */
export const ladder = [
  { id: "trust", name: "Trust loan", size: "Starter loan", cycle: "Set at enrolment", who: "Anyone a KinMaster has vetted in person.", how: "A KinMaster vouches for you." },
  { id: "bronze", name: "Bronze", size: "₦50,000–₦100,000", cycle: "12 weeks", who: "Borrowers who repaid the trust loan on time.", how: "Repay the trust loan on time." },
  { id: "silver", name: "Silver", size: "₦100,000–₦200,000", cycle: "12 weeks", who: "Consistent repayers with a rising KinScore.", how: "Keep repaying on time." },
  { id: "gold", name: "Gold", size: "₦200,000+", cycle: "16 weeks", who: "Proven borrowers, often cooperative members.", how: "A strong KinScore and a clean history." },
] as const;

export const kinMasterPoints = [
  { title: "Vouch for people you know", body: "You meet each borrower in person and put your name behind them." },
  { title: "Earn as you grow", body: "Bronze, Silver and Gold tiers bring higher commissions, bonuses and bigger portfolio limits." },
  { title: "Never hold repayment cash", body: "Borrowers pay KINLEND directly. Your standing stays clean." },
] as const;

/** Sample story. Replace with a consented borrower (PRD section 12). */
export const story = {
  quote: "My KinMaster has known my stall for ten years. That was my collateral.",
  name: "Borrower name",
  place: "Market, State",
  isSample: true,
};

/** {{ussd}} is replaced with the configured code at render time. */
export const faqs = [
  {
    q: "Do I need collateral?",
    a: "No. KINLEND lends against community trust instead. A KinMaster who knows you checks you in person and vouches for you. In some cases your savings group stands with you.",
  },
  {
    q: "Who do I repay, and how do I know it arrived?",
    a: "You repay KINLEND directly, through the repayment channels shown on this site. Every payment returns an SMS receipt straight away. A KinMaster never holds your repayment.",
  },
  {
    q: "Do I need a smartphone or data?",
    a: "No. Dial {{ussd}} on any phone. Choose apply or repay, enter your details, confirm, and your receipt arrives by SMS.",
  },
  {
    q: "How do I get started?",
    a: "Find a KinMaster near you. They meet you, vet you in person and put you forward. Once KINLEND approves you, you can apply and repay from your phone. If you dial before then, you will be pointed back to a KinMaster.",
  },
  {
    q: "What will it cost?",
    a: "Before you confirm any loan, you will see the fee and the full amount you will repay. Ask your KinMaster to walk you through it. If you cannot see the cost, do not accept.",
  },
  {
    q: "Is my information safe?",
    a: "We handle your data under the Nigeria Data Protection Act and ask for your consent first. This website never asks for your PIN, loan reference or BVN/NIN. If anyone asks you for those, do not share them, and tell us.",
  },
] as const;
