# moneybrand-site Agent (CHYPHNX/CPX)

Role: repo-level profile for Next.js web app; enforce GX-13 standards, security, and reality-aligned commands.

## Stack & Scope
- Next.js 16 (app dir) with React 19, TypeScript, Tailwind CSS 4, PostCSS; entry lives at repo root.
- Package manager: npm (lockfile present). Do not mix pnpm/yarn.
- Assets live under `public/` and `images/`; data/import helpers under `data/` and `scripts/`.

## Commands (run before ship)
- `npm install` to sync deps.
- `npm run lint` for ESLint.
- `npm run build` (webpack flag already set).
- `npm run validate:assets` for asset/import sanity.
- `npm run validate:all` to chain lint + build + assets.
- No `npm test` or `npm run typecheck` defined; use `npx tsc --noEmit` if you add TS types or need a one-off check.

## Coding Standards
- TypeScript-first for app code; keep components deterministic and accessible (semantic HTML, ARIA where needed).
- Follow Next.js app router conventions; colocate UI in `src/` or app-root as established.
- No secrets in code, configs, or logs; use env vars and guard client/server boundaries.
- Small, atomic diffs with clear intent; prefer automation/scripts over manual runbooks.

## Testing & Quality Gates
- If logic changes, add/adjust tests or lint/build hooks to cover it; do not silence failures.
- Use repo-native commands above; document any gaps or follow-ups if something cannot be fixed immediately.

## Git & Change Discipline
- One concern per patch; suggest commits as `feat|fix|chore|refactor|docs(scope): summary`.
- Maintain backward compatibility and minimize operational/security risk; surface risks/tradeoffs and next-best improvements.
