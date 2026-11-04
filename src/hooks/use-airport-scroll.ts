"use client";

import { useCallback } from "react";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { useTranslations } from "@/hooks/use-translations";
import { SCENE_ENTRY_SCREENS, sceneScreenHeight, scrollSceneRange } from "@/lib/scroll-scene";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const pointerStops = [
  [0, "pnr"], [0.065, "pnr"], [0.095, "search"], [0.23, "search"],
  [0.275, "passenger"], [0.32, "passenger"], [0.35, "seat-tab"],
  [0.41, "seat"], [0.49, "seat"], [0.56, "bags-tab"],
  [0.63, "weight"], [0.74, "weight"], [0.8, "confirm"], [1, "confirm"],
] as const;

export function useAirportScroll() {
  const { phases, searchAnnouncements } = useTranslations().airport;
  return useScrollScene("[data-airport-viewport]", useCallback(({ root, viewport }) => {
    const panels = Array.from(root.querySelectorAll<HTMLElement>("[data-airport-panel]"));
    const announcement = root.querySelector<HTMLElement>("[data-airport-announcement]");
    const pnr = root.querySelector<HTMLElement>("[data-airport-pnr]");
    const results = root.querySelector<HTMLElement>("[data-airport-search-results]");
    const screen = root.querySelector<HTMLElement>("[data-airport-screen]");
    const targets = new Map(Array.from(root.querySelectorAll<HTMLElement>("[data-airport-target]")).map(element => [element.dataset.airportTarget, element]));
    let previous = "";
    return {
      update(reducedMotion, playbackProgress) {
        const screenHeight = sceneScreenHeight(viewport);
        const entryLead = screenHeight * SCENE_ENTRY_SCREENS;
        const distance = scrollSceneRange(root.offsetHeight, viewport.offsetHeight, screenHeight, entryLead);
        const progress = reducedMotion ? 1 : playbackProgress ?? clamp((entryLead - root.getBoundingClientRect().top) / distance);
        const phase = progress < 0.34 ? 0 : progress < 0.57 ? 1 : progress < 0.84 ? 2 : 3;
        const searchState = progress < 0.035 ? "idle" : progress < 0.105 ? "typing" : progress < 0.23 ? "loading" : "ready";
        root.dataset.searchState = searchState;
        root.dataset.reservationReady = String(searchState === "ready");
        if (pnr) pnr.textContent = "XK7R2P".slice(0, Math.floor(clamp((progress - 0.035) / 0.055) * 6));
        results?.setAttribute("aria-busy", String(searchState === "loading"));
        root.style.setProperty("--airport-progress", String(progress));
        root.style.setProperty("--airport-seat", String(reducedMotion ? 1 : clamp((progress - 0.455) / 0.035)));
        root.style.setProperty("--airport-bag", String(reducedMotion ? 1 : clamp((progress - 0.64) / 0.06)));
        root.style.setProperty("--airport-ticket", String(reducedMotion ? 1 : clamp((progress - 0.84) / 0.05)));
        root.dataset.seatAssigned = String(reducedMotion || progress >= 0.49);
        root.dataset.bagAccepted = String(reducedMotion || progress >= 0.7);
        root.style.setProperty("--airport-pointer-opacity", String(reducedMotion ? 0 : 1 - clamp((progress - 0.84) / 0.04)));
        root.style.setProperty("--airport-pointer-scale", [0.1, 0.315, 0.455, 0.815].some(time => progress >= time && progress < time + 0.012) ? "0.8" : "1");
        if (screen && !reducedMotion) {
          const next = Math.max(1, pointerStops.findIndex(([time]) => time >= progress));
          const [startTime, startTarget] = pointerStops[next - 1];
          const [endTime, endTarget] = pointerStops[next];
          const start = targets.get(startTarget)?.getBoundingClientRect();
          const end = targets.get(endTarget)?.getBoundingClientRect();
          if (start && end) {
            // Measure inside the scaled illustration so cursor and touch remain aligned.
            const bounds = screen.getBoundingClientRect();
            const scale = bounds.width / screen.offsetWidth;
            const fraction = clamp((progress - startTime) / (endTime - startTime));
            const eased = fraction * fraction * (3 - 2 * fraction);
            const x = start.left + start.width / 2 + (end.left + end.width / 2 - start.left - start.width / 2) * eased;
            const y = start.top + start.height / 2 + (end.top + end.height / 2 - start.top - start.height / 2) * eased;
            root.style.setProperty("--airport-pointer-x", `${(x - bounds.left) / scale}px`);
            root.style.setProperty("--airport-pointer-y", `${(y - bounds.top) / scale}px`);
          }
        }
        const state = `${phase}:${searchState}`;
        if (state === previous) return;
        previous = state;
        root.dataset.phase = String(phase);
        for (const [index, panel] of panels.entries()) {
          panel.setAttribute("aria-hidden", String(index !== phase));
          panel.inert = index !== phase;
        }
        if (announcement) announcement.textContent = phase === 0 ? searchAnnouncements[searchState] : phases[phase];
      },
    };
  }, [phases, searchAnnouncements]));
}
