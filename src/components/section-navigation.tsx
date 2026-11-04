"use client";

import { Button } from "@/components/button";
import type { CSSProperties } from "react";
import { portfolioSections } from "@/content/section-navigation";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { useTranslations } from "@/hooks/use-translations";
import { interpolate } from "@/i18n";

const rowClass = "flex h-11 items-center justify-start gap-3 rounded-full px-3";
const labelClass = "text-[12px] leading-snug font-medium";
const markerMotion = "duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

function SectionLabel({ label, index }: { label: string; index: number }) {
  return (
    <>
      <span className="shrink-0 font-mono text-[11px] font-semibold tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      <span className={labelClass}>{label}</span>
    </>
  );
}

export function SectionNavigation() {
  const { visible, activeId, pendingId, selectSection } = useSectionNavigation();
  const t = useTranslations();
  const labels = t.sectionNavigation.labels;
  const activeIndex = portfolioSections.findIndex(({ id }) => id === activeId);

  return (
    <nav
      aria-label={t.sectionNavigation.ariaLabel}
      aria-hidden={!visible}
      inert={!visible}
      data-visible={visible}
      style={{ "--nav-marker-y": `${activeIndex * 48}px` } as CSSProperties}
      className="fixed top-1/2 left-6 z-30 hidden w-52 -translate-y-1/2 p-1 transition-[opacity,visibility] duration-200 data-[visible=false]:invisible data-[visible=false]:pointer-events-none data-[visible=false]:opacity-0 min-[1800px]:block"
    >
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">{pendingId ? interpolate(t.sectionNavigation.navigatingTo, { label: labels[pendingId] }) : ""}</p>
      <div id="section-navigation-links" className="max-h-[calc(100svh-192px)] overflow-y-auto overscroll-contain [scrollbar-width:none]">
        <div className="relative isolate">
          <span aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 -z-1 h-11 translate-y-(--nav-marker-y) rounded-full bg-foreground transition-transform forced-colors:hidden ${markerMotion}`} />
          <ol className="space-y-1">
            {portfolioSections.map(({ id }, index) => {
              const label = labels[id];
              const isCurrent = activeId === id;
              return (
              <li key={id}>
                <Button variant="custom" size="custom"
                  href={`#${id}`}
                  aria-label={label}
                  aria-current={isCurrent ? "location" : undefined}
                  aria-busy={pendingId === id || undefined}
                  data-pending={pendingId === id}
                  title={label}
                  onClick={(event) => {
                    if (isCurrent) {
                      event.preventDefault();
                      return;
                    }
                    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                    selectSection(id);
                  }}
                  className={`${rowClass} relative isolate text-foreground before:pointer-events-none before:absolute before:inset-1 before:-z-1 before:rounded-full before:bg-foreground/8 before:opacity-0 before:transition-[background-color,opacity] before:duration-200 before:ease-out hover:before:opacity-100 data-[pending=true]:before:bg-accent/12 data-[pending=true]:before:opacity-100 active:before:bg-accent/25 active:before:opacity-100 data-[pending=true]:active:before:bg-accent/25 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--focus-ring) forced-colors:aria-[current=location]:outline-2 forced-colors:aria-[current=location]:-outline-offset-2`}
                >
                  <span aria-hidden="true" className="contents"><SectionLabel label={label} index={index} /></span>
                </Button>
              </li>
              );
            })}
          </ol>
          {/* A clipped copy recolors only the text physically covered by the moving pill. */}
          <ol aria-hidden="true" inert className={`pointer-events-none absolute inset-0 space-y-1 text-surface [clip-path:inset(var(--nav-marker-y)_0_calc(100%_-_var(--nav-marker-y)_-_44px)_0_round_999px)] transition-[clip-path] forced-colors:hidden ${markerMotion}`}>
            {portfolioSections.map(({ id }, index) => (
              <li key={id}><span className={rowClass}><SectionLabel label={labels[id]} index={index} /></span></li>
            ))}
          </ol>
        </div>
      </div>
    </nav>
  );
}
