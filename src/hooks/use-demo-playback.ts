"use client";

import { useEffect, useRef } from "react";

const durations: Record<string, number> = { ticketing: 6, "seat-selection": 12, "stadium-editor": 12, backoffice: 10, airport: 13, ecommerce: 12, craft: 9 };

/** Local, time-driven playback: never changes scroll position or section height. */
export function useDemoPlayback() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = stage.current?.closest("section");
    if (!root) return;
    const mobile = window.matchMedia("(max-width: 700px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let elapsed = 0;
    let visible = false;
    let playing = false;
    let frame: number | null = null;
    let lastTime: number | null = null;
    const duration = (durations[root.id] ?? 12) * 1000;

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
    }
    function tick(time: number) {
      frame = null;
      if (!playing) return;
      if (lastTime !== null) elapsed += Math.min(100, time - lastTime);
      lastTime = time;
      // Briefly retain the completed state before starting the next cycle.
      if (elapsed >= duration + 500) elapsed = 0;
      root!.dispatchEvent(new CustomEvent("demo-progress", { detail: Math.min(1, elapsed / duration) }));
      frame = requestAnimationFrame(tick);
    }
    function configure() {
      stop();
      playing = visible && mobile.matches && !motion.matches && !document.hidden;
      root!.dataset.demoPlaying = String(playing);
      if (playing) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
      configure();
    }, { threshold: [0, 0.2] });
    observer.observe(root);
    document.addEventListener("visibilitychange", configure);
    mobile.addEventListener("change", configure);
    motion.addEventListener("change", configure);
    return () => {
      playing = false;
      stop();
      delete root.dataset.demoPlaying;
      observer.disconnect();
      document.removeEventListener("visibilitychange", configure);
      mobile.removeEventListener("change", configure);
      motion.removeEventListener("change", configure);
    };
  }, []);

  return stage;
}
