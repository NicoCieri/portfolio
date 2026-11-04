"use client";

import { MobileDemoStage, mobileDemoViewportClass, mobileDemoHeaderClass } from "@/components/mobile-demo-stage";
import { viewportReflowClass } from "@/components/scene-classes";

import { EventEntrance } from "@/components/ticketing-scene/event-entrance";
import { Phone } from "@/components/ticketing-scene/phones";
import { ScrollScene } from "@/components/ticketing-scene/scroll-scene";
import { useTranslations } from "@/hooks/use-translations";

export function TicketingExperience() {
  const t = useTranslations().ticketing;
  return (
    <ScrollScene>
      <div data-scene-viewport data-mobile-demo-viewport className={`${mobileDemoViewportClass} ${viewportReflowClass} sticky top-0 isolate flex h-[calc(100svh-88px-env(safe-area-inset-bottom))] min-h-[min(620px,calc(100svh-88px-env(safe-area-inset-bottom)))] flex-col justify-between overflow-hidden before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:bg-(image:--gradient-ticketing) before:mask-[linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)] motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-0`}>
        <EventEntrance />

        <header className={`${mobileDemoHeaderClass} page-shell relative z-20 pt-8 min-[701px]:pt-10 [@media(max-height:720px)]:pt-5`}>
          <p className="text-meta font-medium min-[701px]:text-small">{t.eyebrow}</p>
          <div className="mt-3 grid grid-cols-1 gap-4 min-[1001px]:grid-cols-[1.5fr_1fr] min-[1001px]:items-end min-[1001px]:gap-12">
            <h2 className="max-w-[20ch] text-[clamp(32px,4.3vw,58px)] leading-[1.03] font-bold tracking-[-0.045em] [@media(max-height:720px)]:text-[28px]" id="ticketing-heading">{t.headingLine1}<br />{" "} <span className="text-accent">{t.headingLine2}</span></h2>
            <p className="max-w-[36ch] text-small leading-relaxed min-[701px]:text-body" id="ticketing-description">{t.description}</p>
          </div>
        </header>

        <div className="pointer-events-none absolute inset-0 isolate max-[700px]:relative max-[700px]:inset-auto max-[700px]:w-full motion-reduce:relative motion-reduce:inset-auto motion-reduce:my-6 motion-reduce:h-[360px]" aria-hidden="true">
          <MobileDemoStage height={400}>
            <Phone side="attendee" />
            <Phone side="controller" />
          </MobileDemoStage>
        </div>

        <footer className="page-shell relative z-20 pb-6 min-[701px]:pb-8 max-[700px]:pb-0 max-[700px]:[&>div]:mb-2 max-[700px]:[&>div]:gap-2 max-[700px]:[&_p]:text-[11px]">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div className="text-small font-semibold min-[701px]:text-body">
              <p className="group-data-[phase=scanning]/ticketing:hidden group-data-[validated=true]/ticketing:hidden motion-reduce:hidden">{t.statusReady}</p>
              <p className="hidden group-data-[phase=scanning]/ticketing:block motion-reduce:hidden">{t.statusScanning}</p>
              <p className="hidden group-data-[validated=true]/ticketing:block motion-reduce:block">{t.statusValidated}</p>
              <p className="mt-1 text-meta font-normal">{t.sides}</p>
            </div>
            <p className="hidden max-w-[42ch] rounded-md bg-surface/90 px-3 py-1.5 text-[12px] leading-relaxed min-[701px]:block min-[701px]:text-meta">{t.disclaimerLine1}</p>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-foreground/15" aria-hidden="true"><div className="h-full origin-left scale-x-[var(--scene-scroll,0)] rounded-full bg-foreground motion-reduce:scale-x-100" /></div>
        </footer>
      </div>
      <p data-validation-announcement role="status" aria-live="polite" aria-atomic="true" className="sr-only">{t.announcement}</p>
      <noscript><p className="px-5 py-4 text-small">{t.noscript}</p></noscript>
    </ScrollScene>
  );
}
