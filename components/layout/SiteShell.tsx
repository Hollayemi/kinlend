import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyApply } from "./StickyApply";

/** Header, footer and the mobile Apply / Repay bar around every page. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyApply />
    </>
  );
}
