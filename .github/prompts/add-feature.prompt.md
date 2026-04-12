---
description: 'Add a new feature to score68 with tests and docs.'
mode: 'agent'
---

# Add Feature

You are adding a feature to the score68 CLI utility.

## Context

- Read `src/dates68.js`, `src/args.js`, `src/env.js`, and `cli.js` to understand current architecture.
- All `src/` code must remain pure (no side-effects).
- `cli.js` is the only impure boundary.

## Steps

1. Identify which module(s) need changes.
2. Implement the feature in the appropriate `src/` module.
3. Wire it into `cli.js` if it affects CLI behavior.
4. Add tests at the smallest sufficient layer (unit > integration).
5. Update `--help` text in `cli.js` if adding flags/args.
6. Run `npm run verify` to confirm lint + tests pass.
7. Summarize changes made.

## Feature request

$input
