# Portfolio

Next.js App Router, React, TypeScript and Tailwind CSS. Portfolio routes are statically prerendered.

```sh
npm install
npm run dev
```

Before handoff: `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.

`npm test` uses Node’s built-in test runner and the existing TypeScript compiler to check scene phases, localized announcements, reduced motion, frame batching, observer cleanup, and remounts. No additional test dependencies are installed.

## Contact

The current release offers direct email and LinkedIn links. The contact form is not mounted. Its component (`src/components/contact/contact-form.tsx`), validation (`src/lib/contact-form.ts`), translations, dependencies, and environment example are preserved for a later iteration.

The fixed Contact link measures the visible card, focuses the heading, and navigates directly across long sticky scenes. It also supports focusing the first form field if the form is restored.

### Restore the form

Import `ContactForm` into `ContactSection`, resolve the public form ID below, render `<ContactForm endpoint={endpoint} />`, and restore the two-column layout if needed. Setting the environment variable alone does not make the form visible.

```ts
const formId = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID?.trim();
const endpoint = formId && /^[a-zA-Z0-9]+$/.test(formId)
  ? `https://formspree.io/f/${formId}`
  : undefined;
```

The following delivery and validation notes apply once the form is restored.

Messages are posted directly to **Formspree** using a native HTML POST after client validation. Formspree handles verification, confirmation and email delivery. This deliberately uses its hosted submission flow rather than an AJAX request, so the default hosted reCAPTCHA can remain enabled without loading a CAPTCHA script on the portfolio. The site needs no runtime API route or private email credentials and continues to prerender statically.

### Enable delivery

1. Create a form at [Formspree](https://formspree.io/), select the inbox where you want to receive inquiries, and verify that address.
2. Keep **Spam protection / reCAPTCHA enabled** in that form’s settings. Keep the provider’s spam filtering enabled too. The form also posts the `_gotcha` honeypot field for server-side filtering.
3. Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_FORMSPREE_FORM_ID` to only the ID from the endpoint, for example `abcdefgh` from `https://formspree.io/f/abcdefgh`. This is a public identifier, not an API key.
4. Set the same environment variable on your production host **before building**, then rebuild/redeploy. Static pages capture this value at build time.
5. If available on your plan, restrict submissions to your real production domain through Formspree’s **Restrict to Domain** setting. Check your plan’s submission quota and notification settings before launch.
6. Submit one real inquiry from the deployed site. Complete the hosted verification, confirm receipt in your inbox and Formspree dashboard, and verify that replying addresses the sender. Also check your spam folder.

With no valid form ID, the form explains that delivery is unavailable and disables sending. No success is displayed locally: only the receiving provider confirms a submission. No account has been provisioned or delivery verified by this repository.

### Validation and abuse protection

- Yup checks required fields, email format, allowed inquiry reasons, trimmed text and length limits; React Hook Form associates inline errors with each field and focuses the first invalid field on submit.
- Client validation is for usability and can be bypassed. Server-side spam filtering, CAPTCHA and domain restrictions belong to Formspree and must be configured there. No frontend mechanism guarantees zero spam.
- The hidden `_gotcha` field is submitted to the provider; it is excluded from keyboard and assistive-technology navigation.
- Without JavaScript, a configured form still posts through the same hosted verification flow. Provider validation and abuse controls remain necessary.
- No file attachments, marketing opt-in or automatic reply emails are enabled. The form includes a short disclosure that Formspree processes the inquiry.

References: [hosted reCAPTCHA](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings/), [honeypot filtering](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering), [spam protection](https://help.formspree.io/articles/troubleshooting/how-to-prevent-spam/).


## Shared device frames

`DeviceMonitor` and `DevicePhone` in `src/components/devices/` own the bezel, corners, screen clipping and physical details for every illustrated device. Scene components supply the screen content and placement rather than rebuilding frames.

- Both accept `className`, `screenClassName` and standard div attributes for scene placement, responsive screen layout and inherited token overrides.
- `DeviceMonitor` defaults to a 16:10 screen. Use `aspectRatio` for a different screen ratio or `"auto"` for content-driven height; `showStand` controls the stand. Map and editor screens use `screenClassName="max-[700px]:aspect-auto"` to keep their controls and maps readable on small screens.
- `DevicePhone` defaults to a 1:2.05 body. Its props include `aspectRatio`, `screenBackground`, `transparent`, `showCamera` and `showHomeIndicator`. The ticket scanner uses `transparent` to preserve its see-through viewfinder; fixed-coordinate commerce screens provide their own ratios.
- Width and composition remain local to each scene. Borders, radii and device colors stay in the shared frames and existing design tokens.

## Scene architecture

Each demo hook defines its phases, coordinates, CSS variables, and localized announcements. `useScrollScene` owns their shared browser lifecycle: passive scroll events, one pending animation frame, visibility/resize observers, reduced-motion changes, and cleanup. Setup callbacks are memoized; translated scenes reinitialize at the current scroll position when the language changes.

## SEO and languages

Production origin: `https://nicocieri.dev`. English is prerendered at `/` and Spanish at `/es`, with the matching HTML `lang`, localized descriptions, canonical URLs, and reciprocal `hreflang` links. The language selector navigates to those documents; local storage does not override a shared URL's language. Separate root layouts share `RootDocument` and the same `HomePage` composition.

`src/lib/site.ts` centralizes public identity and metadata. Each page includes factual `ProfilePage`/`Person` JSON-LD. The static sitemap lists both language URLs. There are no request-time locale dependencies.

Brand assets live in `public/`: favicon, Apple touch icon, and `images/social-card.png` (1200×630). SVG sources are preserved. Regenerate them with `node scripts/generate-brand-assets.mjs`, which reuses Next.js's Sharp dependency.

After deployment, verify the domain in Google Search Console, submit `/sitemap.xml`, and check the indexed pages. DNS, domain verification and hosting redirects are deployment settings and are not applied by this repository.

## Accessibility

The shared button uses contrast-checked text colors for normal, hover, and pressed states. The skip link is the first keyboard destination. Contact navigation moves focus to its heading, and the seat demo moves focus to its confirmation after Continue. Offscreen demos mute their live announcements.

Reduced-motion users and compact viewports (height ≤600px or width ≤359px) receive the final illustrative scene state in normal document flow, with the Continue action still available for the seat demo. This avoids trapping text in a small sticky viewport at high zoom. The cursor spotlight retains its static touch/reduced-motion fallback.

Automated tests cover scene lifecycles, localized phases, compact/reduced-motion changes, metadata and token contrast. Manual checks should also include keyboard focus, 320px reflow, zoom, both themes, and screen-reader behavior; automated checks do not establish complete WCAG conformance.
