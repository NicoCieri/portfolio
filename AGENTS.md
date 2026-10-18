# Engineering conventions

## Stack and commands

- Use Next.js App Router, React, strict TypeScript, Tailwind CSS, and npm.
- Keep application code in `src/`; use `@/*` imports for paths under `src/`.
- Reuse the visual tokens in `src/styles/tokens.css`, exposed through Tailwind's theme in `src/app/globals.css`. Prefer Tailwind utilities for layout, spacing, typography, responsive rules, and interaction states. Reserve custom CSS for complex gradients, masks, pseudo-elements, and animations.
- Run `npm install` to install dependencies, or `npm ci` for reproducible installs.
- Run `npm run dev` for local development.
- Run `npm run lint`, `npm run typecheck`, and `npm run build` before handing off changes.
- Commit the npm lockfile when dependencies change. Do not add other package manager lockfiles.

## Rendering and architecture

- Use Server Components by default. Add `"use client"` only at the smallest boundary that needs browser APIs, state, or event handlers.
- Keep components focused on rendering. Extract complex interaction logic, effects, and browser event orchestration into focused custom hooks under `src/hooks/`, named `use-*.ts`. Keep simple local interactions inline when extraction would add no clarity; do not turn pure rendering helpers into hooks.
- Keep ambient cursor lighting isolated in `src/components/ambient-spotlight.tsx`, with its behavior in `src/hooks/use-ambient-spotlight.ts`; retain its static touch/reduced-motion fallback and demand-driven animation frame loop.
- Keep portfolio pages statically prerendered with the standard Next.js build. Build output lives in `.next/`; serve production builds with `npx next start` or a Next.js-compatible host.
- Avoid request-time server features such as cookies, request headers, Server Actions, and runtime API routes. Generate all dynamic route paths at build time.
- Keep page content and metadata available in the generated HTML. Add accurate page titles and descriptions; configure canonical URLs when a real production domain is known.
- Prefer direct, readable code. Introduce abstractions only when a concrete need justifies them.

## Future Arena module

- Do not install React Konva, canvas tooling, animation libraries, shadcn/ui, or other UI dependencies until a feature requires them.
- Keep Arena implementation and dependencies isolated from portfolio layouts and shared components.
- Load Arena through a dedicated Client Component boundary using a dynamic import. Use `ssr: false` inside that boundary for browser-only canvas code.
- Mount Arena only on its own route or after explicit user interaction, so its code is absent from the initial portfolio bundle.
- Provide an accessible HTML loading state and an equivalent textual explanation or controls for canvas interactions.

## Quality

- Prioritize semantic HTML, keyboard access, visible focus indicators, sufficient contrast, and descriptive alternative text.
- Respect reduced-motion preferences when motion is introduced.
- Keep client JavaScript and dependencies small. Prefer system or locally hosted fonts and avoid unnecessary third-party requests.
- Preserve existing files and Git history. Never commit secrets or generated build output.
- Verify changed behavior with focused checks; avoid unnecessary test infrastructure for simple static content.
- Confirm the build reports portfolio routes as static and that `.next/server/app/index.html` contains the homepage content.
