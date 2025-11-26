# Scripts Agent (moneybrand-site)

Role: automation standards for import/validation tooling under `scripts/`; keep runs deterministic, safe, and aligned with repo commands.

## Shell/Bash
- Use `set -euo pipefail` and `IFS=$'\n\t'`; fail fast and log minimal, non-sensitive context.
- Prefer `bash` over `sh`; keep scripts idempotent and workspace-relative (assume repo root).
- Validate inputs and required env vars; never echo secrets.

## Node/TypeScript
- Use ESM (repo is `"type": "module"`); prefer TypeScript or modern JS with top-level await.
- Reuse shared helpers; avoid hardcoding paths—derive via `path.resolve(process.cwd(), ...)`.
- Respect package manager: use `npm run <task>`; do not introduce pnpm/yarn wrappers.

## Quality & Execution
- Lint/build gate: ensure `npm run lint`, `npm run build`, and `npm run validate:assets` stay green after changes.
- For new scripts, add a `package.json` script entry or document the command; keep CLI UX predictable with `--help`.
- Handle failures with clear exit codes and actionable messages; no swallowing errors.
