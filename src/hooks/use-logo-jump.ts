"use client";

import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { flushSync } from "react-dom";
import { burstLogoConfetti } from "@/lib/logo-confetti";

type Side = "home" | "away";

type SlotMap = {
  home: RefObject<HTMLElement | null>;
  away: RefObject<HTMLElement | null>;
};

const JUMP_MS = 340;
const SPINS = 1;
const ARC_PX = 36;
const GROW_FROM = 4;
const GROW_UNTIL = 10;
/** Next hover after max growth triggers the explosion. */
const EXPLODE_AFTER = 10;
const REAPPEAR_MS = 420;
const LOGO_TEXT_PX = 27;
/** Oversized so "nc." clips hard against the fixed mark in the final jumps. */
const LOGO_TEXT_MAX_PX = 56;
/** Container scale only on the final stretch before confetti. */
const LOGO_SCALE_FROM = 7;
const LOGO_SCALE_MAX = 1.12;
const LOGO_PAPER = { r: 255, g: 249, b: 237 }; // --pop-paper
const LOGO_DANGER = { r: 255, g: 45, b: 45 };

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

function mixChannel(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function buildLogoMarkStyle(jumpCount: number): {
  fontSize: string;
  color: string;
  scale?: string;
} | undefined {
  if (jumpCount < GROW_FROM) return undefined;
  const span = GROW_UNTIL - GROW_FROM;
  const t = Math.min(1, (jumpCount - GROW_FROM) / span);
  const sizeT = easeOutCubic(t);
  const colorT = easeInCubic(t);
  const size = LOGO_TEXT_PX + (LOGO_TEXT_MAX_PX - LOGO_TEXT_PX) * sizeT;
  const r = mixChannel(LOGO_PAPER.r, LOGO_DANGER.r, colorT);
  const g = mixChannel(LOGO_PAPER.g, LOGO_DANGER.g, colorT);
  const b = mixChannel(LOGO_PAPER.b, LOGO_DANGER.b, colorT);
  const scaleSpan = GROW_UNTIL - LOGO_SCALE_FROM;
  const scaleT =
    jumpCount <= LOGO_SCALE_FROM
      ? 0
      : easeInCubic(Math.min(1, (jumpCount - LOGO_SCALE_FROM) / scaleSpan));
  const scale = 1 + (LOGO_SCALE_MAX - 1) * scaleT;
  return {
    fontSize: `${size.toFixed(1)}px`,
    color: `rgb(${r} ${g} ${b})`,
    ...(scale > 1 ? { scale: scale.toFixed(3) } : {}),
  };
}

function jumpScale(t: number) {
  if (t < 0.12) {
    const bump = Math.sin((t / 0.12) * Math.PI);
    return { sx: 1 + 0.1 * bump, sy: 1 - 0.16 * bump };
  }
  if (t > 0.84) {
    const bump = Math.sin(((t - 0.84) / 0.16) * Math.PI);
    return { sx: 1 + 0.12 * bump, sy: 1 - 0.18 * bump };
  }
  return { sx: 0.97, sy: 1.04 };
}

function slotOffset(side: Side, slots: SlotMap): { x: number; y: number } | null {
  const home = slots.home.current;
  const target = slots[side].current;
  if (!home || !target) return null;
  // Relative to the home slot so resting at home needs no JS transform.
  const origin = home.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  return { x: rect.left - origin.left, y: rect.top - origin.top };
}

export function useLogoJump(
  logoRef: RefObject<HTMLElement | null>,
  slots: SlotMap,
) {
  const [side, setSide] = useState<Side>("home");
  const [jumping, setJumping] = useState(false);
  const [jumpCount, setJumpCount] = useState(0);
  const [done, setDone] = useState(false);
  const busyRef = useRef(false);
  const armedRef = useRef(true);
  const pointerInsideRef = useRef(false);
  const doneRef = useRef(false);
  const sideRef = useRef<Side>("home");
  const jumpCountRef = useRef(0);
  const explodedRef = useRef(false);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);
  const slotsRef = useRef(slots);
  useLayoutEffect(() => {
    slotsRef.current = slots;
  }, [slots]);

  const placeLogo = (at: Side) => {
    const logo = logoRef.current;
    if (!logo) return;
    const pos = slotOffset(at, slotsRef.current);
    if (!pos) return;
    logo.style.transform =
      pos.x === 0 && pos.y === 0 ? "" : `translate(${pos.x}px, ${pos.y}px)`;
  };

  const retire = () => {
    doneRef.current = true;
    setDone(true);
    busyRef.current = false;
    armedRef.current = false;
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    const logo = logoRef.current;
    if (logo) {
      logo.style.willChange = "";
      logo.style.zIndex = "";
      logo.style.pointerEvents = "none";
    }
  };

  useLayoutEffect(() => {
    if (sideRef.current !== "home") placeLogo(sideRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (done) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = motion.matches;
    const syncMotion = () => {
      reducedMotionRef.current = motion.matches;
    };
    motion.addEventListener("change", syncMotion);

    const onResize = () => {
      if (!busyRef.current) placeLogo(sideRef.current);
    };
    window.addEventListener("resize", onResize);

    return () => {
      motion.removeEventListener("change", syncMotion);
      window.removeEventListener("resize", onResize);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo || done) return;

    const settle = (next: Side) => {
      logo.style.willChange = "";
      logo.style.opacity = "";
      logo.style.zIndex = "";
      placeLogo(next);
      busyRef.current = false;
      if (!pointerInsideRef.current) armedRef.current = true;
    };

    const reappearAtHome = async () => {
      // Reset counter/label before the logo is visible again so "nc." shows from frame one.
      jumpCountRef.current = 0;
      flushSync(() => {
        setJumpCount(0);
        setJumping(false);
        setSide("home");
      });
      sideRef.current = "home";
      logo.style.fontSize = "";
      logo.style.color = "";
      logo.style.scale = "";
      placeLogo("home");

      if (reducedMotionRef.current) {
        logo.style.opacity = "";
        logo.style.transform = "";
        logo.style.transition = "";
        retire();
        return;
      }

      logo.style.willChange = "transform, opacity";
      logo.style.transition = "none";
      logo.style.opacity = "0";
      logo.style.transform = "scale(0.2)";
      // Force a layout flush so the enter transition starts from the small state.
      void logo.offsetWidth;
      logo.style.transition = `transform ${REAPPEAR_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${REAPPEAR_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
      logo.style.opacity = "1";
      logo.style.transform = "scale(1)";
      await new Promise((r) => setTimeout(r, REAPPEAR_MS));
      if (doneRef.current) return;
      logo.style.transition = "";
      logo.style.willChange = "";
      logo.style.opacity = "";
      logo.style.transform = "";
      retire();
    };

    const explodeAtLanding = async (landing: Side) => {
      placeLogo(landing);
      const rect = logo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      if (reducedMotionRef.current) {
        logo.style.opacity = "0";
        await reappearAtHome();
        return;
      }

      logo.style.willChange = "transform, opacity";
      logo.style.zIndex = "3";
      const pop = slotOffset(landing, slotsRef.current);
      if (pop) {
        logo.style.transition = "transform 120ms ease-out, opacity 120ms ease-out";
        logo.style.transform = `translate(${pop.x}px, ${pop.y}px) scale(1.35)`;
        await new Promise((r) => setTimeout(r, 120));
        if (doneRef.current) return;
        logo.style.transform = `translate(${pop.x}px, ${pop.y}px) scale(0.15)`;
        logo.style.opacity = "0";
        await new Promise((r) => setTimeout(r, 90));
        if (doneRef.current) return;
      } else {
        logo.style.opacity = "0";
      }

      logo.style.transition = "";
      const confetti = burstLogoConfetti(cx, cy);

      sideRef.current = "home";
      setSide("home");
      placeLogo("home");
      logo.style.transform = "scale(0.2)";
      logo.style.opacity = "0";

      await confetti;
      if (doneRef.current) return;
      await reappearAtHome();
    };

    const finish = (next: Side) => {
      jumpCountRef.current += 1;
      setJumpCount(jumpCountRef.current);
      setJumping(false);
      sideRef.current = next;
      setSide(next);
      busyRef.current = false;
      requestAnimationFrame(() => {
        settle(next);
      });
    };

    const runJump = (from: Side) => {
      if (doneRef.current || busyRef.current) return;

      const to: Side = from === "home" ? "away" : "home";
      const spinDir = from === "home" ? 1 : -1;

      busyRef.current = true;
      armedRef.current = false;
      setJumping(true);

      const startFlight = () => {
        if (doneRef.current) return;

        const start = slotOffset(from, slotsRef.current);
        const end = slotOffset(to, slotsRef.current);
        if (!start || !end) {
          finish(to);
          return;
        }

        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;

        if (reducedMotionRef.current || (deltaX === 0 && deltaY === 0)) {
          finish(to);
          return;
        }

        logo.style.willChange = "transform";
        logo.style.zIndex = "3";
        const started = performance.now();

        const tick = (now: number) => {
          if (doneRef.current) {
            frameRef.current = null;
            return;
          }

          const t = Math.min(1, (now - started) / JUMP_MS);
          const eased = easeOutCubic(t);
          const x = start.x + deltaX * eased;
          const y = start.y + deltaY * eased - ARC_PX * 4 * t * (1 - t);
          const rotate = spinDir * SPINS * 360 * t;
          const { sx, sy } = jumpScale(t);
          logo.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${rotate.toFixed(2)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;

          if (t < 1) {
            frameRef.current = requestAnimationFrame(tick);
            return;
          }
          frameRef.current = null;
          finish(to);
        };

        frameRef.current = requestAnimationFrame(tick);
      };

      requestAnimationFrame(() => requestAnimationFrame(startFlight));
    };

    const onPointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || doneRef.current) return;
      pointerInsideRef.current = true;
      if (!armedRef.current || busyRef.current) return;

      // After 10 jumps, the next hover explodes instead of jumping again.
      if (jumpCountRef.current >= EXPLODE_AFTER && !explodedRef.current) {
        explodedRef.current = true;
        busyRef.current = true;
        armedRef.current = false;
        void explodeAtLanding(sideRef.current);
        return;
      }

      runJump(sideRef.current);
    };

    const onPointerLeave = () => {
      pointerInsideRef.current = false;
      if (!busyRef.current && !doneRef.current) armedRef.current = true;
    };

    logo.addEventListener("pointerenter", onPointerEnter);
    logo.addEventListener("pointerleave", onPointerLeave);

    return () => {
      logo.removeEventListener("pointerenter", onPointerEnter);
      logo.removeEventListener("pointerleave", onPointerLeave);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  return {
    showAwaySlot: !done && (side === "away" || jumping),
    logoMarkStyle: !done ? buildLogoMarkStyle(jumpCount) : undefined,
  };
}
