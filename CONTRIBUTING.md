# Contributing

This project follows a sprint/assignment model with strict FP & quality gates. Use this guide for submitting and approving pull requests.

## 1. PR Author Workflow
Step-by-step (one assignment branch per PR):
1. Sync main:
   ```bash
   git checkout main && git pull --ff-only origin main
   ```
2. Create assignment branch:
   ```bash
   git checkout -b sprint-<SEMVER>-A<AA>-<YYYY-MM-DD>
   ```
3. Implement in small slices; after each checklist item turns green:
   ```bash
   git add <paths>
   git commit -m "A<AA>: <concise change>"
   ```
4. Keep logic pure & effects isolated (see FP checklist F1–F11 in governance docs).
5. Run verification loop locally:
   ```bash
   npm run verify
   ```
6. Update sprint file `docs/SPRINT-<SEMVER>.md` statuses (never delete items; use [x] / [-]).
7. Rebase & final verify before opening PR:
   ```bash
   git fetch origin && git pull --rebase origin main && npm run verify && git push
   ```
8. Open PR (title: `Sprint <SEMVER> A<AA>: <scope>`) using template; include:
   - Scope & out-of-scope
   - Changes (path bullets)
   - Verification summary (lint/tests pass)
   - Risks + mitigations
   - Follow-ups
   - Autonomous Decisions (≤5)
9. Address review feedback; keep commits focused (no squash until merge).
10. Maintainer performs merge after approval & green checks.

## 2. Maintainer (Repo Admin) Review & Merge Workflow
1. Confirm branch naming compliance.
2. Check sprint file alignment & scope.
3. Validate quality gates (CI build (18.x)/(20.x) green, verify passes).
4. Review diff for purity, deny-list avoidance, scope minimality.
5. Ensure CHANGELOG updated if version bump.
6. Confirm PR template sections filled.
7. Require ≥1 approval (branch protection).
8. Merge sequence:
   ```bash
   git checkout main
   git pull --ff-only origin main
   git merge --no-ff sprint-<SEMVER>-A<AA>-<DATE> -m "merge: sprint <SEMVER> A<AA>"
   git push origin main
   ```
9. Tag if release boundary:
   ```bash
   git tag -a v<SEMVER> -m "score68 <SEMVER>"
   git push origin v<SEMVER>
   ```
10. Branch auto-deletes remotely; delete locally if needed.

## 3. Commit Message Convention
- Slice commit: `A<AA>: <verb> <object>`
- Branch init: `sprint: init A<AA> <short scope>`
- Merge: `merge: sprint <SEMVER> A<AA>`

## 4. Scope & Checklist Discipline
- One assignment per PR.
- Never batch multiple completed checklist items into one commit.
- Use `[-]` with reason instead of deleting scope.

## 5. Quality Gates Summary
`npm run verify` = ESLint + all tests (unit, property, env). All must pass pre-PR & pre-merge.

## 6. Fast Reference (Author)
```bash
git checkout main && git pull --ff-only origin main
git checkout -b sprint-<SEMVER>-A<AA>-<DATE>
# implement slices
npm run verify
git fetch origin && git pull --rebase origin main && npm run verify && git push
# open PR using template
```

## 7. Fast Reference (Maintainer)
```bash
# after approval & green checks
git checkout main && git pull --ff-only origin main
git merge --no-ff sprint-<SEMVER>-A<AA>-<DATE> -m "merge: sprint <SEMVER> A<AA>"
git push origin main
git tag -a v<SEMVER> -m "score68 <SEMVER>" && git push origin v<SEMVER>
```

## 8. Future Enhancements
- CODEOWNERS
- Coverage badge
- Conversation resolution enforcement

---
Questions: open an issue or start a discussion.
