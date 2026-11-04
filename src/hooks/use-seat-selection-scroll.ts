"use client";

import { SCENE_ENTRY_SCREENS, sceneScreenHeight, scrollSceneRange } from "@/lib/scroll-scene";
import { useCallback } from "react";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { useTranslations } from "@/hooks/use-translations";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};

// Explore one section, then select three adjacent seats and confirm.
const stops = [
  [0, 550, 340], [0.06, 698, 386], [0.15, 698, 386],
  [0.18, 309, 141], [0.24, 309, 141],
  [0.28, 698, 386], [0.38, 698, 386],
  [0.40, 500, 270], [0.48, 240, 230],
  [0.52, 316, 230], [0.57, 316, 230],
  [0.64, 380, 230], [0.69, 380, 230],
  [0.76, 444, 230], [0.81, 444, 230],
  [0.91, 380, 405], [0.95, 380, 405], [1, 380, 405],
] as const;

export function useSeatSelectionScroll() {
  const t = useTranslations().seatSelection.ui;

  return useScrollScene("[data-booking-viewport]", useCallback(({ root, viewport }) => {
    const progressBar = root.querySelector<HTMLElement>("[data-demo-progress]");
    const announcement = root.querySelector<HTMLElement>("[data-booking-announcement]");

    const maps = Array.from(root.querySelectorAll<SVGSVGElement>("[data-booking-map]"));
    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-booking-continue]"));
    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-booking-step]"));
    const previousProperties = new Map<string, string>();
    function writeProperty(name: string, value: string) {
      if (previousProperties.get(name) === value) return;
      previousProperties.set(name, value);
      for (const map of maps) map.style.setProperty(name, value);
    }
    function writeState(name: string, value: string) {
      if (root.dataset[name] !== value) root.dataset[name] = value;
    }

    let lastPhase = "";
    let lastAction = "";
    let lastCount = -1;
    let continued = false;

    function update(reducedMotion: boolean, playbackProgress?: number) {
      const screenHeight = sceneScreenHeight(viewport);
      const lead = screenHeight * SCENE_ENTRY_SCREENS;
      const distance = scrollSceneRange(root.offsetHeight, viewport.offsetHeight, screenHeight, lead);
      const p = reducedMotion ? 1 : playbackProgress ?? clamp((lead - root.getBoundingClientRect().top) / distance);
      const progressValue = p.toFixed(4);
      if (progressBar && progressBar.style.getPropertyValue("--demo-progress") !== progressValue) progressBar.style.setProperty("--demo-progress", progressValue);
      const next = Math.max(1, stops.findIndex(([time]) => time >= p));
      const start = stops[next - 1];
      const end = stops[next];
      const travel = ease((p - start[0]) / (end[0] - start[0]));
      const mapGesture = p >= 0.08 && p < 0.15;
      const seatGesture = p >= 0.28 && p < 0.38;
      const count = p >= 0.76 ? 3 : p >= 0.64 ? 2 : p >= 0.52 ? 1 : 0;
      const selecting = (p >= 0.52 && p < 0.55) || (p >= 0.64 && p < 0.67) || (p >= 0.76 && p < 0.79);
      const panning = p >= 0.40 && p < 0.48;
      const pressingContinue = !reducedMotion && p >= 0.945 && p < 0.965;
      if (count < 3) continued = false;
      const review = continued || (!reducedMotion && p >= 0.965);
      const secondGrid = ease((p - 0.24) / 0.04);
      const sectionPress = p >= 0.21 && p < 0.24;
      const action = review ? "review" : p < 0.18 ? "mapZoom" : p < 0.28 ? "section" : p < 0.40 ? "seatZoom" : p < 0.5 ? "pan" : count < 3 ? "select" : "continue";
      const properties = {
        "--booking-map-zoom": ease((p - 0.08) / 0.07),
        "--booking-map-dive": 0,
        "--booking-map-opacity": 1 - secondGrid,
        "--booking-section-feedback": reducedMotion ? 0 : sectionPress ? 1 : 0,
        "--booking-section": ease((p - 0.21) / 0.03),
        "--booking-first-grid": 0,
        "--booking-grid": secondGrid,
        "--booking-pan-x": ease((p - 0.40) / 0.08),
        "--booking-pan-y": ease((p - 0.40) / 0.08),
        "--booking-seat-zoom": ease((p - 0.28) / 0.10),
        "--booking-selected-1": ease((p - 0.52) / 0.03),
        "--booking-selected-2": ease((p - 0.64) / 0.03),
        "--booking-selected-3": ease((p - 0.76) / 0.03),
        "--booking-gesture": !reducedMotion && (mapGesture || seatGesture) ? 1 : 0,
        "--booking-gesture-spread": mapGesture ? ease((p - 0.08) / 0.07) : ease((p - 0.28) / 0.10),
        "--booking-touch": !reducedMotion && (sectionPress || panning || selecting || pressingContinue) ? 1 : 0,
        "--booking-cursor-opacity": reducedMotion || review ? 0 : ease(p / 0.04),
        "--booking-pressed": mapGesture || seatGesture || sectionPress || panning || selecting || pressingContinue ? 1 : 0,
        "--booking-continue-pressed": pressingContinue ? 1 : 0,
      };
      for (const [name, value] of Object.entries(properties)) writeProperty(name, value.toFixed(4));
      writeProperty("--booking-cursor-x", `${(start[1] + (end[1] - start[1]) * travel).toFixed(2)}px`);
      writeProperty("--booking-cursor-y", `${(start[2] + (end[2] - start[2]) * travel).toFixed(2)}px`);

      const view = secondGrid > 0.5 ? "seats" : "map";
      const phase = review ? "review" : view === "map" ? "explore" : count === 0 ? "seats" : "selected";
      const step = review || action === "select" || action === "continue" ? "3" : view === "seats" ? "2" : "1";
      if (root.dataset.step !== step) {
        writeState("step", step);
        for (const element of steps) {
          if (element.dataset.bookingStep === step) element.setAttribute("aria-current", "step");
          else element.removeAttribute("aria-current");
        }
      }
      writeState("action", action);
      writeState("section", "N-03");
      writeState("view", view);
      writeState("review", String(review));
      writeState("ready", String(count === 3));
      writeState("selecting", String(count > 0));
      // Cull only fully transparent SVG layers; keep both during crossfades.
      writeState("mapVisible", String(properties["--booking-map-opacity"] > 0));
      writeState("limitedVisible", "false");
      writeState("gridVisible", String(secondGrid > 0));
      if (count !== lastCount) for (const button of buttons) button.disabled = count !== 3;
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
