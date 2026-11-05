import type { Tone } from "@/lib/tone";

/**
 * Copy for the inner pages. Plain words, short sentences. Anything that states
 * a policy, fee or timeline we have not been given is left out on purpose:
 * add it here once the business confirms it.
 */

export type Actor = "You" | "KinMaster" | "KINLEND";
export const actorTone: Record<Actor, Tone> = { You: "pri", KinMaster: "sec", KINLEND: "ter" };

/* ───────────── How it works ───────────── */

export const journey: { n: string; title: string; body: string; actors: { who: Actor; what: string }[]; visual: "vouch" | "apply" | "receive" | "repay" | "receipt" | "ladder" }[] = [
  {
    n: "01",
    title: "Get vouched",
    body: "A KinMaster from your own community meets you where you work. They check that you are who you say you are, that your business is real, and that people trust you. If they are satisfied, they put their name behind you.",
    actors: [
      { who: "You", what: "Meet your KinMaster and answer their questions." },
      { who: "KinMaster", what: "Vets you in person and vouches for you." },
      { who: "KINLEND", what: "Reviews the vetting and approves you." },
    ],
    visual: "vouch",
  },
  {
    n: "02",
    title: "Apply from your phone",
    body: "Once you are approved, dial the code and choose “Apply for a loan”. It works on any phone, with no data and no app. If you are not approved yet, the menu sends you back to a KinMaster.",
    actors: [
      { who: "You", what: "Dial the code and choose apply." },
      { who: "KINLEND", what: "Checks you are approved before anything moves." },
    ],
    visual: "apply",
  },
  {
    n: "03",
    title: "Receive your loan",
    body: "Your loan is sent to your own vetted wallet through KinPay. Every movement of money is logged with a time stamp and confirmed to you by SMS.",
    actors: [
      { who: "KINLEND", what: "Sends the loan to your wallet." },
      { who: "You", what: "Receive an SMS confirming it." },
    ],
    visual: "receive",
  },
  {
    n: "04",
    title: "Repay, straight to KINLEND",
    body: "Dial the code, choose “Repay a loan”, enter your loan reference and the amount, then confirm. The money goes directly to KINLEND, never through an agent.",
    actors: [
      { who: "You", what: "Repay by USSD, or by another channel as it opens." },
      { who: "KinMaster", what: "Never touches your repayment." },
    ],
    visual: "repay",
  },
  {
    n: "05",
    title: "Keep your receipt",
    body: "An SMS receipt arrives straight away. It shows what was received, what you still owe, and a reference you can quote. It is your proof.",
    actors: [
      { who: "KINLEND", what: "Sends a receipt for every payment." },
      { who: "You", what: "Keep the SMS." },
    ],
    visual: "receipt",
  },
  {
    n: "06",
    title: "Move up the ladder",
    body: "Repay on time and your KinScore grows. A stronger KinScore unlocks larger loans and better terms, from Bronze to Silver to Gold.",
    actors: [
      { who: "You", what: "Repay on time, every time." },
      { who: "KINLEND", what: "Builds your KinScore and raises your limit." },
    ],
    visual: "ladder",
  },
];

export const roles: { who: Actor; tag: string; items: string[] }[] = [
  {
    who: "You",
    tag: "The borrower",
    items: ["Tell your KinMaster the truth about your business.", "Repay on time, straight to KINLEND.", "Keep every SMS receipt.", "Never share your PIN with anyone."],
  },
  {
    who: "KinMaster",
    tag: "Your community vouch",
    items: ["Meets you and vets you in person.", "Vouches for you to KINLEND.", "Stays close to the community and flags problems early.", "Never handles repayment money."],
  },
  {
    who: "KINLEND",
    tag: "The lender",
    items: ["Approves borrowers after the KinMaster vets them.", "Sends your loan to your own wallet.", "Takes every repayment directly.", "Sends an SMS receipt and builds your KinScore."],
  },
];

/* ───────────── For borrowers ───────────── */

export const lendTo = [
  { title: "Market traders", body: "Restock before the busy days instead of turning customers away.", photo: "marketOgun" },
  { title: "Artisans", body: "Buy materials and equipment, and take on bigger orders.", photo: "tailorWorkshop" },
  { title: "Smallholder farmers", body: "Cover seed, tools and labour before the harvest pays.", photo: "farmerJos" },
] as const;

export const beforeYouConfirm = [
  "The amount you will receive",
  "The fee for the loan",
  "The full amount you will repay",
  "How many weeks the loan runs",
  "When each repayment is due",
];

export const eligibility = [
  "You run or work in a small business, a farm or a cooperative.",
  "A KinMaster in your community knows you and is willing to vouch for you.",
  "A KinMaster has met you in person and vetted you.",
  "KINLEND has reviewed and approved you.",
  "You have a phone. Any phone. A smartphone is not needed.",
];

export const scoreActions = [
  { title: "Repay on time", body: "Every on-time payment strengthens your KinScore." },
  { title: "Refer people you trust", body: "Bring in good borrowers. A strong community lifts everyone." },
  { title: "Keep a clean history", body: "Steady, honest repayment is what unlocks the next rung." },
];

/* ───────────── Find a KinMaster ───────────── */

export const getSteps = [
  { n: "1", title: "Ask in your community", body: "KinMasters are trusted people who live and work where you do: in your market, town union or savings group. Ask your group leader, or message us and we will help you reach one." },
  { n: "2", title: "Meet in person", body: "Your KinMaster meets you at your shop, stall or farm. Be ready to talk about your business and the people who know you." },
  { n: "3", title: "Get vetted and vouched", body: "They check you in person, then vouch for you to KINLEND. Their name is on it, so they take it seriously." },
  { n: "4", title: "Get approved and start", body: "KINLEND reviews and approves you. After that you can apply and repay with the USSD code on any phone." },
];

export const kinMasterWill = [
  "Meet you in person, where you work.",
  "Ask about your business and who knows you.",
  "Explain how the loan, the fee and repayment work.",
  "Vouch for you to KINLEND if they are satisfied.",
];

export const kinMasterWontEver = [
  "Take or hold your repayment money. You pay KINLEND directly.",
  "Ask for your PIN.",
  "Promise you a loan. Approval is KINLEND's decision.",
];

/* ───────────── Impact ───────────── */

export const communityTrust = {
  eyebrow: "Why it works",
  title: "Ajo and esusu already prove it.",
  body: [
    "Rotating savings groups work because everyone knows everyone. Nobody needs collateral to join an ajo. Your standing in the group is the guarantee.",
    "KINLEND turns that same discipline into credit. A KinMaster stands in for the group, borrowers repay on a schedule, and every payment is recorded.",
  ],
  points: ["Women's cooperatives and savings groups at the centre", "Trust you can see: receipts, records, and a KinScore that grows", "A ladder that rewards the people who repay"],
};

/** Reported figures. Leave empty until each number is verified and sourced. */
export type Metric = { label: string; value: string; note?: string; source: string; asOf: string };
export const impactMetrics: Metric[] = [];

export const metricsPlanned = [
  "Borrowers reached",
  "Share of borrowers who are women",
  "On-time repayment rate",
  "Active KinMasters",
  "Communities served",
  "Loans graduated up the ladder",
];

export const safeguards = [
  { n: "01", title: "Repayment goes direct", body: "Borrowers pay KINLEND, not an agent. Cash never passes through a KinMaster's hands." },
  { n: "02", title: "Only vetted borrowers transact", body: "A KinMaster meets every borrower in person and KINLEND approves them before anything can move. Access is gated on purpose." },
  { n: "03", title: "A receipt for every payment", body: "Each payment and each loan payout is logged with a time stamp and confirmed to the borrower by SMS." },
  { n: "04", title: "Every community reconciled", body: "KINLEND compares what each community should have paid with what actually arrived, and flags any gap." },
  { n: "05", title: "Early warnings, clear escalation", body: "Risk signals show up early. A problem moves along a set path: reminder, then notice, then suspension." },
  { n: "06", title: "A full audit trail", body: "Actions are time-stamped and recorded, so any question can be traced to what happened and when." },
  { n: "07", title: "Accountable KinMasters", body: "KinMasters sign an agreement, keep a 72-hour accountability standard, and face blacklisting for misconduct. That protects the honest majority." },
];

/* ───────────── KinMasters ───────────── */

export const kmDuties = [
  { title: "Know your people", body: "You already know who in your market keeps their word. Your standing is the asset." },
  { title: "Vet in person", body: "You meet each borrower where they work, check their business is real, and decide whether to vouch." },
  { title: "Stay close", body: "You stay in touch with the borrowers you vouched for and raise problems early." },
];

export const kmTiers = [
  { name: "Bronze", dot: "bg-tier-bronze", body: "Where every KinMaster starts. Vouch for your first borrowers and earn a commission on the loans you stand behind." },
  { name: "Silver", dot: "bg-tier-silver", body: "Reached through reliable results. A higher commission, performance bonuses and a larger portfolio limit." },
  { name: "Gold", dot: "bg-acc-500", body: "For consistently trusted KinMasters. The top commission tier and the largest portfolio limits." },
];

export const kmFranchise = [
  "Structured training before you start",
  "A signed agreement with clear liability terms",
  "A refundable security bond",
];

export const kmStandards = [
  { title: "Vet in person", body: "Every borrower is met in person before you vouch for them. No exceptions." },
  { title: "Never touch repayment money", body: "Borrowers pay KINLEND directly. You never collect, hold or pass on repayments." },
  { title: "Keep the 72-hour accountability standard", body: "Set out in full in your agreement. It is how we keep every community accountable." },
  { title: "Accept the blacklist consequence", body: "Misconduct leads to blacklisting. It protects every honest KinMaster." },
];

export const kmProcess = [
  { n: "1", title: "Apply online", body: "Four short steps. Save and come back any time on the same device." },
  { n: "2", title: "We confirm", body: "You get a message on WhatsApp or SMS confirming we have your application, with next steps." },
  { n: "3", title: "KINLEND vets you", body: "We review your application and speak to your references." },
  { n: "4", title: "Sign and start", body: "If you are approved, you sign the KinMaster agreement and begin vouching for borrowers." },
];

export const kmFaqs = [
  { q: "Do I ever handle repayment money?", a: "No. Borrowers pay KINLEND directly and get an SMS receipt. A KinMaster vets and vouches, and never collects, holds or passes on repayments." },
  { q: "Who can apply?", a: "People with real standing in their community: a market union leader, a savings group chair, a respected elder or trader. You need two references who are not family." },
  { q: "How do I earn?", a: "Through tiered commissions on the loans you vouch for, plus bonuses and larger portfolio limits as you move from Bronze to Silver to Gold. Exact rates are set out in your agreement." },
  { q: "What is expected of me?", a: "You vet borrowers in person, keep the 72-hour accountability standard set out in your agreement, and never touch repayment money. Misconduct can lead to blacklisting." },
  { q: "Is there a fee to become a KinMaster?", a: "Applying is free. The certified franchise track, when it opens, involves a refundable security bond. It is explained in full before you commit." },
  { q: "How long does approval take?", a: "We confirm your application by message first. Timelines depend on vetting, and we will tell you what to expect at each step." },
];

/* ───────────── Partners & investors ───────────── */

export const thesis = [
  { tone: "pri" as Tone, title: "Community trust, used as collateral", body: "Social capital is the security. KinMasters vet and vouch, and group guarantees stand behind members. It is the ajo and esusu discipline, formalised." },
  { tone: "ter" as Tone, title: "Repayment rails that cannot leak", body: "USSD-first and built for any phone. Money moves directly to KINLEND and every movement is time-stamped, receipted and reconciled." },
  { tone: "sec" as Tone, title: "A data asset that compounds", body: "Every repayment builds a behavioural credit profile for borrowers and KinMasters: KinScore, a trust signal where credit files are thin." },
];

export const modelAtAGlance = [
  { k: "Who vouches", v: "A locally embedded KinMaster, vetting in person" },
  { k: "Who is repaid", v: "KINLEND, directly. Never an agent" },
  { k: "What is recorded", v: "Every payment, with a time stamp and an SMS receipt" },
  { k: "What compounds", v: "KinScore, and a ladder from Bronze to Silver to Gold" },
];

export const socialReturn = [
  { title: "Access without collateral", body: "Credit for people the formal system has left out, on terms they can see." },
  { title: "Dignity and standing", body: "A loan that treats the borrower's reputation as an asset, not a risk." },
  { title: "A way up", body: "A ladder that rewards on-time repayment with larger loans and better terms." },
  { title: "Local livelihoods", body: "KinMasters earn from the trust they already hold in their communities." },
];

export const direction = [
  { when: "Now", title: "Direct repayment rails", body: "USSD and KinPay: the repayment and payout rails that carry the core trust promise." },
  { when: "Next", title: "The KinMaster network", body: "A KinMaster app, operations controls for reconciliation and risk, and a conversational assistant on WhatsApp." },
  { when: "Then", title: "Intelligence and scale", body: "KinScore as a licensable data product, a certified franchise track, an open API and development-finance partnerships." },
];

export const investorInterests = ["Equity or impact investment", "Debt or a lending facility", "Grant or foundation funding", "Development finance partnership", "Something else"];

export const partnerTypes = [
  { title: "Savings groups and cooperatives", body: "Women's groups, ajo and esusu circles, farmers' cooperatives." },
  { title: "Churches, unions and associations", body: "Town unions, market associations and faith communities that already hold trust." },
  { title: "Microfinance institutions", body: "MFIs that need reliable signals on underserved borrowers." },
  { title: "Fintechs and insurers", body: "Teams building for people with thin or no credit files." },
];

export const partnerOffer = [
  { tone: "pri" as Tone, who: "For communities", title: "Bring your whole group on", points: ["Members are vetted in person by a KinMaster", "Everyone starts on a trust loan and climbs the ladder", "Repay on any phone, with a receipt every time"] },
  { tone: "ter" as Tone, who: "For MFIs and fintechs", title: "KinScore, as a data product", points: ["A behavioural trust score for thin-file borrowers", "Built from repayment history, referrals and community repayment", "Sandbox access on request. No live scores are shared without a contract"] },
  { tone: "sec" as Tone, who: "For platforms", title: "An open API, over time", points: ["Embed KINLEND's trust and repayment layer", "Controlled, contract-based access", "Built so the apps plug in without rework"] },
];

export const onboarding = [
  { n: "1", title: "Talk to us", body: "Tell us about your group or product. We will explain how KINLEND fits." },
  { n: "2", title: "Choose a pilot", body: "We agree a first group or use case, with clear expectations on both sides." },
  { n: "3", title: "Vet and enrol", body: "KinMasters meet and vet members in person. KINLEND approves them." },
  { n: "4", title: "Lend, repay, grow", body: "Members borrow, repay directly with receipts, and move up the ladder." },
];

export const partnerInterests = ["Onboard our community or group", "KinScore data product (sandbox)", "Open API and integration", "Distribution or other partnership"];
