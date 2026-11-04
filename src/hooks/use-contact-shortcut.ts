"use client";

import { useEffect, useState } from "react";

export function useContactShortcut() {
  const [contactVisible, setContactVisible] = useState(false);
  useEffect(() => {
    const section = document.getElementById("contact");
    const content = section?.querySelector<HTMLElement>("[data-contact-content]");
    const firstInput = section?.querySelector<HTMLInputElement>("#contact-name");
    const focusTarget = firstInput ?? section?.querySelector<HTMLElement>("#contact-heading");
    if (!section || !content || !focusTarget) return;

    const observer = new IntersectionObserver(([entry]) => setContactVisible(entry.isIntersecting));
    observer.observe(section);

    function navigate(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href="#contact"]') : null;
      if (!link || (link.target && link.target !== "_self") || !content || !focusTarget) return;
      event.preventDefault();
      // Measure the visible card rather than the section's outer spacing.
      const cardTop = window.scrollY + content.getBoundingClientRect().top;
      const focusOffset = Math.min(160, window.innerHeight * 0.25);
      const top = Math.max(0, cardTop - 24, firstInput ? window.scrollY + firstInput.getBoundingClientRect().top - focusOffset : 0);
      if (window.location.hash !== "#contact") window.history.pushState(window.history.state, "", "#contact");
      focusTarget.focus({ preventScroll: true });
      // Long smooth jumps linger in the preceding sticky demos.
      const instant = Math.abs(top - window.scrollY) > window.innerHeight * 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: instant ? "instant" : "smooth" });
    }

    document.addEventListener("click", navigate);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", navigate);
    };
  }, []);

  return contactVisible;
}
