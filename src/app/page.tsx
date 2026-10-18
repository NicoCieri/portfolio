import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { SiteHeader } from "@/components/site-header";
import { AmbientSpotlight } from "@/components/ambient-spotlight";

export default function Home() {
  return (
    <div className="page-atmosphere relative isolate min-h-svh bg-(image:--gradient-page) font-sans text-foreground">
      <AmbientSpotlight />
      <a className="fixed top-3 left-4 z-10 -translate-y-[160%] bg-foreground px-[18px] py-3 text-background focus:translate-y-0" href="#main-content">Skip to content</a>
      <div className="relative z-1">
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <FeaturedWork />
        </main>
      </div>
    </div>
  );
}
