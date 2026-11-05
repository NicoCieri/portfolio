"use client";

import { Button } from "@/components/button";
import { ArgentinaFlag } from "@/components/argentina-flag";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "@/hooks/use-translations";

export function SiteFooter() {
  const t = useTranslations();
  return (
    <footer id="site-footer" className="page-shell hidden py-6 min-[701px]:block">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-meta text-secondary">
        <p className="inline-flex items-center gap-1.5">
          {t.footer.location}
          <ArgentinaFlag className="h-[0.95em] w-auto" />
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="ghost" size="icon"
            href="https://www.linkedin.com/in/nicolas-cieri-salcedo-6b37bb97/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.footer.linkedinAria}
            className="focus-visible:text-accent"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
            </svg>
          </Button>
          <LanguageSelector scrollToBottomOnChange />
        </div>
      </div>
    </footer>
  );
}
