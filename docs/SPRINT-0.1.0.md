# Sprint 0.1.0


## Assignment A01

- [x] M01 FP-First Agent Engineering (subset: minimal FP example script) – deliver pure script & checklist
- [x] Define requirement & range (24.02.2022–31.12.2026) (§4.1 objective)
- [x] Select archetype: Feature implementation (§6.6 #1)
- [x] Initialize `package.json` with script entry (`dates:68`) (§5 branch init simulated in single workspace session)
- [x] Implement pure computation script `scripts/dates68.js` (F2 pure core; effect limited to console output)
- [x] Enhance output: grouping + intro text
- [x] Add README description & package.json description
- [x] Run script and capture output (see below list) (gates §7/§8 minimal)
- [x] Spot-check sample: 24.02.2022 => 24 + 2 + 20 + 22 = 68 (contract check F7)
- [x] Review formatting / purity (F1–F4) (no mutation beyond local loop var)
- [x] Initialize git repo & initial commit
- [x] Create public GitHub repo & push (`al-siv/score68`)
- [x] Tag v0.1.0 and push tag
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

## Assignment A02
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

## Assignment A03
- [x] Create branch `sprint-0.1.0-A03-2025-08-16`
- [x] Implement CLI help (-h/--help) with name/version/repository
- [x] Support custom target sum argument
- [x] Apply modulo 100 rule to numerology sum
- [x] Add repository metadata
- [x] Add flexible date range flags (`--range` explicit or `-y/--years` last N years)
- [x] Add formatted banner with app metadata and parameters
- [x] Identify enhancements: help output, custom target, modulo rule, repository field, range flags, banner, statistics line
- [x] Define range flag syntax: `--range YYYY-MM-DD:YYYY-MM-DD`; mutually exclusive with `-y/--years N`
- [x] Implement custom target positional arg (done earlier in A02 extension)
- [x] Implement help option with name/version/repo (added in A03)
- [x] Add modulo 100 rule to `numerologySum` and adjust header
- [x] Add repository field to `package.json`
- [x] Implement `--range` parsing overriding default constants
- [x] Implement `-y/--years` dynamic last N years range
- [x] Add banner output (label right-aligned, values left-aligned) with: Utility, Version, Repository, Target, Range
- [x] Add total statistics line at end (total dates matching target)
- [x] Extend CLI tests for help output (name/version/repo)
- [x] Add tests for `--range` custom span & `-y` years
- [x] Test conflicting flags error (both provided)
- [x] Test total statistics line & range alias -r
- [x] README updates documenting new flags, banner, statistics line
- [x] Commit changes on main (hash 1aa64df) (tests green locally) – retroactive PR skipped (single-developer flow) (§5 exception documented)

Status notes: A03 fully completed on main (hash 1aa64df). PR step intentionally skipped due to single-author repository; future assignments will use branch workflow for traceability.
