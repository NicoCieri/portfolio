"use client";

import { sceneScreenHeight, scrollSceneRange } from "@/lib/scroll-scene";
import { useCallback } from "react";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { useTranslations } from "@/hooks/use-translations";

export const VALIDATION_THRESHOLD = 0.72;

function smoothProgress(value: number) {
  const clamped = Math.max(0, Math.min(1, value));
  return clamped * clamped * (3 - 2 * clamped);
}

export function useTicketingScroll() {
  const announcements = useTranslations().ticketing.announcements;

  return useScrollScene("[data-scene-viewport]", useCallback(({ root, viewport }) => {
    const announcement = root.querySelector<HTMLElement>("[data-validation-announcement]");

    let phase: "ready" | "scanning" | "validated" | null = null;
    let revealed: boolean | null = null;

    function update(reducedMotion: boolean, playbackProgress?: number) {
      const screenHeight = sceneScreenHeight(viewport);
      // Start on entry and finish before the final sticky hold.
      const entryLead = screenHeight;
      const range = scrollSceneRange(root.offsetHeight, viewport.offsetHeight, screenHeight, entryLead);
      const progress = reducedMotion ? 1 : playbackProgress ?? Math.max(0, Math.min(1, (entryLead - root.getBoundingClientRect().top) / range));
      const eased = smoothProgress(progress / 0.5);
      // Overlap fully before validation, then reveal both success screens.
      const scanIn = smoothProgress((progress - 0.5) / 0.14);
      const scanOut = 1 - smoothProgress((progress - 0.78) / 0.17);
      const overlap = reducedMotion ? 0 : scanIn * scanOut;
      root.style.setProperty("--scene-progress", eased.toFixed(4));
      root.style.setProperty("--scene-spread", (1 - eased).toFixed(4));
      root.style.setProperty("--scene-scroll", progress.toFixed(4));
      root.style.setProperty("--scene-overlap", overlap.toFixed(4));

      // Let the attendee confirmation animate once the front phone uncovers it.
      const nextReveal = progress >= 0.9;
      if (nextReveal !== revealed) {
        revealed = nextReveal;
        root.dataset.revealed = String(nextReveal);
      }

      const next = progress >= VALIDATION_THRESHOLD ? "validated" : progress >= 0.6 ? "scanning" : "ready";
      if (next === phase) return;
      phase = next;
      root.dataset.phase = next;
      root.dataset.validated = String(next === "validated");
      if (announcement) announcement.textContent = announcements[next];
    }

    return { update };
  }, [announcements]));
}
