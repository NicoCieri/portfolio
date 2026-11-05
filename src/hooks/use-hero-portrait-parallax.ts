"use client";

import { useEffect, type RefObject } from "react";

const MAX_TILT_DEG = 28;
const INFLUENCE_PX = 560;
const SMOOTHING_MS = 110;
const FRAME_INTERVAL_MS = 1000 / 60;
const FRAME_TOLERANCE_MS = 1;
const MAX_FRAME_DELTA_MS = 64;
const SETTLE_THRESHOLD_DEG = 0.04;

/**
 * Tilts the whole portrait disc as one rigid plane (uniform rotateX/Y).
 * Mouse distance from the portrait weakens the effect.
 */
export function useHeroPortraitParallax(
  stageRef: RefObject<HTMLElement | null>,
  discRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const stageEl = stageRef.current;
    const discEl = discRef.current;
    if (!stageEl || !discEl) return;
    const stage = stageEl;
    const disc = discEl;

    const motion = window.matchMedia(
      "(min-width: 901px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let reducedMotion = !motion.matches;

    let raf: number | null = null;
    let lastTime: number | null = null;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;

    function apply(rotateX: number, rotateY: number) {
      // Rigid plane: equal rotation for the whole disc, no per-pixel scale warp.
      disc.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    }

    function stop() {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
      lastTime = null;
    }

    function settleHome() {
      targetRotateX = 0;
      targetRotateY = 0;
      if (raf === null) raf = requestAnimationFrame(tick);
    }

    function tick(time: number) {
      if (lastTime !== null && time - lastTime < FRAME_INTERVAL_MS - FRAME_TOLERANCE_MS) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const elapsed = lastTime === null ? FRAME_INTERVAL_MS : Math.min(time - lastTime, MAX_FRAME_DELTA_MS);
      const smoothing = 1 - Math.exp(-elapsed / SMOOTHING_MS);
      currentRotateX += (targetRotateX - currentRotateX) * smoothing;
      currentRotateY += (targetRotateY - currentRotateY) * smoothing;
      const settled =
        Math.hypot(targetRotateX - currentRotateX, targetRotateY - currentRotateY) < SETTLE_THRESHOLD_DEG;
      if (settled) {
        currentRotateX = targetRotateX;
        currentRotateY = targetRotateY;
      }
      apply(currentRotateX, currentRotateY);
      lastTime = time;
      raf = settled ? null : requestAnimationFrame(tick);
      if (settled) lastTime = null;
    }

    function move(event: PointerEvent) {
      if (event.pointerType === "touch" || document.hidden || reducedMotion) return;
      const rect = stage.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      const falloff = Math.exp(-distance / INFLUENCE_PX);
      const nx = Math.max(-1, Math.min(1, dx / (rect.width * 0.5)));
      const ny = Math.max(-1, Math.min(1, dy / (rect.height * 0.5)));
      targetRotateX = -ny * MAX_TILT_DEG * falloff;
      targetRotateY = nx * MAX_TILT_DEG * falloff;
      if (raf === null) raf = requestAnimationFrame(tick);
    }

    function configure() {
      stop();
      window.removeEventListener("pointermove", move);
      reducedMotion = !motion.matches;
      currentRotateX = targetRotateX = 0;
      currentRotateY = targetRotateY = 0;
      apply(0, 0);
      if (motion.matches) window.addEventListener("pointermove", move, { passive: true });
    }

    function onBlur() {
      settleHome();
    }

    function onPointerOut(event: PointerEvent) {
      if (event.relatedTarget === null) settleHome();
    }

    configure();
    motion.addEventListener("change", configure);
    window.addEventListener("blur", onBlur);
    window.addEventListener("pointerout", onPointerOut);

    return () => {
      stop();
      motion.removeEventListener("change", configure);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("pointerout", onPointerOut);
      disc.style.transform = "";
    };
  }, [stageRef, discRef]);
}
