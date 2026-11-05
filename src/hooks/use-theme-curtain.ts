"use client";

import { useRef } from "react";
import { createHeroSnapshot } from "@/lib/hero-snapshot";

export function useThemeCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef(false);

  async function playCurtain(swapTheme: () => void) {
    const curtain = curtainRef.current;
    if (
      !curtain ||
      matchMedia("(prefers-reduced-motion: reduce), (max-width: 700px)").matches
    ) {
      swapTheme();
      return;
    }
    if (runningRef.current) return;
    runningRef.current = true;

    // Freeze the target color so it does not flip when the theme changes mid-sweep.
    const falling = document.documentElement.dataset.theme !== "dark";
    // Falling follows constant acceleration; lifting starts under tension and
    // slows as the curtain reaches its stop. Both layers share this timing.
    const movement: KeyframeAnimationOptions = {
      duration: falling ? 850 : 1050,
      easing: falling
        ? "cubic-bezier(0.333333, 0, 0.666667, 0.333333)"
        : "cubic-bezier(0.42, 0, 0.25, 1)",
      fill: "forwards",
    };
    curtain.style.color = getComputedStyle(document.documentElement)
      .getPropertyValue("--theme-curtain")
      .trim();
    curtain.style.clipPath = `url(#theme-curtain-${falling ? "fall" : "rise"})`;
    const hero = document.querySelector<HTMLElement>("[data-hero-content]");
    const snapshot = hero
      ? createHeroSnapshot(hero, falling ? "dark" : "light")
      : null;
    if (snapshot) curtain.appendChild(snapshot);
    curtain.hidden = false;
    // A transformed parent establishes the fixed child's containing block.
    // Cancel that movement so the snapshot stays aligned with the viewport.
    const snapshotMotion = snapshot?.animate(
      [
        { transform: falling ? "translateY(138svh)" : "translateY(-100svh)" },
        { transform: falling ? "translateY(22svh)" : "translateY(8svh)" },
      ],
      movement,
    );
    try {
      await curtain.animate(
        [
          { transform: falling ? "translateY(-138svh)" : "translateY(100svh)" },
          { transform: falling ? "translateY(-22svh)" : "translateY(-8svh)" },
        ],
        movement,
      ).finished;
      swapTheme();
      await curtain.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 220,
        easing: "ease-out",
        fill: "forwards",
      }).finished;
    } finally {
      snapshotMotion?.cancel();
      snapshot?.remove();
      curtain.hidden = true;
      curtain.getAnimations().forEach((animation) => animation.cancel());
      runningRef.current = false;
    }
  }

  return { curtainRef, playCurtain };
}
