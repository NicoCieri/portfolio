"use client";

import { sceneScreenHeight, SCENE_INTRO_SCREENS, mapSceneProgress, sceneContentReveal, scrollSceneRange } from "@/lib/scroll-scene";
import { useCallback } from "react";
import { useScrollScene } from "@/hooks/use-scroll-scene";
import { useTranslations } from "@/hooks/use-translations";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const p = clamp(value); return p * p * (3 - 2 * p); };
const stops = [[0, 450, 340], [0.17, 205, 250], [0.26, 205, 250], [0.4, 825, 314], [0.47, 825, 364], [0.6, 825, 364], [0.72, 825, 364], [0.86, 825, 364], [1, 825, 364]] as const;

// Loading states occupy more scroll travel than the surrounding actions.
const scrollIntervals = [[0.43, 1], [0.58, 2.34], [0.73, 1], [0.87, 2.34], [1, 1]] as const;

export function useBackofficeScroll() {
  const announcements = useTranslations().backoffice.announcements;

  return useScrollScene("[data-backoffice-viewport]", useCallback(({ root, viewport }) => {
    const announcement = root.querySelector<HTMLElement>("[data-backoffice-announcement]");
    const mobileScreen = root.querySelector<HTMLElement>("[data-bo-mobile-screen]");
    const mobileOrder = root.querySelector<HTMLElement>("[data-bo-mobile-order]");
    const mobileSave = root.querySelector<HTMLElement>("[data-bo-mobile-save]");
    let lastPhase = "";

    function update(reducedMotion: boolean, playbackProgress?: number) {
      const screenHeight = sceneScreenHeight(viewport);
      const bounds = root.getBoundingClientRect();
      const introDistance = screenHeight * SCENE_INTRO_SCREENS;
      const distance = Math.max(1, scrollSceneRange(root.offsetHeight, viewport.offsetHeight, screenHeight) - introDistance);
      const reveal = reducedMotion || playbackProgress !== undefined ? 1 : sceneContentReveal(-bounds.top, screenHeight);
      root.style.setProperty("--scene-content-reveal", String(reveal));
      const scrollProgress = reducedMotion ? 1 : playbackProgress ?? clamp((-bounds.top - introDistance) / distance);
      const p = mapSceneProgress(scrollProgress, scrollIntervals);
      const phase = p < 0.2 ? "queue" : p < 0.43 ? "inspect" : p < 0.58 ? "saving" : p < 0.73 ? "error" : p < 0.87 ? "retry" : "saved";
      const changed = phase === "saving" || phase === "retry" || phase === "saved";
      const next = Math.max(1, stops.findIndex(([time]) => time >= p));
      const start = stops[next - 1];
      const end = stops[next];
      const travel = ease((p - start[0]) / (end[0] - start[0]));
      if (mobileScreen?.offsetWidth && mobileOrder && mobileSave) {
        const savePanel = mobileSave.offsetParent as HTMLElement;
        const orderX = mobileOrder.offsetLeft + mobileOrder.offsetWidth * 0.65;
        const orderY = mobileOrder.offsetTop + mobileOrder.offsetHeight / 2;
        const saveX = mobileSave.offsetLeft + mobileSave.offsetWidth * 0.7;
        const saveY = savePanel.offsetTop + mobileSave.offsetTop + mobileSave.offsetHeight / 2;
        const arrival = ease(p / 0.17);
        const toSave = ease((p - 0.26) / 0.14);
        const x = p < 0.26 ? 260 + (orderX - 260) * arrival : orderX + (saveX - orderX) * toSave;
        const y = p < 0.26 ? 310 + (orderY - 310) * arrival : orderY + (saveY - orderY) * toSave;
        mobileScreen.style.setProperty("--bo-touch-x", `${x.toFixed(2)}px`);
        mobileScreen.style.setProperty("--bo-touch-y", `${y.toFixed(2)}px`);
      }
      const properties = {
        "--bo-progress": scrollProgress,
        "--bo-selected": ease((p - 0.17) / 0.05),
        "--bo-panel": ease((p - 0.22) / 0.12),
        "--bo-cursor-opacity": reducedMotion ? 0 : ease(p / 0.08) * (1 - ease((p - 0.9) / 0.08)),
        "--bo-press": (p > 0.18 && p < 0.22) || (p > 0.44 && p < 0.49) || (p > 0.73 && p < 0.78) ? 1 : 0,
      };
      for (const [name, value] of Object.entries(properties)) root.style.setProperty(name, value.toFixed(4));
      root.style.setProperty("--bo-cursor-x", `${(start[1] + (end[1] - start[1]) * travel).toFixed(2)}px`);
      root.style.setProperty("--bo-cursor-y", `${(start[2] + (end[2] - start[2]) * travel).toFixed(2)}px`);
      if (phase !== lastPhase) {
        lastPhase = phase;
        root.dataset.phase = phase;
        root.dataset.changed = String(changed);
        if (announcement) announcement.textContent = announcements[phase];
      }
    }
    return { update };
  }, [announcements]));
}
