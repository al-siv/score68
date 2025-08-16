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
- [ ] Initialize git repo & initial commit
- [ ] Create public GitHub repo & push (`al-siv/score68`)
- [ ] Tag v0.1.0 and push tag

### Output (dates sum to 68)
2022: 24.02 23.03 22.04 21.05 20.06 19.07 18.08 17.09 16.10 15.11 14.12
2023: 24.01 23.02 22.03 21.04 20.05 19.06 18.07 17.08 16.09 15.10 14.11 13.12
2024: 23.01 22.02 21.03 20.04 19.05 18.06 17.07 16.08 15.09 14.10 13.11 12.12
2025: 22.01 21.02 20.03 19.04 18.05 17.06 16.07 15.08 14.09 13.10 12.11 11.12
2026: 21.01 20.02 19.03 18.04 17.05 16.06 15.07 14.08 13.09 12.10 11.11 10.12
