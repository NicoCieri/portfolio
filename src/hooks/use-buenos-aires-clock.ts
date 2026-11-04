"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import type { Locale } from "@/i18n/config";

const TIME_ZONE = "America/Argentina/Buenos_Aires";

function formatParts(date: Date, locale: Locale) {
  const parts = new Intl.DateTimeFormat(locale === "es" ? "es-AR" : "en-US", {
    timeZone: TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  return {
    hour: parts.find((part) => part.type === "hour")?.value ?? "00",
    minute: parts.find((part) => part.type === "minute")?.value ?? "00",
    dayPeriod: parts.find((part) => part.type === "dayPeriod")?.value ?? "",
    dateTime: `${new Intl.DateTimeFormat("en-GB", {
      timeZone: TIME_ZONE,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).format(date)}-03:00`,
  };
}

export function useBuenosAiresClock() {
  const { locale } = useLocale();
  const [date, setDate] = useState<Date | null>(null);
  const [colonOn, setColonOn] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 700px)");
    let timeout: number | null = null;

    function tick() {
      const now = new Date();
      setDate(now);
      setColonOn(motion.matches || now.getSeconds() % 2 === 0);
      // Mobile uses a static separator and only needs a refresh each minute.
      const interval = motion.matches ? 60_000 : 1000;
      timeout = window.setTimeout(tick, interval - (now.getTime() % interval));
    }

    function onMotionChange() {
      if (timeout !== null) window.clearTimeout(timeout);
      tick();
    }

    tick();
    motion.addEventListener("change", onMotionChange);

    return () => {
      if (timeout !== null) window.clearTimeout(timeout);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return { time: date ? formatParts(date, locale) : null, colonOn };
}
