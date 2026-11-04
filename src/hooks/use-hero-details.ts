"use client";

import { useLayoutEffect, useRef } from "react";

const RECYCLE_DELAY_S = 3;

/** Recycles a bounded set of details, with random timing and positions across the hero. */
export function useHeroDetails() {
  const layer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = layer.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll<HTMLElement>("[data-falling-detail]"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 700px)");
    let visible = false;

    function place(element: HTMLElement, initial: boolean) {
      if (!root) return;
      const depth = Number(element.dataset.depth);
      const layers = [
        { size: 26, variation: 18, duration: 62, durationVariation: 23, opacity: 0.035 },
        { size: 55, variation: 30, duration: 38, durationVariation: 20, opacity: 0.055 },
        { size: 95, variation: 50, duration: 22, durationVariation: 14, opacity: 0.08 },
      ];
      const settings = layers[depth];
      const scale = Math.min(1, root.clientWidth / 700);
      const size = (settings.size + Math.random() * settings.variation) * scale;
      const padding = size * 0.15 + 2;
      const space = Math.max(0, root.clientWidth - size - padding * 2);
      const x = padding + Math.random() * space;
      const duration = settings.duration + Math.random() * settings.durationVariation;
      element.style.setProperty("--detail-depth", String(depth));
      element.style.setProperty("--detail-x", `${x}px`);
      element.style.setProperty("--detail-size", `${size}px`);
      element.style.setProperty("--detail-duration", `${duration}s`);
      element.style.setProperty("--detail-delay", `${initial ? -Math.random() * duration : Math.random() * RECYCLE_DELAY_S}s`);
      element.style.setProperty("--detail-start", `${-size - 12}px`);
      element.style.setProperty("--detail-end", `${root.clientHeight + size}px`);
      element.style.setProperty("--detail-tilt", `${Math.random() * 24 - 12}deg`);
      element.style.setProperty("--detail-turn", `${Math.random() * 36 - 18}deg`);
      element.style.setProperty("--detail-opacity", String(settings.opacity + Math.random() * 0.025));
      // Alternating identical keyframes restarts a finished CSS animation without layout reads.
      element.style.animationName = element.style.animationName === "hero-detail-fall" ? "hero-detail-fall-next" : "hero-detail-fall";
    }

    function reset() {
      if (!motion.matches) elements.forEach((element) => place(element, true));
      syncPlayback();
    }

    function syncPlayback() {
      if (!root) return;
      const running = visible && !motion.matches && !document.hidden;
      root.dataset.running = String(running);
      if (running) root.dataset.ready = "true";
    }

    function recycle(event: AnimationEvent) {
      const element = event.target;
      if (!(element instanceof HTMLElement)) return;
      if (elements.includes(element)) place(element, false);
    }

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    let width = root.clientWidth;
    let height = root.clientHeight;
    const resize = new ResizeObserver(() => {
      if (root.clientWidth === width && root.clientHeight === height) return;
      width = root.clientWidth;
      height = root.clientHeight;
      reset();
    });
    intersection.observe(root);
    resize.observe(root);
    root.addEventListener("animationend", recycle);
    motion.addEventListener("change", reset);
    document.addEventListener("visibilitychange", syncPlayback);
    // Place before paint so the fade-in reveals marks that are already falling, not the unpositioned server markup.
    const rect = root.getBoundingClientRect();
    visible = rect.bottom > 0 && rect.top < window.innerHeight;
    reset();

    return () => {
      intersection.disconnect();
      resize.disconnect();
      root.removeEventListener("animationend", recycle);
      motion.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  return layer;
}
