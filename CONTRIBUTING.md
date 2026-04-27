# Contributing

## Development Setup

```bash
git clone https://github.com/al-siv/score68.git
cd score68
npm install
npm run dev
```

## Quality Gates

`npm run verify` = lint + typecheck + tests. Must pass before every commit.

| Task              | Command              |
| ----------------- | -------------------- |
| Dev (Electron)    | `npm run dev`        |
| Build             | `npm run build`      |
| Test              | `npm run test`       |
| Test (watch)      | `npm run test:watch` |
| Lint              | `npm run lint`       |
| Format            | `npm run format`     |
| Typecheck         | `npm run typecheck`  |
| Verify            | `npm run verify`     |
| Package           | `npm run package`    |

## Conventions

- TypeScript strict mode, no `any`.
- Vue SFC: `<script setup lang="ts">`.
- Pure functions in `src/shared/` — no Electron APIs, DOM, or side-effects.
- Zod schemas for runtime validation at boundaries.
- TSDoc with `@example`, `@since`, `@throws` on all exports.
- No inline code comments unless explicitly requested.

## Branch Workflow

1. Create branch from main: `git checkout -b feature/short-description`
2. Implement changes in focused commits.
3. Run `npm run verify` locally.
4. Open PR with scope summary and verification status.
5. After review and approval, merge to main.
6. Tag release if version bump: `git tag -a v<X.Y.Z> -m "score68 <X.Y.Z>"`

## Project Documentation

| File           | Purpose                                       |
| -------------- | --------------------------------------------- |
| `AGENTS.md`    | Full project context for AI agents             |
| `SKILLS.md`    | Development workflows and skill patterns       |
| `DESIGN.md`    | UI/UX specification, color tokens, breakpoints |
