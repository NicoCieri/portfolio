"use client";

import { Button } from "@/components/button";

import { useContactShortcut } from "@/hooks/use-contact-shortcut";
import { useTranslations } from "@/hooks/use-translations";


const dockClass =
  "pointer-events-none fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-40 size-0 min-[701px]:right-6 min-[701px]:bottom-6";

function scrollToTop() {
  if (window.location.hash) {
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}`);
  }
  // Instant jump: smooth scrolling stalls visually on the tall sticky work/AI scenes.
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  root.scrollTop = 0;
  document.body.scrollTop = 0;
  root.style.scrollBehavior = previousBehavior;
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
}

export function ContactShortcut() {
  const hideContact = useContactShortcut();
  const t = useTranslations();
  const showBackToTop = hideContact;

  return (
    <div className={dockClass}>
      <Button
        href="#contact"
        data-state={hideContact ? "hidden" : "visible"}
        aria-hidden={hideContact}
        inert={hideContact}
        tabIndex={hideContact ? -1 : undefined}
        aria-label={t.common.contactAria}
        className="pointer-events-auto absolute right-0 bottom-0 origin-bottom-right max-[700px]:size-12 max-[700px]:gap-0 max-[700px]:p-0"
      >
        <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-(--pop-ink)/[0.07] transition-[rotate,translate,background-color] duration-300 ease-out group-hover/action:bg-(--pop-ink)/[0.12] motion-safe:group-hover/action:-translate-y-0.5 motion-safe:group-hover/action:-rotate-12 motion-safe:group-focus-visible/action:-rotate-12">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>
        </span>
        <span className="hidden min-[701px]:inline">{t.common.contact}</span>
      </Button>
      <Button size="icon"
        type="button"
        data-state={showBackToTop ? "visible" : "hidden"}
        aria-hidden={!showBackToTop}
        inert={!showBackToTop}
        tabIndex={showBackToTop ? undefined : -1}
        aria-label={t.common.backToTop}
        className="pointer-events-auto absolute right-0 bottom-0 size-12 origin-bottom-right"
        onClick={scrollToTop}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5">
          <path d="M12 20V4m-6 6 6-6 6 6" />
        </svg>
      </Button>
    </div>
  );
}
