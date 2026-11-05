import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { siteConfig } from "@/config/site";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

// One family keeps the font budget small for 3G. It is self-hosted by next/font
// and swaps in without blocking render. "latin-ext" covers the Yorùbá
// diacritics needed when the language toggle ships.
// To try another face, change only this import and the variable name used in
// app/globals.css (--font-jakarta).
const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "KINLEND | Loans without collateral, backed by your community",
    template: "%s | KINLEND",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: siteConfig.name,
    title: "KINLEND | No collateral. Your community vouches for you.",
    description: siteConfig.description,
    // Rich WhatsApp previews. Add a 1200×630 image at /public/og.jpg.
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "KINLEND" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#1E7A44",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={sans.variable}>
      <head>
        {/* If scripts fail to load, scroll-reveal content must still be readable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-neu-900 focus:shadow-pop"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
