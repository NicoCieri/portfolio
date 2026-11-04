"use client";

import { useEffect, useRef } from "react";

type SceneElements = { root: HTMLElement; viewport: HTMLElement };
type SceneController = {
  update: (reducedMotion: boolean) => void;
  cleanup?: () => void;
};
type SceneSetup = (elements: SceneElements) => SceneController;

/** Owns the browser lifecycle; each scene keeps its own progress and visual rules. */
export function useScrollScene(viewportSelector: string, setup: SceneSetup) {
  const scene = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = scene.current;
    const viewport = root?.querySelector<HTMLElement>(viewportSelector);
    if (!root || !viewport) return;

    const controller = setup({ root, viewport });
    const announcements = Array.from(root.querySelectorAll<HTMLElement>('[role="status"][aria-live]'));
    for (const element of announcements) element.setAttribute("aria-live", "off");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-height: 600px), (max-width: 359px)");
    let visible = true;
    let frame: number | null = null;

    function cancel() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }

    function update() {
      frame = null;
      controller.update(motion.matches || compact.matches);
    }

    function schedule() {
      if (visible && frame === null) frame = requestAnimationFrame(update);
    }

    function configure() {
      cancel();
      window.removeEventListener("scroll", schedule);
      if (!motion.matches && !compact.matches) window.addEventListener("scroll", schedule, { passive: true });
      update();
    }

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      for (const element of announcements) element.setAttribute("aria-live", visible ? "polite" : "off");
      cancel();
      // Settle the scene even when navigation jumps entirely past it.
      update();
    });
    const resize = new ResizeObserver(schedule);
    intersection.observe(root);
    resize.observe(root);
    resize.observe(viewport);
    motion.addEventListener("change", configure);
    compact.addEventListener("change", configure);
    window.addEventListener("resize", schedule, { passive: true });
    configure();

    return () => {
      cancel();
      intersection.disconnect();
      resize.disconnect();
      motion.removeEventListener("change", configure);
      compact.removeEventListener("change", configure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      controller.cleanup?.();
      for (const element of announcements) element.setAttribute("aria-live", "polite");
    };
  }, [viewportSelector, setup]);

  return scene;
}
