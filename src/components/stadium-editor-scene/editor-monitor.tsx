"use client";

import { DeviceMonitor } from "@/components/devices/device-monitor";
import { StadiumMap } from "@/components/stadium-editor-scene/stadium-map";
import { useTranslations } from "@/hooks/use-translations";

export function EditorMonitor() {
  const t = useTranslations().stadiumEditor.ui;
  return (
    <DeviceMonitor screenClassName="max-[700px]:aspect-[1/1]" className="mx-auto w-full max-w-[1100px] [@media(max-height:820px)]:[&>div[aria-hidden]]:hidden" aria-hidden="true">
      <div className="flex h-11 [@media(max-height:820px)]:h-8 shrink-0 items-center justify-between gap-3 border-b border-(--device-border) bg-(--device-panel) px-3 min-[701px]:px-5">
        <div className="flex items-center gap-3"><span className="flex size-6 items-center justify-center rounded-md bg-(--pop-blue) text-[13px] font-bold text-white">a.</span><span className="text-[13px] font-semibold">Orbit Park <span className="ml-2 hidden font-normal text-(--device-muted) min-[701px]:inline">/ {t.mapEditor}</span></span></div>
        <span className="rounded-full bg-(--device-accent)/8 px-2.5 py-1 font-mono text-[11px] text-(--device-accent)">SVG</span>
      </div>
      <div className="flex h-9 [@media(max-height:820px)]:h-7 shrink-0 items-center justify-between gap-2 border-b border-(--device-border) bg-(--device-panel) px-3 text-[12px] min-[701px]:px-5">
        <div className="flex items-center gap-4"><span className="rounded px-2 py-1 font-semibold group-data-[action=edit]/editor:bg-(--device-selection) group-data-[action=edit]/editor:text-(--device-selection-text) group-data-[action=move]/editor:bg-(--device-selection) group-data-[action=move]/editor:text-(--device-selection-text)">{t.toolSelect}</span><span className="rounded px-2 py-1 group-data-[action=create]/editor:bg-(--device-selection) group-data-[action=create]/editor:text-(--device-selection-text)">{t.toolShape}</span><span className="rounded px-2 py-1 group-data-[action=pan]/editor:bg-(--device-selection) group-data-[action=pan]/editor:text-(--device-selection-text)">{t.toolPan}</span></div>
        <span className="hidden whitespace-nowrap font-mono text-[11px] text-(--device-muted) min-[701px]:inline"><span className="group-data-[action=saved]/editor:hidden">{t.unsaved}</span><span className="hidden text-[#22a06b] group-data-[action=saved]/editor:inline">{t.saved}</span></span>
      </div>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[136px] shrink-0 border-r border-(--device-border) bg-(--device-panel) px-3 py-5 min-[901px]:block [@media(max-height:820px)]:hidden">
          <p className="mb-4 text-[12px] font-semibold">{t.layers}</p>
          <div className="space-y-1 text-[12px]">
            <p className="rounded-md px-2 py-2">{t.pitch}</p>
            <p className="rounded-md px-2 py-2">{t.northStand}</p>
            <p className="rounded-md bg-(--device-selection) px-2 py-2 font-semibold text-(--device-selection-text) opacity-[var(--editor-created,0)]">{t.sectionN03}</p>
            <p className="rounded-md px-2 py-2">{t.eastStand}</p>
            <p className="rounded-md px-2 py-2">{t.southStand}</p>
            <p className="rounded-md px-2 py-2">{t.westStand}</p>
          </div>
        </aside>
        <div className="min-w-0 flex-1"><StadiumMap /></div>
        <aside className="hidden w-[136px] shrink-0 border-l border-(--device-border) bg-(--device-panel) px-4 py-5 opacity-[var(--editor-created,0)] min-[1101px]:block [@media(max-height:980px)]:hidden">
          <p className="text-[12px] font-semibold">{t.sectionN03}</p>
          <p className="mt-1 text-[11px] text-(--device-muted)">{t.vectorShape}</p>
          <p className="mt-6 text-[11px] font-medium text-(--device-muted)">{t.position}</p>
          <p className="mt-2 font-mono text-[12px]">X 121 → 211</p>
          <p className="mt-2 font-mono text-[12px]">Y 187 → 107</p>
          <p className="mt-6 text-[11px] font-medium text-(--device-muted)">{t.appearance}</p>
          <div className="mt-3 flex items-center gap-2 text-[12px]"><span className="relative size-4 overflow-hidden rounded bg-(--pop-pink)"></span>{t.sectionFill}</div>
          <p className="mt-6 text-[11px] leading-relaxed text-(--device-muted)">{t.oneSection}<br />{t.independentGeometry}</p>
        </aside>
      </div>
      <div className="flex h-7 [@media(max-height:820px)]:h-5 shrink-0 items-center justify-between border-t border-(--device-border) bg-(--device-panel) px-3 font-mono text-[10px] text-(--device-muted) min-[701px]:px-5"><span>{t.venueFooter}</span><span><span className="relative"><span className="opacity-[calc(1_-_var(--editor-created,0))]">{t.initialSectionsCount}</span><span className="absolute right-0 whitespace-nowrap opacity-[var(--editor-created,0)]">{t.sectionsCount}</span></span></span></div>
    </DeviceMonitor>
  );
}
