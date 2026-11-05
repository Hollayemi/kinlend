import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { siteConfig, ussdDialHref, whatsappHref } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { TrackedLink } from "@/components/ui/ButtonLink";

const columns = [
  {
    title: "Borrowers",
    links: [
      { label: "How it works", href: siteConfig.routes.howItWorks },
      { label: "Loans and the ladder", href: "/borrowers" },
      { label: "Find a KinMaster", href: siteConfig.routes.findKinMaster },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "KinMasters",
    links: [
      { label: "About KinMasters", href: siteConfig.routes.kinMasters },
      { label: "Become a KinMaster", href: siteConfig.routes.becomeKinMaster },
      { label: "KinMaster login", href: siteConfig.routes.kinMasterLogin },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: siteConfig.routes.about },
      { label: "Impact", href: siteConfig.routes.impact },
      { label: "Careers", href: siteConfig.routes.careers },
      { label: "Resources", href: siteConfig.routes.blog },
      { label: "Contact", href: siteConfig.routes.contact },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "Partners and investors", href: siteConfig.routes.partners },
      { label: "Impact investors", href: siteConfig.routes.investors },
      { label: "Partners and cooperatives", href: siteConfig.routes.cooperatives },
    ],
  },
];
const year = new Date().getFullYear();

export function Footer() {
  const { disclosures, ndpa } = siteConfig.compliance;
  return (
    <footer className="bg-neu-900 pb-28 pt-16 text-neu-300 sm:pb-12">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo keepDefault={true} />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-neu-300">
              Community trust, made into credit. Loans without collateral, approved by people who know you.
            </p>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.14em] text-neu-400">Dial on any phone</p>
              <a href={ussdDialHref()} className="mt-1 inline-block font-mono text-3xl font-semibold text-white">
                {siteConfig.ussd.code}
              </a>
            </div>
            <TrackedLink
              href={whatsappHref()}
              event="whatsapp_click"
              eventProps={{ location: "footer" }}
              className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-white underline-offset-4 hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </TrackedLink>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neu-400">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="text-[0.9375rem] text-neu-200 hover:text-white">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 space-y-3 border-t border-white/10 pt-8 text-[0.8125rem] leading-relaxed text-neu-400">
          <p>{ndpa} This website never asks for your PIN, loan reference or BVN/NIN.</p>
          {disclosures.map((d) => (
            <p key={d}>{d}</p>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <p>© {year} {siteConfig.name}. All rights reserved.</p>
            <p className="flex gap-5">
              <Link href={siteConfig.routes.privacy} className="hover:text-white">Privacy policy</Link>
              <Link href={siteConfig.routes.terms} className="hover:text-white">Terms</Link>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
