"use client";

import { SCENE_ENTRY_SCREENS, sceneScreenHeight, SCENE_INTRO_SCREENS, mapSceneProgress, sceneContentReveal, scrollSceneRange } from "@/lib/scroll-scene";
import { useCallback } from "react";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { useTranslations } from "@/hooks/use-translations";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const p = clamp(value); return p * p * (3 - 2 * p); };

// Coordinates are in each screen’s SVG viewBox, so pointers stay on their
// controls at every device size. Each press follows a short arrival/dwell.
const pointerStops = [
  [0, 410, 280, 120, 280],
  [0.12, 150, 240, 120, 175], [0.17, 150, 240, 120, 175],
  [0.28, 176, 350, 166, 370], [0.35, 176, 350, 166, 370],
  [0.43, 265, 406, 120, 423], [0.49, 265, 406, 120, 423],
  [0.6, 651, 159, 131, 157], [0.64, 651, 159, 131, 157],
  [0.69, 664, 405, 120, 422], [0.74, 664, 405, 120, 422],
  [0.86, 611, 367, 120, 424], [0.94, 611, 367, 120, 424],
  [1, 611, 367, 120, 424],
] as const;

// Loading states occupy more scroll travel than the surrounding actions.
const scrollIntervals = [[0.46, 1], [0.56, 2], [0.7, 1], [0.76, 3.2], [0.91, 1], [0.96, 4], [1, 1]] as const;

export function useCommerceScroll() {
  const announcements = useTranslations().commerce.announcements;

  return useScrollScene("[data-commerce-viewport]", useCallback(({ root, viewport }) => {
    const announcement = root.querySelector<HTMLElement>("[data-commerce-announcement]");
    let previousPhase = "";

    function update(reducedMotion: boolean, playbackProgress?: number) {
      const screenHeight = sceneScreenHeight(viewport);
      const bounds = root.getBoundingClientRect();
      const entryLead = screenHeight * SCENE_ENTRY_SCREENS;
      const introDistance = screenHeight * SCENE_INTRO_SCREENS;
      const distance = Math.max(1, scrollSceneRange(root.offsetHeight, viewport.offsetHeight, screenHeight, entryLead) - introDistance);
      const reveal = reducedMotion || playbackProgress !== undefined ? 1 : sceneContentReveal(entryLead - bounds.top, screenHeight);
      root.style.setProperty("--scene-content-reveal", String(reveal));
      const scrollProgress = reducedMotion ? 1 : playbackProgress ?? clamp((entryLead - bounds.top - introDistance) / distance);
      const p = mapSceneProgress(scrollProgress, scrollIntervals);
      const variant = ease((p - 0.32) / 0.06);
      const flight = ease((p - 0.48) / 0.09);
      const cart = ease((p - 0.55) / 0.05);
      const checkout = ease((p - 0.76) / 0.07);
      const next = Math.max(1, pointerStops.findIndex(([time]) => time >= p));
      const start = pointerStops[next - 1];
      const end = pointerStops[next];
      const travel = ease((p - start[0]) / (end[0] - start[0]));
      const phase = p < 0.18 ? "discover" : p < 0.46 ? "variant" : p < 0.56 ? "adding" : p < 0.7 ? "bag" : p < 0.76 ? "loading" : p < 0.91 ? "checkout" : p < 0.96 ? "confirming" : "complete";
      const properties = {
        "--commerce-progress": scrollProgress,
        "--commerce-variant": variant,
        "--commerce-detail": ease((p - 0.17) / 0.06),
        "--commerce-complete": ease((p - 0.96) / 0.035),
        "--commerce-flight": flight,
        "--commerce-flying": reducedMotion ? 0 : ease((p - 0.48) / 0.015) * (1 - ease((p - 0.56) / 0.015)),
        "--commerce-cart": cart,
        "--commerce-drawer": ease((p - 0.52) / 0.055),
        "--commerce-checkout": checkout,
        "--commerce-entrance": reducedMotion ? 1 : ease(p / 0.14),
        "--commerce-pointer": reducedMotion ? 0 : ease(p / 0.08) * (1 - ease((p - 0.95) / 0.03)),
        "--commerce-press": ([0.15, 0.32, 0.46, 0.71, 0.92].some((time) => p >= time && p < time + 0.025) && !reducedMotion) ? 1 : 0,
      };
      for (const [name, value] of Object.entries(properties)) root.style.setProperty(name, value.toFixed(4));
      for (const [name, index] of [["mouse-x", 1], ["mouse-y", 2], ["touch-x", 3], ["touch-y", 4]] as const) {
        root.style.setProperty(`--commerce-${name}`, `${(start[index] + (end[index] - start[index]) * travel).toFixed(2)}px`);
      }
      if (phase !== previousPhase) {
        previousPhase = phase;
        root.dataset.phase = phase;
        if (announcement) announcement.textContent = announcements[phase];
      }
    }
    return { update };
  }, [announcements]));
}
