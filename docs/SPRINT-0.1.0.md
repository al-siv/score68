# Sprint 0.1.0

Assignment A00: Date numerology listing (feature implementation archetype per §6.6 #1)
Scope: Implement script to list all dates between 24.02.2022 and 31.12.2026 whose D + M + YY(first pair) + YY(second pair) = 68.

## Milestones
- [x] M01 FP-First Agent Engineering (subset: minimal FP example script) – deliver pure script & checklist

## Phases & Checklist (Plan → Build → Verify → Polish → Merge)
### Plan
- [x] Define requirement & range (24.02.2022–31.12.2026) (§4.1 objective)
- [x] Select archetype: Feature implementation (§6.6 #1)
### Build
- [x] Initialize `package.json` with script entry (`dates:68`) (§5 branch init simulated in single workspace session)
- [x] Implement pure computation script `scripts/dates68.js` (F2 pure core; effect limited to console output)
- [x] Enhance output: grouping + intro text
- [x] Add README description & package.json description
### Verify
- [x] Run script and capture output (see below list) (gates §7/§8 minimal)
- [x] Spot-check sample: 24.02.2022 => 24 + 2 + 20 + 22 = 68 (contract check F7)
### Polish
- [x] Review formatting / purity (F1–F4) (no mutation beyond local loop var)
### Merge / Publish
- [x] Initialize git repo & initial commit
- [x] Create public GitHub repo & push (`al-siv/score68`)
- [x] Tag v0.1.0 and push tag

### Output (dates sum to 68)
2022: 24.02 23.03 22.04 21.05 20.06 19.07 18.08 17.09 16.10 15.11 14.12
2023: 24.01 23.02 22.03 21.04 20.05 19.06 18.07 17.08 16.09 15.10 14.11 13.12
2024: 23.01 22.02 21.03 20.04 19.05 18.06 17.07 16.08 15.09 14.10 13.11 12.12
2025: 22.01 21.02 20.03 19.04 18.05 17.06 16.07 15.08 14.09 13.10 12.11 11.12
2026: 21.01 20.02 19.03 18.04 17.05 16.06 15.07 14.08 13.09 12.10 11.11 10.12

---

Assignment A01: Modularization & Tests (feature + quality upgrade)
Scope: Extract pure module, add tests, license, and README programmatic usage.

### Checklist A01
- [x] Create branch `sprint-0.1.0-A01-2025-08-16` (branch policy §5)
- [x] Extract pure module `src/dates68.js` (F2)
- [x] Refactor CLI to use module (thin shell F3)
- [x] Add tests `test/dates68.test.js` (F11 property-ish example set)
- [x] Add test script to `package.json`
- [x] Add LICENSE (CC0)
- [x] Update README with programmatic usage & test docs
- [x] Run tests locally (green)
- [x] Commit & push branch A01 (379cc4d)
- [x] Open PR #1
- [x] Merge PR #1 into main (fast-forward to 0be4f5e) and delete branch

---

Assignment A02: Range extension & helper refactor
Scope: Extend start date to 01.01.2022, eliminate hardcoded header literals, extract grouping/formatting helpers into pure module, update tests and sprint docs.

### Checklist A02
- [x] Create branch `sprint-0.1.0-A02-2025-08-16`
- [x] Update START_DATE to 2022-01-01 in `src/dates68.js`
- [x] Adjust CLI header to use constants (dynamic range + target) instead of hardcoded text
- [x] Add helper functions `groupDatesByYear`, `formatDateDM`, `formatDateFull`, `formatHeader` (pure, exported)
- [x] Refactor `cli.js` to thin shell (F3) using helpers
- [x] Update tests to cover helpers & new constant range
- [x] Correct expected year counts to uniform 12 per year (2022–2026)
- [x] Run tests (green)
- [x] Update README sample to reflect inclusive January 25 date and clarify 12-per-year pattern
- [x] Commit & push final A02 changes (39caa83) – PR opening skipped (direct merge path)
 - [x] Merge branch into main via --no-ff (merge commit 771dae6)

---

Assignment A03: Help, modulo rule, dynamic target, range & banner enhancements
Scope: (1) Add CLI help (-h/--help) with name/version/repository, (2) support custom target sum argument, (3) apply modulo 100 rule to numerology sum, (4) add repository metadata, (5) add flexible date range flags (`--range` explicit or `-y/--years` last N years), (6) add formatted banner with app metadata and parameters.

### Checklist A03
Plan
- [x] Identify enhancements: help output, custom target, modulo rule, repository field, range flags, banner, statistics line
- [x] Define range flag syntax: `--range YYYY-MM-DD:YYYY-MM-DD`; mutually exclusive with `-y/--years N`
Build
- [x] Implement custom target positional arg (done earlier in A02 extension)
- [x] Implement help option with name/version/repo (added in A03)
- [x] Add modulo 100 rule to `numerologySum` and adjust header
- [x] Add repository field to `package.json`
- [x] Implement `--range` parsing overriding default constants
- [x] Implement `-y/--years` dynamic last N years range
- [x] Add banner output (label right-aligned, values left-aligned) with: Utility, Version, Repository, Target, Range
- [x] Add total statistics line at end (total dates matching target)
Verify
- [x] Extend CLI tests for help output (name/version/repo)
- [x] Add tests for `--range` custom span & `-y` years
- [x] Test conflicting flags error (both provided)
- [x] Test total statistics line & range alias -r
Polish
- [x] README updates documenting new flags, banner, statistics line
Merge
- [ ] Commit, open PR, ensure tests green, update sprint doc with final state (pending PR formalization)

Status notes: All A03 implementation tasks completed on main; formal PR step pending if required for process compliance.
