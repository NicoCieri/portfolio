"use client";

import { Button } from "@/components/button";
import { SectionAtmosphere } from "@/components/section-atmosphere";
import { useTranslations } from "@/hooks/use-translations";

export function ContactSection() {
  const t = useTranslations();

  return (
    <section id="contact" aria-labelledby="contact-heading" className="[view-timeline-name:--section-atmosphere] [view-timeline-axis:block] page-shell scroll-mt-8 py-10 min-[701px]:py-16">
      <div data-contact-content className="relative isolate mx-auto max-w-3xl overflow-hidden rounded-[32px] border border-foreground/10 bg-surface p-6 min-[701px]:rounded-[40px] min-[701px]:p-12">
        <SectionAtmosphere tone="pink" />
        <div>
          <div>
            <p className="text-small font-medium text-secondary">{t.contact.eyebrow}</p>
            <h2 id="contact-heading" tabIndex={-1} className="mt-4 max-w-[17ch] rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--focus-ring) text-[clamp(32px,4.5vw,58px)] leading-[1.08] font-bold tracking-[-0.045em]">{t.contact.heading}</h2>
            <p className="mt-6 max-w-[52ch] text-body leading-relaxed text-secondary">{t.contact.body}</p>
            <ul className="mt-8 space-y-4 text-small text-secondary">
              {t.contact.points.map((point) => <li key={point} className="flex gap-3"><span className="text-accent" aria-hidden="true">↗</span>{point}</li>)}
            </ul>
            <div className="mt-6 border-t border-border pt-5">
              <div className="flex flex-wrap gap-3">
                <Button href="mailto:ncierisalcedo@gmail.com" target="_blank" rel="noopener noreferrer" variant="outline" size="md">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0">
                    <rect x="3" y="5" width="18" height="14" rx="3" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  {t.contact.emailDirectly}
                </Button>
                <Button
                  href="https://www.linkedin.com/in/nicolas-cieri-salcedo-6b37bb97/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline" size="md"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0Z" />
                  </svg>
                  {t.contact.form.linkedinContact}
                  <span className="sr-only">{t.contact.form.linkedinNewTab}</span>
                </Button>
              </div>
            </div>
            <p className="mt-8 border-t border-border pt-5 text-small text-secondary">{t.contact.location}</p>
          </div>
          {/* ContactForm is preserved in contact-form.tsx for the next iteration. */}
        </div>
      </div>
    </section>
  );
}
