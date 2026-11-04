"use client";

import { useEffect, useRef } from "react";

export function useAmbientSpotlight() {
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = overlay.current;
    if (!element) return;
    const style = element.style;

    // Dim only the dots once the hero leaves view; cursor lighting stays intact.
    // IntersectionObserver avoids a scroll handler or another animation loop.
    const hero = document.getElementById("about");
    const heroVisibility = hero ? new IntersectionObserver(([entry]) => {
      style.setProperty("--ambient-dot-visibility", entry.intersectionRatio > 0.25 ? "1" : "0.35");
    }, { threshold: [0, 0.25] }) : null;
    if (hero) heroVisibility?.observe(hero);

    const motion = window.matchMedia(
      "(min-width: 701px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame: number | null = null;
    let lastTime: number | null = null;
    let x = window.innerWidth * 0.7;
    let y = window.innerHeight * 0.3;
    let targetX = x;
    let targetY = y;

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
    }

    function animate(time: number) {
      // Cap gradient paints around 60 Hz, including on high-refresh displays.
      if (lastTime !== null && time - lastTime < 1000 / 60 - 1) {
        frame = requestAnimationFrame(animate);
        return;
      }
      const elapsed = lastTime === null ? 1000 / 60 : Math.min(time - lastTime, 64);
      const smoothing = 1 - Math.exp(-elapsed / 110);
      x += (targetX - x) * smoothing;
      y += (targetY - y) * smoothing;
      const settled = Math.hypot(targetX - x, targetY - y) < 0.5;
      if (settled) {
        x = targetX;
        y = targetY;
      }
      style.setProperty("--ambient-x", `${x.toFixed(2)}px`);
      style.setProperty("--ambient-y", `${y.toFixed(2)}px`);
      lastTime = time;
      frame = settled ? null : requestAnimationFrame(animate);
      if (settled) lastTime = null;
    }

    function move(event: PointerEvent) {
      if (event.pointerType === "touch" || document.hidden) return;
      // client coordinates match the fixed overlay, even while the page scrolls.
      targetX = event.clientX;
      targetY = event.clientY;
      if (frame === null) frame = requestAnimationFrame(animate);
    }

    function visibilityChange() {
      if (document.hidden) stop();
    }

    function leave(event: PointerEvent) {
      if (event.relatedTarget === null) stop();
    }

    function configure() {
      stop();
      window.removeEventListener("pointermove", move);
      style.removeProperty("--ambient-x");
      style.removeProperty("--ambient-y");
      x = targetX = window.innerWidth * 0.7;
      y = targetY = window.innerHeight * 0.3;
      if (motion.matches) window.addEventListener("pointermove", move, { passive: true });
    }

    configure();
    motion.addEventListener("change", configure);
    document.addEventListener("visibilitychange", visibilityChange);
    window.addEventListener("blur", stop);
    window.addEventListener("pointerout", leave);

    return () => {
      heroVisibility?.disconnect();
      stop();
      motion.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", visibilityChange);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", stop);
      window.removeEventListener("pointerout", leave);
    };
  }, []);


  return overlay;
}
