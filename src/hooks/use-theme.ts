"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  function syncStorage(event: StorageEvent) {
    if (event.key !== "portfolio-theme" && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    onChange();
  }
  window.addEventListener("storage", syncStorage);
  window.addEventListener("portfolio-theme-change", onChange);
  return () => {
    window.removeEventListener("storage", syncStorage);
    window.removeEventListener("portfolio-theme-change", onChange);
  };
}

function getSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

export function useTheme() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, () => false);

  function toggleTheme() {
    const theme = getSnapshot() ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The switch still works when browser storage is unavailable.
    }
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }

  return { isDark, toggleTheme };
}
