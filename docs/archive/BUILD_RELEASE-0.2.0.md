# Build & Release Guide

Purpose: Repeatable steps to harden, tag, and (optionally) publish `score68`.

## 1. Preconditions
- Assignment branch (e.g. `sprint-0.2.0-A04-YYYY-MM-DD`) pushed.
- Sprint file updated (all completed items except PR merge item).
- `npm run verify` green locally.
- CI workflow green (Node 18 & 20 matrix).

## 2. PR Creation
```bash
git fetch origin
git pull --rebase origin main
npm run verify
git push
```
Open PR with template title: `Sprint 0.2.0 A04: <scope>`.

## 3. Version & Changelog
Confirm `package.json` version matches sprint (0.2.0). If adding changes beyond documented scope, bump PATCH (0.2.1) and append CHANGELOG entry prior to merge.

## 4. Merge Procedure
```bash
git checkout main
git pull --ff-only origin main
git merge --no-ff sprint-0.2.0-A04-YYYY-MM-DD -m "merge: sprint 0.2.0 A04"
git push origin main
git branch -d sprint-0.2.0-A04-YYYY-MM-DD
```

## 5. Tagging
After merge & green CI on main:
```bash
git tag -a v0.2.0 -m "score68 0.2.0"
git push origin v0.2.0
```
Patch release: bump version → update CHANGELOG → tag (v0.2.X).

## 6. Optional Publish
Currently private. To publish:
1. Remove `"private": true`.
2. Add `keywords`, `author` if desired.
3. Dry run: `npm pack --dry-run`.
4. Publish: `npm publish --access public`.

## 7. Post-Release
- Start next assignment (e.g., A05) in new branch.
- Record retrospective notes if scope sizable.

## 8. Pitfalls
- Forgetting rebase before merge.
- Tagging before pushing merge commit.
- Publishing stale build (always run verify).

## 9. Reference Commands
```bash
npm run lint
npm test
npm run verify
```
