"use client";

import { Button } from "@/components/button";

import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createContactSchema, type ContactValues } from "@/lib/contact-form";
import { useTranslations } from "@/hooks/use-translations";

const controlClass = "min-h-12 w-full rounded-2xl border border-control bg-background/40 px-4 py-3 text-body text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--focus-ring) aria-invalid:border-accent aria-invalid:outline-accent disabled:opacity-60";
const inputClass = `mt-2 ${controlClass}`;
const labelClass = "block text-small font-semibold";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-2 text-small font-medium text-accent">{message}</p> : null;
}

export function ContactForm({ endpoint }: { endpoint?: string }) {
  const t = useTranslations();
  const f = t.contact.form;
  const schema = useMemo(() => createContactSchema(f.reasons, f.errors), [f.reasons, f.errors]);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactValues>({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  return (
    <form
      action={endpoint}
      method="POST"
      noValidate
      aria-label={f.aria}
      aria-describedby="contact-privacy contact-delivery"
      onSubmit={handleSubmit((values, event) => {
        if (!endpoint || !(event?.target instanceof HTMLFormElement)) return;
        const form = event.target;
        // Send through Formspree’s hosted flow so its CAPTCHA stays enabled.
        // Apply Yup’s trimmed values before the native POST.
        for (const [name, value] of Object.entries(values)) {
          const field = form.elements.namedItem(name);
          if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) field.value = value;
        }
        HTMLFormElement.prototype.submit.call(form);
      })}
    >
      <p className="mb-6 text-small text-secondary">{f.requiredNote}</p>
      <input type="hidden" name="_subject" value={f.subject} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">{f.honeypotLabel}</label>
        <input id="contact-website" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 min-[601px]:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="contact-name">{f.name}</label>
          <input {...register("name")} className={inputClass} id="contact-name" autoComplete="name" required maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-error" : undefined} />
          <FieldError id="contact-name-error" message={errors.name?.message} />
        </div>
        <div>
          <label className={labelClass} htmlFor="contact-email">{f.email}</label>
          <input {...register("email")} className={inputClass} id="contact-email" type="email" autoComplete="email" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-error" : undefined} />
          <FieldError id="contact-email-error" message={errors.email?.message} />
        </div>
        <div className="min-[601px]:col-span-2">
          <label className={labelClass} htmlFor="contact-company">{f.companyLabel}<span className="font-normal text-secondary">{f.companyOptional}</span></label>
          <input {...register("company")} className={inputClass} id="contact-company" autoComplete="organization" maxLength={150} aria-invalid={!!errors.company} aria-describedby={errors.company ? "contact-company-error" : undefined} />
          <FieldError id="contact-company-error" message={errors.company?.message} />
        </div>
        <div className="min-[601px]:col-span-2">
          <label className={labelClass} htmlFor="contact-reason">{f.reasonLabel}</label>
          <div className="relative mt-2">
            <select {...register("reason")} className={`${controlClass} appearance-none bg-surface pr-12`} id="contact-reason" defaultValue="" required aria-invalid={!!errors.reason} aria-describedby={errors.reason ? "contact-reason-error" : undefined}>
              <option value="" disabled>{f.reasonPlaceholder}</option>
              {f.reasons.map((reason) => <option key={reason} value={reason}>{reason}</option>)}
            </select>
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute inset-y-0 right-4 my-auto size-5 text-muted">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
          <FieldError id="contact-reason-error" message={errors.reason?.message} />
        </div>
        <div className="min-[601px]:col-span-2">
          <label className={labelClass} htmlFor="contact-message">{f.messageLabel}</label>
          <p className="mt-1 text-small text-secondary" id="contact-message-hint">{f.messageHint}</p>
          <textarea {...register("message")} className={`${inputClass} min-h-40 resize-y`} id="contact-message" rows={5} required minLength={20} maxLength={5000} aria-invalid={!!errors.message} aria-describedby={`contact-message-hint${errors.message ? " contact-message-error" : ""}`} />
          <FieldError id="contact-message-error" message={errors.message?.message} />
        </div>
      </div>
      <p className="mt-5 text-small leading-relaxed text-secondary" id="contact-privacy">{f.privacy}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={!endpoint || isSubmitting}>
          {isSubmitting ? f.submitting : f.submit}
        </Button>
        <p id="contact-delivery" className="max-w-[35ch] text-small text-secondary" role="status">
          {endpoint ? f.deliveryReady : f.deliveryUnavailable}
        </p>
      </div>
      <noscript><p className="mt-4 text-small text-secondary">{endpoint ? f.noscriptReady : f.noscriptUnavailable}</p></noscript>
    </form>
  );
}
