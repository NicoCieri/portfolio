import type { ReactNode } from "react";
import { AmbientSpotlight } from "@/components/ambient-spotlight";
import { ContactSection } from "@/components/contact/contact-section";
import { ContactShortcut } from "@/components/contact/contact-shortcut";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipToContent } from "@/components/skip-to-content";

export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative isolate min-h-svh overflow-x-clip [--header-height:141px] min-[701px]:[--header-height:149px] min-[801px]:[--header-height:93px] bg-background min-[701px]:bg-(image:--gradient-page) font-sans text-foreground">
      <AmbientSpotlight />
      <SkipToContent />
      <ContactShortcut />
      <div className="relative z-1">
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--focus-ring)">{children}<ContactSection /></main>
        <SiteFooter />
      </div>
    </div>
  );
}
