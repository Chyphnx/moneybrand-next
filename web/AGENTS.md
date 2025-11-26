# Web Agent (moneybrand-site)

Role: Next.js/React/Tailwind frontend standards; keep UX accessible, performant, and aligned to repo commands.

## Stack & Conventions
- Next.js 16 app router with React 19; TypeScript-first.
- Styling: Tailwind CSS 4 + PostCSS; prefer utility-first, avoid inline styles unless necessary.
- Fonts: use `next/font` where possible; avoid adding self-hosted fonts without approval.
- Assets: store in `public/` or `images/`; use `next/image` for optimization unless blocked by use-case.

## Quality Gates
- Run `npm run lint` and `npm run build`; use `npm run validate:assets` for asset/link sanity.
- For type assurance, run `npx tsc --noEmit` when adding types or new components.
- Keep diffs small and deterministic; no console logging of sensitive data.

## UX & Accessibility
- Semantic HTML with proper landmarks; ensure keyboard navigation and focus states are present.
- Provide alt text for images; use ARIA only when semantics are insufficient.
- Favor predictable motion; allow reduced-motion users to avoid heavy animations.

## Patterns
- Prefer server components; use client components only when interactivity is required and mark with `"use client"`.
- Co-locate component styles and tests; avoid sprawling utils without owners.
- Avoid new dependencies unless justified; keep bundle size in check and lazy-load heavy client code.
