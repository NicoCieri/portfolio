import type { ReactNode } from "react";
import { AmbientSpotlight } from "@/components/ambient-spotlight";
import { SiteHeader } from "@/components/site-header";

export function PortfolioShell({ children, experiencePage = false }: { children: ReactNode; experiencePage?: boolean }) {
  return (
    <div className="page-atmosphere relative isolate min-h-svh bg-(image:--gradient-page) font-sans text-foreground">
      <AmbientSpotlight />
      <a className="fixed top-3 left-4 z-10 -translate-y-[160%] bg-foreground px-[18px] py-3 text-background focus:translate-y-0" href="#main-content">Skip to content</a>
      <div className="relative z-1">
        <SiteHeader experiencePage={experiencePage} />
        <main id="main-content" tabIndex={-1}>{children}</main>
      </div>
    </div>
  );
}
