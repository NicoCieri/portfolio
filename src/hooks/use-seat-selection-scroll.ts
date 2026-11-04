"use client";

import { sceneScreenHeight, scrollSceneRange } from "@/lib/scroll-scene";
import { useCallback } from "react";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { useTranslations } from "@/hooks/use-translations";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

// Pause at each section so availability and the different layouts can be read.
const stops = [
  [0, 550, 340], [0.06, 698, 386], [0.15, 698, 386],
  [0.20, 216, 212], [0.23, 216, 212],
  [0.29, 400, 240], [0.35, 400, 240],
  [0.39, 180, 72], [0.42, 180, 72],
  [0.47, 309, 141], [0.51, 309, 141],
  [0.55, 698, 386], [0.62, 698, 386],
  [0.64, 500, 270], [0.68, 240, 230],
  [0.71, 316, 230], [0.75, 316, 230],
  [0.78, 380, 230], [0.82, 380, 230],
  [0.85, 444, 230], [0.89, 444, 230],
  [0.93, 380, 405], [0.97, 380, 405], [1, 380, 405],
] as const;

export function useSeatSelectionScroll() {
  const t = useTranslations().seatSelection.ui;

  return useScrollScene("[data-booking-viewport]", useCallback(({ root, viewport }) => {
    const announcement = root.querySelector<HTMLElement>("[data-booking-announcement]");

    let lastPhase = "";
    let lastAction = "";
    let lastCount = -1;
    let continued = false;

    function update(reducedMotion: boolean) {
      const screenHeight = sceneScreenHeight(viewport);
      const lead = screenHeight * 0.35;
      const distance = scrollSceneRange(root.offsetHeight, viewport.offsetHeight, screenHeight, lead);
      const p = reducedMotion ? 1 : clamp((lead - root.getBoundingClientRect().top) / distance);
      const next = Math.max(1, stops.findIndex(([time]) => time >= p));
      const start = stops[next - 1];
      const end = stops[next];
      const travel = ease((p - start[0]) / (end[0] - start[0]));
      const mapGesture = p >= 0.08 && p < 0.15;
      const seatGesture = p >= 0.55 && p < 0.62;
      const count = p >= 0.855 ? 3 : p >= 0.785 ? 2 : p >= 0.715 ? 1 : 0;
      const selecting = (p >= 0.715 && p < 0.74) || (p >= 0.785 && p < 0.81) || (p >= 0.855 && p < 0.88);
      const panning = p >= 0.64 && p < 0.68;
      const pressingContinue = !reducedMotion && p >= 0.945 && p < 0.965;
      if (count < 3) continued = false;
      const review = continued || (!reducedMotion && p >= 0.965);
      const firstSection = p < 0.44;
      const firstGrid = ease((p - 0.235) / 0.03) * (1 - ease((p - 0.40) / 0.03));
      const secondGrid = ease((p - 0.515) / 0.025);
      const sectionPress = (p >= 0.215 && p < 0.235) || (p >= 0.49 && p < 0.515);
      const backPress = p >= 0.395 && p < 0.415;
      const action = review ? "review" : p < 0.18 ? "mapZoom" : p < 0.265 ? "firstSection" : p < 0.375 ? "limited" : p < 0.44 ? "back" : p < 0.54 ? "section" : p < 0.635 ? "seatZoom" : p < 0.69 ? "pan" : count < 3 ? "select" : "continue";
      const properties = {
        "--booking-map-zoom": ease((p - 0.08) / 0.07),
        "--booking-map-dive": 0,
        "--booking-map-opacity": 1 - Math.max(firstGrid, secondGrid),
        "--booking-section-feedback": reducedMotion ? 0 : sectionPress ? 1 : 0,
        "--booking-section": firstSection ? ease((p - 0.215) / 0.02) * (1 - ease((p - 0.40) / 0.03)) : ease((p - 0.49) / 0.025),
        "--booking-first-grid": firstGrid,
        "--booking-grid": secondGrid,
        "--booking-pan-x": ease((p - 0.64) / 0.04),
        "--booking-pan-y": ease((p - 0.64) / 0.04),
        "--booking-seat-zoom": ease((p - 0.55) / 0.07),
        "--booking-selected-1": ease((p - 0.715) / 0.025),
        "--booking-selected-2": ease((p - 0.785) / 0.025),
        "--booking-selected-3": ease((p - 0.855) / 0.025),
        "--booking-progress": p,
        "--booking-gesture": !reducedMotion && (mapGesture || seatGesture) ? 1 : 0,
        "--booking-gesture-spread": mapGesture ? ease((p - 0.08) / 0.07) : ease((p - 0.55) / 0.07),
        "--booking-touch": !reducedMotion && ((sectionPress || backPress) || panning || selecting || pressingContinue) ? 1 : 0,
        "--booking-cursor-opacity": reducedMotion || review ? 0 : ease(p / 0.04),
        "--booking-pressed": mapGesture || seatGesture || (sectionPress || backPress) || panning || selecting || pressingContinue ? 1 : 0,
        "--booking-continue-pressed": pressingContinue ? 1 : 0,
      };
      for (const [name, value] of Object.entries(properties)) root.style.setProperty(name, value.toFixed(4));
      root.style.setProperty("--booking-cursor-x", `${(start[1] + (end[1] - start[1]) * travel).toFixed(2)}px`);
      root.style.setProperty("--booking-cursor-y", `${(start[2] + (end[2] - start[2]) * travel).toFixed(2)}px`);

      const view = firstGrid > 0.5 || secondGrid > 0.5 ? "seats" : "map";
      const phase = review ? "review" : view === "map" ? "explore" : firstSection ? "section" : count === 0 ? "seats" : "selected";
      root.dataset.action = action;
      root.dataset.section = firstSection ? "N-02" : "N-03";
      root.dataset.view = view;
      root.dataset.review = String(review);
      root.dataset.ready = String(count === 3);
      root.dataset.selecting = String(count > 0);
      root.querySelectorAll<HTMLButtonElement>("[data-booking-continue]").forEach((button) => { button.disabled = count !== 3; });
      if (phase !== lastPhase || action !== lastAction || count !== lastCount) {
        lastPhase = phase;
        lastAction = action;
        lastCount = count;
        root.dataset.phase = phase;
        root.dataset.count = String(count);
        if (announcement) announcement.textContent = action === "review" ? t.reviewAnnouncement : count > 0 ? `${count} · ${t.row} · ${t.noRealBooking}` : t.actionLabels[action];
      }
    }

    function handleContinue(event: MouseEvent) {
      if (!(event.target instanceof Element) || !event.target.closest("[data-booking-continue]") || root?.dataset.ready !== "true") return;
      continued = true;
      update(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      root.querySelector<HTMLElement>("[data-booking-review]")?.focus({ preventScroll: true });
    }
    root.addEventListener("click", handleContinue);

    return { update, cleanup: () => root.removeEventListener("click", handleContinue) };
  }, [t]));
}
