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
    const progressIndicator = root.querySelector<HTMLElement>("[data-mobile-scene-progress]");
    const progressLabel = root.querySelector<HTMLElement>("[data-scene-progress-label]");
    const announcements = Array.from(root.querySelectorAll<HTMLElement>('[role="status"][aria-live]'));
    for (const element of announcements) element.setAttribute("aria-live", "off");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-height: 600px), (max-width: 359px)");
    let nearby = false;
    let visible = false;
    let frame: number | null = null;

    function cancel() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }

    function update() {
      frame = null;
      if (!root || !viewport) return;
      // Read geometry before the controller writes animation styles.
      // Follow the entire sticky section, including the final pause before the next demo.
      const travel = Math.max(1, root.offsetHeight - viewport.offsetHeight);
      const progress = Math.max(0, Math.min(1, -root.getBoundingClientRect().top / travel));
      controller.update(motion.matches || compact.matches);
      const value = String(progress);
      if (progressIndicator && progressIndicator.style.getPropertyValue("--scene-travel") !== value) progressIndicator.style.setProperty("--scene-travel", value);
      const percentage = String(Math.round(Math.min(1, progress / 0.94) * 100));
      if (progressLabel && progressLabel.textContent !== percentage) progressLabel.textContent = percentage;
    }

    function schedule() {
      if (nearby && !document.hidden && frame === null) frame = requestAnimationFrame(update);
    }

    function configure() {
      cancel();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      const active = nearby && !document.hidden;
      if (active) {
        window.addEventListener("resize", schedule, { passive: true });
        if (!motion.matches && !compact.matches) window.addEventListener("scroll", schedule, { passive: true });
      }
      // Preserve correct initial/restored URLs and compact/reduced-motion states.
      if (!document.hidden) update();
      root!.dataset.sceneActive = String(active);
      for (const element of announcements) element.setAttribute("aria-live", active && visible ? "polite" : "off");
    }

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      for (const element of announcements) element.setAttribute("aria-live", visible && !document.hidden ? "polite" : "off");
    });
    // Prepare before entry, retain the DOM/state, and settle once on exit. This
    // also covers reverse scrolling and navigation that skips a complete demo.
    const activity = new IntersectionObserver(([entry]) => {
      if (nearby === entry.isIntersecting) return;
      nearby = entry.isIntersecting;
      configure();
    }, { rootMargin: "200px 0px" });
    const resize = new ResizeObserver(schedule);
    intersection.observe(root);
    activity.observe(root);
    resize.observe(root);
    resize.observe(viewport);
    motion.addEventListener("change", configure);
    compact.addEventListener("change", configure);
    document.addEventListener("visibilitychange", configure);
    configure();

    return () => {
      cancel();
      intersection.disconnect();
      activity.disconnect();
      resize.disconnect();
      motion.removeEventListener("change", configure);
      compact.removeEventListener("change", configure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", configure);
      delete root.dataset.sceneActive;
      controller.cleanup?.();
      for (const element of announcements) element.setAttribute("aria-live", "polite");
    };
  }, [viewportSelector, setup]);

  return scene;
}
