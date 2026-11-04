"use client";

import { DemoPlayer } from "@/components/demo-player";

import { viewportReflowClass } from "@/components/scene-classes";

import { SectionAtmosphere } from "@/components/section-atmosphere";
import { CraftScrollScene } from "@/components/code-craft/craft-scroll-scene";
import { AgentOrchestration } from "@/components/code-craft/agent-orchestration";
import { AiBackground } from "@/components/code-craft/ai-background";
import { useTranslations } from "@/hooks/use-translations";

const active = [
  "group-data-[stage=0]/craft:border-accent group-data-[stage=0]/craft:text-foreground",
  "group-data-[stage=1]/craft:border-accent group-data-[stage=1]/craft:text-foreground",
  "group-data-[stage=2]/craft:border-accent group-data-[stage=2]/craft:text-foreground",
];

export function CodeCraft() {
  const t = useTranslations().codeCraft;
  return (
    <CraftScrollScene>
      <div data-craft-viewport className={`${viewportReflowClass} isolate sticky top-4 h-[calc(100svh-2rem)] max-[700px]:h-[calc(100dvh-2rem)] min-[701px]:top-5 min-[701px]:h-[calc(100svh-2.5rem)] motion-reduce:static motion-reduce:h-auto`}>
        <div className="pointer-events-none absolute inset-0 -z-1" aria-hidden="true">
          <SectionAtmosphere tone="violet" />
          <AiBackground />
        </div>
        <div className="page-shell relative isolate flex h-full flex-col gap-4 overflow-hidden [@media(max-height:600px),(max-width:359px)]:overflow-visible [@media(max-height:600px),(max-width:359px)]:h-auto rounded-3xl border border-border bg-surface px-3 pt-5 pb-6 max-[700px]:pb-5 min-[701px]:px-6 min-[701px]:pb-8 motion-reduce:h-auto motion-reduce:overflow-visible">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="craft-heading" className="text-[clamp(26px,3vw,40px)] leading-[1.05] font-bold tracking-[-0.045em]">{t.heading1}<br />{" "}<span className="text-accent">{t.heading2}</span></h2>
          <p className="max-w-[48ch] text-small leading-relaxed text-secondary">{t.intro1}<span className="font-semibold text-foreground">{t.introEmphasis}</span>{t.intro2}</p>
        </header>
        <DemoPlayer><AgentOrchestration /></DemoPlayer>
        <ol className="grid grid-cols-3 gap-3" aria-label={t.deliveryAria}>
          {t.stages.map((label, index) => <li key={label} className={`border-t-2 border-border pt-2 text-[11px] font-medium text-secondary min-[701px]:text-small ${active[index]}`}><span className="mr-2 font-mono text-accent">0{index + 1}</span>{label}</li>)}
        </ol>
        <div aria-hidden="true" className="hidden items-center gap-3 text-[11px] text-secondary min-[701px]:flex">
          <span className="shrink-0">{t.scrollToDeliver}</span>
          <div className="h-0.5 flex-1 bg-border"><div className="h-full origin-left scale-x-(--craft-progress) bg-accent motion-reduce:scale-x-100" /></div>
        </div>
        </div>
      </div>
    </CraftScrollScene>
  );
}
