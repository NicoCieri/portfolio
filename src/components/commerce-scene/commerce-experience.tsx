"use client";

import { viewportReflowClass } from "@/components/scene-classes";

import { SectionAtmosphere } from "@/components/section-atmosphere";
import { CommerceScrollScene } from "@/components/commerce-scene/commerce-scroll-scene";
import { ShoppingIllustration } from "@/components/commerce-scene/shopping-illustration";
import { CommerceBackground } from "@/components/commerce-scene/commerce-background";
import { useTranslations } from "@/hooks/use-translations";

const stepMeta = [
  { number: "01", active: "group-data-[phase=discover]/commerce:border-accent group-data-[phase=variant]/commerce:border-accent" },
  { number: "02", active: "group-data-[phase=adding]/commerce:border-accent group-data-[phase=bag]/commerce:border-accent" },
  { number: "03", active: "group-data-[phase=loading]/commerce:border-accent group-data-[phase=checkout]/commerce:border-accent group-data-[phase=confirming]/commerce:border-accent group-data-[phase=complete]/commerce:border-accent" },
];

export function CommerceExperience() {
  const t = useTranslations().commerce;
  const steps = stepMeta.map((meta, index) => ({ ...meta, ...t.steps[index] }));
  return (
    <>
      <CommerceScrollScene>
        <div data-commerce-viewport className={`${viewportReflowClass} isolate sticky top-0 flex h-[calc(100svh-88px-env(safe-area-inset-bottom))] min-h-[min(640px,calc(100svh-88px-env(safe-area-inset-bottom)))] flex-col justify-center gap-4 py-4 min-[701px]:gap-5 motion-reduce:static motion-reduce:h-auto motion-reduce:min-h-0`}>
        <SectionAtmosphere tone="pink" />
        <CommerceBackground />
          <header className="page-shell">
            <p className="text-meta font-medium text-secondary">{t.eyebrow}</p>
            <div className="mt-3 grid gap-3 min-[901px]:grid-cols-[1.15fr_1fr] min-[901px]:gap-16">
              <h2 aria-label={`${t.headingLine1} ${t.headingAccent}`} id="commerce-heading" className="max-w-[22ch] text-[clamp(30px,3.8vw,48px)] leading-[1.05] font-bold tracking-[-0.045em]">{t.headingLine1}<br className="hidden min-[701px]:block" /> <span className="text-accent">{t.headingAccent}</span></h2>
              <p className="max-w-[46ch] text-[12px] leading-relaxed text-secondary min-[701px]:text-body">{t.description}</p>
            </div>
          </header>
          <figure className="page-shell min-[701px]:max-w-[min(1080px,calc((100svh-398px)*1.75))]">
            <ShoppingIllustration />
            <figcaption className="mt-4 text-center text-[11px] text-secondary min-[701px]:text-meta">{t.caption}</figcaption>
          </figure>
          <ol className="page-shell grid grid-cols-3 gap-3 min-[701px]:gap-8" aria-label={t.stepsAria}>
            {steps.map(({ number, title, copy, active }) => <li key={number} className={`border-t-2 border-foreground/10 pt-3 ${active}`}><p className="text-[12px] leading-snug font-semibold min-[701px]:text-small"><span className="mb-1 block font-mono text-[11px] text-accent min-[701px]:mr-3 min-[701px]:inline">{number}</span>{title}</p><p className="mt-1 hidden text-small text-secondary min-[901px]:block">{copy}</p></li>)}
          </ol>
          <div aria-hidden="true" className="page-shell h-1 overflow-hidden rounded-full bg-foreground/10"><div className="h-full origin-left scale-x-(--commerce-progress) rounded-full bg-accent motion-reduce:scale-x-100" /></div>
        </div>
        <p data-commerce-announcement role="status" aria-live="polite" aria-atomic="true" className="sr-only">{t.announcement}</p>
        <noscript><p className="page-shell py-4 text-small">{t.noscript}</p></noscript>
      </CommerceScrollScene>
    </>
  );
}
