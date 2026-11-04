"use client";

import { viewportReflowClass } from "@/components/scene-classes";

import { SectionAtmosphere } from "@/components/section-atmosphere";
import { EditorMonitor } from "@/components/stadium-editor-scene/editor-monitor";
import { EditorScrollScene } from "@/components/stadium-editor-scene/editor-scroll-scene";
import { DesignBackground } from "@/components/stadium-editor-scene/design-background";
import { useTranslations } from "@/hooks/use-translations";

const stepMeta = [
  { id: "create", number: "01" },
  { id: "edit", number: "02" },
  { id: "explore", number: "03" },
];

export function StadiumEditorExperience() {
  const t = useTranslations().stadiumEditor;
  const steps = stepMeta.map((meta, index) => ({ ...meta, ...t.steps[index] }));
  return (
    <EditorScrollScene>
      <div data-editor-viewport className={`${viewportReflowClass} isolate sticky top-0 flex h-[calc(100svh-88px-env(safe-area-inset-bottom))] min-h-[min(740px,calc(100svh-88px-env(safe-area-inset-bottom)))] flex-col justify-center gap-5 py-5 min-[701px]:gap-4 min-[701px]:py-4 [@media(max-height:820px)]:gap-3 [@media(max-height:820px)]:py-3 motion-reduce:static motion-reduce:h-auto`}>
        <SectionAtmosphere tone="pink" />
        <DesignBackground />
        <header className="page-shell mb-3 min-[701px]:mb-6 min-[1101px]:mb-8 [@media(max-height:820px)]:mb-0">
          <p className="text-meta font-medium text-secondary">{t.eyebrow}</p>
          <div className="mt-3 grid gap-4 min-[901px]:grid-cols-[1.15fr_1fr] min-[901px]:items-start min-[901px]:gap-16">
            <h2 aria-label={`${t.headingLine1} ${t.headingAccent}`} id="editor-heading" className="max-w-[22ch] text-[clamp(32px,3.8vw,48px)] leading-[1.05] [@media(max-height:820px)]:text-[28px] max-[700px]:[@media(max-height:820px)]:text-[24px] font-bold tracking-[-0.045em]">{t.headingLine1}<br className="hidden min-[701px]:block" /> <span className="text-accent">{t.headingAccent}</span></h2>
            <p id="editor-description" className="max-w-[40ch] text-body leading-[1.65] text-secondary min-[701px]:text-lead min-[901px]:pt-1 [@media(max-height:820px)]:text-[14px] [@media(max-height:820px)]:leading-[1.5] max-[700px]:[@media(max-height:820px)]:text-[13px]">{t.description}</p>
          </div>
        </header>
        <figure className="page-shell max-[700px]:max-w-[320px] max-[700px]:[@media(max-height:820px)]:max-w-[280px] min-[701px]:max-[900px]:max-w-[min(560px,calc((100svh-480px)*1.05))] min-[901px]:max-w-[min(1000px,calc((100svh-488px)*1.55))] min-[701px]:[@media(max-height:820px)]:max-w-[min(760px,calc((100svh-340px)*1.55))]">
          <EditorMonitor />
          <figcaption className="mt-3 text-center text-[12px] text-secondary">{t.caption}</figcaption>
        </figure>
        <ol className="page-shell grid grid-cols-3 gap-3 min-[701px]:gap-8" aria-label={t.stepsAria}>
          {steps.map(({ id, number, title, copy }) => (
            <li key={id} className={`border-t-2 border-foreground/10 pt-3 ${id === "create" ? "group-data-[step=create]/editor:border-accent" : id === "edit" ? "group-data-[step=edit]/editor:border-accent" : "group-data-[step=explore]/editor:border-accent"}`}>
              <p className="text-[13px] leading-snug font-semibold min-[701px]:text-body"><span className="mb-1 block font-mono text-[11px] text-accent min-[701px]:mr-3 min-[701px]:inline">{number}</span>{title}</p>
              <p className="mt-1 hidden text-small text-secondary min-[701px]:block [@media(max-height:820px)]:hidden">{copy}</p>
            </li>
          ))}
        </ol>
      </div>
      <p data-editor-announcement role="status" aria-live="polite" aria-atomic="true" className="sr-only">{t.announcement}</p>
      <noscript><p className="page-shell py-5 text-small">{t.noscript}</p></noscript>
    </EditorScrollScene>
  );
}
