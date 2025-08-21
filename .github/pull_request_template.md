Title: Sprint {SEMVER} M{N}: <concise scope>

## Summary
High-level what/why (no implementation minutiae). Reference sprint file `sprints/SPRINT-{SEMVER}.md` assignment & milestone IDs.

## Scope
Explicit milestones/phases covered (e.g. A11 M6 Verify, M7 Docs). Out-of-scope items explicitly listed.

## Changes
Terse per path bullets (no repetition of diff):
- path/to/file.rs: short reason (<80 chars)
- docs/CONFIG.md: updated migration / precedence section
Include deletions (removed legacy XYZ) and structural moves.

## Verification
```
cargo fmt --check   # PASS
cargo clippy -- -D warnings  # PASS
cargo test --tests -q  # PASS (N skipped: auth/vector when no creds)
```
Additional: grep checks, size report, any manual smoke notes.

Size report (git diff --stat origin/main...HEAD): attach or paste summary counts.

## Risks
Severity (Low|Med|High) + rationale. Mitigations or N/A.

## Follow-ups
List atomic tasks (A12 next steps, deferred hardening). Each line: owner(optional) – description.

## Autonomous Decisions
≤5 bullets capturing key decisions (tooling, refactors, deferrals) with brief rationale.

## Checklist
- [ ] Sprint version coupling correct (Cargo.toml vs sprint file)
- [ ] Gates green (fmt, clippy, tests)
- [ ] Docs updated & no stale references (grep verified)
- [ ] No deny-list violations (see sprints/GUIDELINES §10)
- [ ] Size report included
- [ ] Follow-ups enumerated

<!-- Keep template minimal & machine-parsable. -->
