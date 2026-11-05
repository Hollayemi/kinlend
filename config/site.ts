/**
 * Single source of truth for site-wide values.
 *
 * The PRD wants the USSD short-code, channel list and loan terms to be
 * editable without a redeploy. Today they live here; when the CMS is wired in,
 * replace the exports with a fetch (ISR / on-demand revalidation) and keep the
 * same shape so no component needs to change.
 */

export type HeroSlide = MediaSlot & {
  /** Short caption shown beside the slide dots. */
  label: string;
  /** Colour of the placeholder panel while the photo is missing. */
  tone: "pri" | "sec" | "ter";
};

export type MediaSlot = {
  /** Still image. Also used as the video poster. */
  src: string;
  alt: string;
  /** Optional looping / story video (MP4 H.264). Keep hero loops under ~1.5 MB. */
  video?: string;
  videoWebm?: string;
  /** Art-direction note, shown only in development when the file is missing. */
  brief: string;
};

/**
 * Stock photography (Pexels licence: free to use, no attribution required).
 * These are placeholders for layout and tone. Before launch, replace them with
 * KINLEND's own photography of real, consenting borrowers and KinMasters: for a
 * trust-first brand, authentic faces matter more than polish (PRD section 12).
 * Remote hosts must be allowed in next.config.ts (images.remotePatterns).
 */
const px = (path: string, w = 1600) => `https://images.pexels.com/photos/${path}?auto=compress&cs=tinysrgb&w=${w}`;
const STOCK = "Stock photo (Pexels). Replace with KINLEND photography.";

export const photos = {
  kinMaster: { src: "/images/kinmaster.jpeg", alt: "A cheerful KinMaster in a traditional setting", brief: STOCK },
  marketJos: { src: px("33624055/pexels-photo-33624055/free-photo-of-vibrant-african-market-scene-in-jos-nigeria.jpeg"), alt: "A vibrant open-air market in Jos, Nigeria", brief: STOCK },
  marketPakuro: { src: px("10974435/pexels-photo-10974435.jpeg"), alt: "A market stall piled with fresh tomatoes in Pakuro, Nigeria", brief: STOCK },
  marketAbuja: { src: px("13583431/pexels-photo-13583431.jpeg"), alt: "A colourful vegetable stall and its vendor in Abuja, Nigeria", brief: STOCK },
  marketOgun: { src: px("17691084/pexels-photo-17691084/free-photo-of-market-vendor-of-tomatoes.jpeg"), alt: "A cheerful vendor selling fresh peppers at a market in Ogun State, Nigeria", brief: STOCK },
  marketPortHarcourt: { src: px("20432829/pexels-photo-20432829/free-photo-of-woman-selling-vegetables-on-a-food-market.jpeg"), alt: "A lively vegetable market in Port Harcourt, Nigeria", brief: STOCK },
  tailorWorkshop: { src: px("33078826/pexels-photo-33078826/free-photo-of-tailor-meticulously-crafting-garments-in-workshop.jpeg"), alt: "A tailor crafting garments in a workshop", brief: STOCK },
  tailorMachine: { src: px("33078827/pexels-photo-33078827/free-photo-of-tailor-working-diligently-at-sewing-machine.jpeg"), alt: "A tailor working at a sewing machine", brief: STOCK },
  farmerJos: { src: px("35175417/pexels-photo-35175417/free-photo-of-african-farmer-working-in-wheat-field-under-blue-sky.jpeg"), alt: "A farmer tending a ripe wheat field near Jos, Nigeria", brief: STOCK },
  ruralWoman: { src: px("3316340/pexels-photo-3316340.jpeg"), alt: "A smiling woman in rural Nigeria with a lush green background", brief: STOCK },
  elderWorking: { src: px("3316337/pexels-photo-3316337.jpeg"), alt: "An elderly woman working under a makeshift tent in Egbado South, Nigeria", brief: STOCK },
} satisfies Record<string, MediaSlot>;

export const siteConfig = {
  name: "KINLEND",
  description:
    "Loans without collateral for Nigerian traders, artisans and farmers. A KinMaster who knows you vouches for you. Repay on any phone and get an SMS receipt every time.",
  // TODO: confirm domain (PRD open question 2)
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinlend.com",

  ussd: {
    /** The one place the short-code is defined. Shared in the pilot, dedicated at scale. */
    code: "*746#",
    kind: "shared" as "shared" | "dedicated",
  },

  /**
   * Where the KinMaster login hands off to (the KinMaster app / portal, behind
   * single sign-on). The website never collects KinMaster credentials itself.
   * TODO: confirm the identity provider and portal URL (PRD open question 5).
   */
  portalUrl: process.env.NEXT_PUBLIC_KINMASTER_PORTAL_URL ?? "",

  /** Fallback for forms when the lead endpoint is not configured. */
  contact: { email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "" },

  whatsapp: {
    // International format, digits only. TODO: confirm the KINLEND business number.
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2340000000000",
    prefill: "Hello KINLEND, I would like to know how to get started.",
  },

  /**
   * Primary navigation.
   */
  nav: [
    { label: "How it works", href: "/how-it-works" },
    { label: "For borrowers", href: "/borrowers" },
    { label: "For KinMasters", href: "/kinmasters" },
    { label: "Impact", href: "/impact" },
    { label: "Partners & investors", href: "/partners" },
  ],

  /** Routes for pages that are not built yet. They will 404 until each page ships. */
  routes: {
    findKinMaster: "/find-a-kinmaster",
    howItWorks: "/how-it-works",
    becomeKinMaster: "/kinmasters/apply",
    kinMasters: "/kinmasters",
    kinMasterLogin: "/kinmasters/login",
    impact: "/impact",
    partners: "/partners",
    investors: "/partners/investors",
    cooperatives: "/partners/cooperatives",
    blog: "/resources",
    faq: "/faq",
    about: "/about",
    careers: "/careers",
    contact: "/contact",
    privacy: "/legal/privacy",
    terms: "/legal/terms",
  },

  /**
   * Media slots. Point `src` at any image: a remote URL (allow its host in
   * next.config.ts) or a file in /public. If an image fails to load, the page
   * shows a labelled placeholder in dev and a plain brand-colour panel in production.
   */
  media: {
    vouch: { ...photos.marketOgun },
    kinmaster: { ...photos.elderWorking },
    // Add `video: "/media/story.mp4"` here once a consented borrower video exists.
    story: { ...photos.marketAbuja },
  } as { vouch: MediaSlot; kinmaster: MediaSlot; story: MediaSlot },

  /**
   * Full-bleed photos that slide behind the hero. When you swap in your own,
   * use landscape images, at least 1920 px wide and under ~350 KB each. Keep the
   * subject in the middle or lower third: the left side sits under the headline
   * and a dark green overlay is applied on top.
   */
  heroSlides: [
    { ...photos.marketJos, label: "Market traders", tone: "pri" },
    { ...photos.tailorWorkshop, label: "Artisans", tone: "sec" },
    { ...photos.farmerJos, label: "Smallholder farmers", tone: "ter" },
    { ...photos.marketAbuja, label: "Shop and stall owners", tone: "pri" },
  ] satisfies HeroSlide[],

  /**
   * Repayment channels shown on the site. Providers roll out in phases, so
   * only mark a channel "live" once it works end to end.
   * TODO: confirm go-live channels (PRD open question 3).
   */
  channels: [
    { id: "ussd", name: "USSD short-code", note: "Works on any phone, with no data.", status: "live" },
    { id: "momo", name: "Mobile money", note: "Pay from your mobile money wallet.", status: "soon" },
    { id: "pos", name: "POS and agency banking", note: "Pay at a bank agent, straight to KINLEND.", status: "soon" },
    { id: "bank", name: "Bank transfer", note: "Send to KINLEND's account from any bank.", status: "soon" },
  ] as { id: string; name: string; note: string; status: "live" | "soon" }[],

  compliance: {
    ndpa: "We handle your data under the Nigeria Data Protection Act (NDPA) and ask for your consent first.",
    /**
     * Licensing and fee-transparency statements required on money-touching
     * pages. Compliance supplies these (PRD open question 6). Empty = not shown.
     */
    disclosures: [] as string[],
  },
};

/** `tel:` link for the USSD code. The # must be percent-encoded. */
export const ussdDialHref = (code: string = siteConfig.ussd.code) =>
  `tel:${code.replace(/#/g, "%23")}`;

export const whatsappHref = (text: string = siteConfig.whatsapp.prefill) =>
  `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(text)}`;
