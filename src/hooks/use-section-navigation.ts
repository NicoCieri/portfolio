"use client";

import { useEffect, useState } from "react";
import { portfolioSections, type PortfolioSectionId } from "@/content/section-navigation";

const HOME_SECTION_ID = "about";
// `#work` wraps the first project; once that scene is current the URL uses its own id.
const WORK_ALIAS_ID = "work";

function replaceUrlHash(sectionId: string | null) {
  const nextHash = sectionId ? `#${sectionId}` : "";
  if (window.location.hash === nextHash) return;
  const base = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState(window.history.state, "", `${base}${nextHash}`);
}

export function useSectionNavigation() {
  const [navigation, setNavigation] = useState<{ visible: boolean; activeId: PortfolioSectionId; pendingId: PortfolioSectionId | null }>({
    visible: false,
    activeId: "ticketing",
    pendingId: null,
  });

  useEffect(() => {
    const sections = portfolioSections.flatMap(({ id }) => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });
    if (!sections.length) return;

    const about = document.getElementById(HOME_SECTION_ID);
    const urlSections = about ? [{ id: HOME_SECTION_ID, element: about }, ...sections] : sections;
    const heldSectionIds = new Set<string>([HOME_SECTION_ID, WORK_ALIAS_ID, ...sections.map(({ id }) => id)]);
    // A load or history traversal keeps its hash until that target is on screen.
    let heldHash: string | null = window.location.hash || null;
    let frame = 0;

    function currentUrlSection(readingLine: number, atPageEnd: boolean) {
      let urlSectionId: string | null = null;
      for (const section of urlSections) {
        if (section.element.getBoundingClientRect().top <= readingLine) urlSectionId = section.id;
      }
      if (atPageEnd) urlSectionId = sections[sections.length - 1].id;
      // The untouched top of the page stays a clean URL; scrolling into the intro uses #about.
      if (urlSectionId === HOME_SECTION_ID && window.scrollY <= 8) return null;
      return urlSectionId;
    }

    function releaseHeldHash(urlSectionId: string | null) {
      if (heldHash === null) return true;
      const heldId = heldHash.slice(1);
      // Back to a URL without a hash: wait until the viewport is actually at the top.
      if (heldId === "") {
        if (window.scrollY <= 8) heldHash = null;
        return heldHash === null;
      }
      const arrived = urlSectionId === heldId || (heldId === WORK_ALIAS_ID && urlSectionId === sections[0].id);
      if (arrived || !heldSectionIds.has(heldId) || !document.getElementById(heldId)) heldHash = null;
      return heldHash === null;
    }

    function releaseHold() {
      heldHash = null;
    }

    function update() {
      frame = 0;
      // The rail starts only after Ticketing reaches the top of the viewport.
      const visible = sections[0].element.getBoundingClientRect().top <= 1;
      const readingLine = window.innerHeight * 0.35;
      let activeId = sections[0].id;
      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= readingLine) activeId = section.id;
      }
      // Short final sections may never reach the reading line.
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atPageEnd) activeId = sections[sections.length - 1].id;
      setNavigation((current) => {
        const pendingId = current.pendingId === activeId ? null : current.pendingId;
        return current.visible === visible && current.activeId === activeId && current.pendingId === pendingId ? current : { visible, activeId, pendingId };
      });

      const urlSectionId = currentUrlSection(readingLine, atPageEnd);
      // replaceState mirrors the section in the URL without a history entry per frame.
      if (releaseHeldHash(urlSectionId)) replaceUrlHash(urlSectionId);
    }

    function scheduleUpdate() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    function clearPending() {
      setNavigation((current) => current.pendingId ? { ...current, pendingId: null } : current);
    }

    function handleScrollIntent() {
      releaseHold();
      clearPending();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape"].includes(event.key)) handleScrollIntent();
    }

    function handlePopState() {
      heldHash = window.location.hash;
      scheduleUpdate();
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("pageshow", scheduleUpdate);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("wheel", handleScrollIntent, { passive: true });
    window.addEventListener("touchstart", handleScrollIntent, { passive: true });
    window.addEventListener("pointerdown", handleScrollIntent);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scrollend", clearPending);
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("pageshow", scheduleUpdate);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("wheel", handleScrollIntent);
      window.removeEventListener("touchstart", handleScrollIntent);
      window.removeEventListener("pointerdown", handleScrollIntent);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scrollend", clearPending);
      resizeObserver.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  function selectSection(id: PortfolioSectionId) {
    setNavigation((current) => ({ ...current, pendingId: current.activeId === id ? null : id }));
  }

  return { ...navigation, selectSection };
}
