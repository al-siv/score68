# DESIGN.md — UI/UX Specification

## 1. Visual Identity

### 1.1 Design Philosophy

Minimalist, data-focused tool. No chrome, no distractions — the dates are the
hero. Inspired by native system utilities (Calculator, Calendar). Every pixel
earns its place.

**Cross-platform by design**: single Vue 3 renderer that works identically in
Electron (desktop) and Capacitor (mobile). Platform detection is CSS-only; no
component forks.

### 1.2 Color Palette

#### Light Theme

| Token                | Value       | Usage                          |
| -------------------- | ----------- | ------------------------------ |
| `--color-bg`         | `#FAFAFA`   | Window background              |
| `--color-surface`    | `#FFFFFF`   | Cards, inputs, panels          |
| `--color-border`     | `#E0E0E0`   | Dividers, input borders        |
| `--color-text`       | `#1A1A1A`   | Primary text                   |
| `--color-text-dim`   | `#757575`   | Year labels, secondary info    |
| `--color-accent`     | `#2563EB`   | Today highlight, active states |
| `--color-accent-bg`  | `#DBEAFE`   | Today row background           |
| `--color-hover`      | `#F5F5F5`   | Row hover / tap-highlight      |
| `--color-copy-bg`    | `#16A34A`   | Copy button idle               |
| `--color-copy-hover` | `#15803D`   | Copy button hover              |
| `--color-error`      | `#DC2626`   | Validation error flash         |

#### Dark Theme

| Token                | Value       | Usage                          |
| -------------------- | ----------- | ------------------------------ |
| `--color-bg`         | `#0F0F0F`   | Window background              |
| `--color-surface`    | `#1A1A1A`   | Cards, inputs, panels          |
| `--color-border`     | `#2A2A2A`   | Dividers, input borders        |
| `--color-text`       | `#E8E8E8`   | Primary text                   |
| `--color-text-dim`   | `#888888`   | Year labels, secondary info    |
| `--color-accent`     | `#3B82F6`   | Today highlight, active states |
| `--color-accent-bg`  | `#1E3A5F`   | Today row background           |
| `--color-hover`      | `#222222`   | Row hover / tap-highlight      |
| `--color-copy-bg`    | `#22C55E`   | Copy button idle               |
| `--color-copy-hover` | `#16A34A`   | Copy button hover              |
| `--color-error`      | `#EF4444`   | Validation error flash         |

### 1.3 Typography

| Role          | Font                              | Size  | Weight | Line-height |
| ------------- | --------------------------------- | ----- | ------ | ----------- |
| Body          | System font stack (see below)     | 14px  | 400    | 1.5         |
| Year heading  | System font stack                 | 13px  | 600    | 1.0         |
| Date item     | `"SF Mono", "Cascadia Code", "JetBrains Mono", "Fira Code", monospace` | 13px | 400 | 1.0 |
| Input         | System font stack                 | 16px  | 400    | 1.0         |
| Button        | System font stack                 | 13px  | 500    | 1.0         |
| Info label    | System font stack                 | 12px  | 400    | 1.0         |

System font stack:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans",
  Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
```

### 1.4 Spacing Scale

Base unit: **4px**.

| Token     | Value | Usage                                  |
| --------- | ----- | -------------------------------------- |
| `--sp-1`  | 4px   | Tight gaps inside components           |
| `--sp-2`  | 8px   | Default inner padding                  |
| `--sp-3`  | 12px  | Component padding, list item gaps      |
| `--sp-4`  | 16px  | Section gaps, input padding            |
| `--sp-5`  | 20px  | Header inner padding                   |
| `--sp-6`  | 24px  | Panel outer padding                    |
| `--sp-8`  | 32px  | Major section separation               |

### 1.5 Border Radius

| Token         | Value | Usage                |
| ------------- | ----- | -------------------- |
| `--radius-sm` | 4px   | Inputs, buttons      |
| `--radius-md` | 6px   | Cards, panels        |
| `--radius-lg` | 8px   | Modals (if any)      |

### 1.6 Shadows (light theme only — dark theme uses borders)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
```

---

## 2. Platform Targets

| Platform   | Runtime      | Window / View                        | Input       |
| ---------- | ------------ | ------------------------------------ | ----------- |
| macOS      | Electron     | Native window, hidden title bar      | Mouse + KB  |
| Windows    | Electron     | Native window                        | Mouse + KB  |
| Linux      | Electron     | Native window                        | Mouse + KB  |
| iOS        | Capacitor    | Full-screen WKWebView                | Touch       |
| Android    | Capacitor    | Full-screen WebView                  | Touch       |

**One renderer, two shells.** The Vue app is platform-agnostic; Electron and
Capacitor are thin wrappers. Platform-specific CSS via media queries and
Capacitor's CSS custom properties (`--ion-*` overrides).

---

## 3. Responsive Breakpoints

| Name       | Width        | Target devices            | Layout variant |
| ---------- | ------------ | ------------------------- | -------------- |
| `xs`       | 0–374px      | Small phones (SE, older)  | Compact        |
| `sm`       | 375–479px    | Standard phones           | Mobile         |
| `md`       | 480–767px    | Large phones, small tabs  | Mobile         |
| `lg`       | 768–1023px   | Tablets                   | Tablet         |
| `xl`       | 1024px+      | Desktop (Electron)        | Desktop        |

```css
@media (max-width: 479px)   { /* mobile */ }
@media (min-width: 480px) and (max-width: 767px) { /* large phone */ }
@media (min-width: 768px)   { /* tablet+ */ }
@media (min-width: 1024px)  { /* desktop */ }
```

---

## 4. Window Configuration (Electron)

| Property             | Value                                     |
| -------------------- | ----------------------------------------- |
| Default size         | 420 × 680 (portrait-oriented)            |
| Minimum size         | 340 × 480                                |
| Resizable            | Yes                                       |
| Title bar            | `titleBarStyle: 'hidden'` on macOS, default on Win/Linux |
| Background           | `--color-bg` (themed)                     |
| DevTools             | Available via keyboard shortcut only      |
| Auto-open DevTools   | Dev mode only                             |

---

## 5. Layout — Component Tree

### 5.1 Desktop / Tablet (≥ 768px)

```
┌─────────────────────────────────────────────────────────┐
│  <AppHeader />                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ score68        [TargetInput]    🌐  🌙            │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  <InfoPanel />                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │  Formula  •  Today: 25  •  Range info             │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  <DateList />                                           │
│  ┌───────────────────────────────────────────────────┐  │
│  │  ┌ <DateGroup year="2026"> ────────────────────┐  │  │
│  │  │  2026                                      │  │  │
│  │  │  25.01  24.02  23.03  22.04  21.05  20.06  │  │  │
│  │  │  19.07  18.08  17.09  16.10  15.11  14.12  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌ <DateGroup year="2025"> ────────────────────┐  │  │
│  │  │  ...                                       │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ┌ <DateGroup year="2026"> ★ TODAY ───────────┐  │  │
│  │  │  25.01  24.02  23.03  ...  ← highlighted    │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │  ...                                            │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  <ActionBar />                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │  [📋 Copy dates]                    N matches     │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### 5.2 Mobile (< 480px)

```
┌───────────────────────────┐
│  <AppHeader />            │
│  ┌───────────────────────┐│
│  │ score68  [25]  🌐 🌙 ││  ← compact: name+input+btns
│  └───────────────────────┘│
│                           │
│  <InfoPanel />            │
│  ┌───────────────────────┐│
│  │ Today: 25 • 1826–2076││  ← formula hidden, 1 line
│  └───────────────────────┘│
│                           │
│  <DateList />             │
│  ┌───────────────────────┐│
│  │ 2026                  ││
│  │ 25.01 24.02 23.03     ││  ← chips wrap at 3 per row
│  │ 22.04 21.05 20.06     ││
│  │                       ││
│  │ ★ 2026                ││
│  │ 25.01 24.02 23.03 ... ││
│  │                       ││
│  └───────────────────────┘│
│                           │
│  <ActionBar />            │
│  ┌───────────────────────┐│
│  │ [📋 Copy]    2847     ││  ← shorter label
│  └───────────────────────┘│
└───────────────────────────┘
     ↕ safe-area-inset
```

### 5.3 Layout Strategy

The layout uses **flex column, 100vh** with fixed header/footer and a flex-grow
scrollable middle. This works identically in Electron BrowserWindow and
Capacitor's WebView.

```css
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: 100dvh; /* dynamic viewport height — handles mobile address bar */
}

.app-header  { flex-shrink: 0; }
.info-panel  { flex-shrink: 0; }
.date-list   { flex: 1 1 0; overflow-y: auto; }
.action-bar  { flex-shrink: 0; }
```

---

## 6. Component Specifications

### 6.1 AppHeader

Top bar, full width, fixed. Contains: app name, target input, toggles.

```
Desktop:  │  score68     [__25__]     🌐 EN    🌙  │
Mobile:   │  score68  [25]  🌐 🌙                   │
```

| Property       | Desktop (≥ 480px)         | Mobile (< 480px)               |
| -------------- | ------------------------- | ------------------------------- |
| Height         | 48px                      | 48px                            |
| Padding        | `0 --sp-4`                | `0 --sp-3`                     |
| App name       | Visible, left             | Visible, left, no extra space  |
| Target input   | Centered, 60px wide       | Right of name, 48px wide       |
| Toggles        | Right side, with labels   | Far right, icon-only           |

- Background: `--color-surface`
- Border-bottom: 1px solid `--color-border`
- Layout: flex, space-between, vertically centered

### 6.2 TargetInput

Embedded in AppHeader. Compact numeric input.

- `<input type="number" min="0" max="99" inputmode="numeric">`
  - `inputmode="numeric"` — mobile shows numeric keypad
- Desktop width: 60px; mobile width: 48px; text-align center
- Border: 1px solid `--color-border`; focus: 2px solid `--color-accent`
- Invalid flash: 200ms `--color-error` border, then revert
- On change → recomputes dates + saves to localStorage
- On invalid (empty, <0, >99): reverts to `numerologySum(today)`
- **Mobile**: font-size 16px to prevent iOS zoom on focus

### 6.3 InfoPanel

Compact info strip below header. Does not scroll.

```
Desktop:  (D + M + YY₁ + YY₂) % 100  •  Today: 25  •  1826–2076
Mobile:   Today: 25  •  1826–2076
```

| Property       | Desktop                   | Mobile                     |
| -------------- | ------------------------- | -------------------------- |
| Segments       | Formula + Today + Range   | Today + Range (no formula) |
| Font size      | 12px                      | 11px                       |
| Padding        | `--sp-2 --sp-4`           | `--sp-1 --sp-3`           |
| Height         | auto (~28px)              | auto (~24px)              |

- Background: `--color-surface`
- Color: `--color-text-dim`
- Segments separated by `•`
- Updates reactively when target changes

### 6.4 DateList

Main scrollable area. Contains `<DateGroup>` components (one per year).
Fills all remaining vertical space.

```
┌────────────────────────────────────┐
│  2026                              │  ← year heading
│  25.01  24.02  23.03  22.04  ...  │  ← date chips
│                                    │
│  ★ 2026                           │  ← today's year (highlighted)
│  25.01  24.02  23.03  ...         │  ← today chip: accent
│                                    │
│  ...                               │
└────────────────────────────────────┘
```

- Overflow-y: auto, smooth scroll
- Padding: `--sp-3 --sp-4` (desktop), `--sp-2 --sp-3` (mobile)
- `scroll-behavior: smooth`
- On mount: auto-scrolls to today's year group
- `-webkit-overflow-scrolling: touch` for iOS momentum scroll
- Safe area: `padding-bottom: env(safe-area-inset-bottom)` on mobile

#### DateGroup (sub-component)

Each year is a collapsible-like group:

```
┌──────────────────────────────────────────────────┐
│  2026                                            │  ← heading
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐       │
│  │25.01│ │24.02│ │23.03│ │22.04│ │21.05│ ...    │  ← chips
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘       │
└──────────────────────────────────────────────────┘
```

- Year heading: `--color-text-dim`, weight 600, 13px
- Current year: `★` prefix, `--color-accent` text
- Date chips: inline-flex, flex-wrap
- Gap: `--sp-1` (desktop), `--sp-1` (mobile)
- Group margin-bottom: `--sp-3` (desktop), `--sp-2` (mobile)

#### DateChip (sub-component)

Individual date within a group:

```
┌──────┐
│ 25.01│   ← normal
└──────┘

╔══════╗
║ 25.04║   ← today (accent border + background)
╚══════╝
```

| Property      | Desktop                          | Mobile                           |
| ------------- | -------------------------------- | -------------------------------- |
| Padding       | `--sp-1 --sp-2`                  | `--sp-2 --sp-2` (larger target)  |
| Min size      | none                             | 44×44px (touch target minimum)   |
| Font          | monospace, 13px                  | monospace, 13px                  |
| Border-radius | `--radius-sm`                    | `--radius-sm`                    |
| Hover         | `--color-hover` background       | n/a (touch)                      |
| Active (tap)  | n/a                              | `--color-hover` background       |
| Today         | `--color-accent-bg` + left border| Same, + bold                     |

- **Touch target**: All chips have minimum 44×44px tap area on mobile
  (`min-height: 44px; min-width: 44px` via `@media (hover: none)`)
- **Today's date**: `--color-accent-bg` background, 3px left border
  `--color-accent`, font-weight 600

### 6.5 ActionBar

Bottom strip. Contains copy button + match count. Fixed at bottom.

```
Desktop:  │  [📋 Copy dates]                    Total: 2847   │
Mobile:   │  [📋 Copy]                              2847      │
```

| Property       | Desktop                   | Mobile                     |
| -------------- | ------------------------- | -------------------------- |
| Height         | 44px                      | 48px (+ safe-area bottom)  |
| Copy label     | "Copy dates" / full       | "Copy" / short             |
| Count label    | "Total: N"                | "N"                        |
| Padding        | `0 --sp-4`                | `0 --sp-3`                |

- Background: `--color-surface`
- Border-top: 1px solid `--color-border`
- Layout: flex, space-between, vertically centered
- **Mobile**: `padding-bottom: env(safe-area-inset-bottom)` for home indicator

#### Copy button states

1. **Idle**: "Copy dates" (EN) / "Копировать" (RU) — green background
2. **Copied**: "Copied!" (EN) / "Скопировано!" (RU) — reverts after 1.5s

### 6.6 ThemeToggle

Icon button in header. Emits `toggle` event.

- Light mode: moon icon; dark mode: sun icon
- Desktop: 28×28px click area, icon-only
- Mobile: 36×36px click area (touch-friendly)
- On click: toggles `data-theme` attribute on `<html>`
- Transition: 200ms on all `--color-*` variables

### 6.7 LangToggle

Text button in header. Emits `toggle` event.

- Shows current language: "EN" or "РУ"
- Desktop: 28×28px, font 12px weight 500
- Mobile: 36×36px, font 13px weight 500
- On click: cycles EN → RU → EN
- All labels switch immediately via vue-i18n

---

## 7. Interaction Flows

### 7.1 Initial Load

```
App mounts
  → Detect platform (Electron vs Capacitor via window.Capacitor)
  → Read localStorage (target, lang, theme)
  → If no target: compute numerologySum(today)
  → Apply theme (data-theme on <html>)
  → Apply lang (vue-i18n locale)
  → Compute range [today - 200y, today + 50y]
  → Compute matching dates
  → Render DateList
  → Auto-scroll to today's year group (smooth, centered)
```

### 7.2 Change Target

```
User types new target in TargetInput
  → Validate: 0–99 integer
  → If invalid: revert + red border flash (200ms)
  → If valid:
    → Recompute matching dates (reactive)
    → DateList re-renders
    → Auto-scroll to today's year group
    → Save to localStorage['score68-target']
    → Update InfoPanel
```

### 7.3 Copy to Clipboard

```
User taps [Copy]
  → Format all matching dates as text (see § 12)
  → Clipboard API:
      Desktop: navigator.clipboard.writeText()
      Mobile:  Capacitor Clipboard plugin (fallback to navigator.clipboard)
  → Button → "Copied!" / "Скопировано!"
  → After 1.5s → revert
```

### 7.4 Toggle Theme

```
Tap theme toggle
  → Toggle "light" ↔ "dark"
  → Set document.documentElement.dataset.theme
  → CSS variables update (200ms transition)
  → Save to localStorage['score68-theme']
```

### 7.5 Toggle Language

```
Tap lang toggle
  → Cycle "en" ↔ "ru"
  → vue-i18n global.locale = new locale
  → All {{ t('...') }} re-render
  → Save to localStorage['score68-lang']
```

---

## 8. Scroll Behavior

### 8.1 Auto-Scroll to Today

On initial load and on target change:
1. Find `<DateGroup>` whose year === `today.getFullYear()`
2. `element.scrollIntoView({ behavior: 'smooth', block: 'center' })`
3. Today's `<DateChip>` gets accent highlight

### 8.2 Scroll Performance

~250 years × ~12 dates/year ≈ **~3000 date chips** total.
All rendered (no virtual scroll needed).
`content-visibility: auto` on off-screen `DateGroup` elements.

### 8.3 iOS Momentum Scroll

```css
.date-list {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
}
```

---

## 9. Safe Area & Viewport (Mobile)

```css
html {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  min-height: 100dvh;
}

/* Capacitor injects --ion-safe-area-* or we use env() */
#app {
  padding-top: env(safe-area-inset-top);
  padding-bottom: 0;
}

.action-bar {
  padding-bottom: env(safe-area-inset-bottom, 0);
}
```

Viewport meta in `index.html`:

```html
<meta
  name="viewport"
  content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
```

---

## 10. Animations

| Element         | Animation                              | Duration |
| --------------- | -------------------------------------- | -------- |
| Theme switch    | CSS transition on `--color-*` vars     | 200ms    |
| Copy button     | Text swap                              | instant  |
| Scroll to today | `scroll-behavior: smooth`              | ~500ms   |
| Focus ring      | Border-color transition on input       | 150ms    |
| Date chip hover | Background-color transition (desktop)  | 100ms    |
| Date chip tap   | Background-color (mobile, `:active`)   | instant  |
| Error flash     | Border-color red flash on input        | 200ms    |

All animations CSS-only, no JS animation libraries.

---

## 11. Accessibility

| Feature              | Implementation                                    |
| -------------------- | ------------------------------------------------- |
| Keyboard nav         | Tab order: TargetInput → LangToggle → ThemeToggle → DateList → CopyBtn |
| TargetInput          | `aria-label` via i18n key                         |
| DateList             | `role="list"`, `aria-label` via i18n              |
| DateGroup            | `role="group"`, `aria-label` "Year {N}"           |
| Today highlight      | `aria-current="date"`                             |
| Copy button          | `aria-label` via i18n                             |
| Focus visible        | 2px solid `--color-accent` outline                |
| Touch targets        | Min 44×44px on `@media (hover: none)`             |

---

## 12. i18n Keys

| Key                     | EN                              | RU                                |
| ----------------------- | ------------------------------- | --------------------------------- |
| `app.title`             | score68                         | score68                           |
| `target.label`          | Target                          | Цель                              |
| `target.ariaLabel`      | Target numerology sum           | Целевая сумма нумерологии         |
| `info.formula`          | (D + M + YY₁ + YY₂) % 100     | (Д + М + YY₁ + YY₂) % 100       |
| `info.today`            | Today                           | Сегодня                           |
| `info.range`            | Range                           | Диапазон                          |
| `dates.year`            | Year {year}                     | {year} год                        |
| `dates.today`           | ★ Today                         | ★ Сегодня                         |
| `action.copy`           | Copy dates                      | Копировать даты                   |
| `action.copyShort`      | Copy                            | Копировать                        |
| `action.copied`         | Copied!                         | Скопировано!                      |
| `action.total`          | Total: {count}                  | Всего: {count}                    |
| `theme.light`           | Light                           | Светлая                           |
| `theme.dark`            | Dark                            | Тёмная                            |
| `lang.en`               | EN                              | EN                                |
| `lang.ru`               | РУ                              | РУ                                |
| `empty.title`           | No matching dates               | Нет подходящих дат                |
| `empty.message`         | No dates match target {target}  | Нет дат с суммой {target}         |

---

## 13. Error & Edge States

| State                 | Behavior                                               |
| --------------------- | ------------------------------------------------------ |
| No matching dates     | DateList shows centered empty state with icon + message |
| Target input cleared  | Revert to `numerologySum(today)` after blur           |
| Target > 99           | Clamp to 99 on input                                   |
| Target < 0            | Clamp to 0 on input                                    |
| localStorage fail     | Use defaults (no persistence)                          |
| Clipboard API fail    | Fallback: textarea + select (mobile)                   |
| Offline (Capacitor)   | No effect — all computation is local                   |

### Empty State

```
┌────────────────────────────────┐
│                                │
│          🔍                    │
│   No dates match target 99     │
│   Try a different value        │
│                                │
└────────────────────────────────┘
```

Centered vertically in DateList area. Icon + message from i18n keys.

---

## 14. Clipboard Output Format

```
score68 — Target: 25
Range: 25.04.1826 — 25.04.2076

2026: 25.01 24.02 23.03 22.04 21.05 20.06 19.07 18.08 17.09 16.10 15.11 14.12
2025: 26.01 25.02 24.03 23.04 22.05 21.06 20.07 19.08 18.09 17.10 16.11 15.12
...
Total: 2847
```

Plain text, UTF-8, year-per-line, space-separated dates, trailing summary.

---

## 15. Platform Detection

```typescript
const isMobile = (): boolean =>
  typeof window !== 'undefined' && 'Capacitor' in window;

const isTouch = (): boolean =>
  typeof window !== 'undefined' && matchMedia('(hover: none)').matches;
```

Used sparingly — most adaptations are CSS-only via media queries and
`@media (hover: none)`. JS detection only for clipboard fallback.

---

## 16. Capacitor Integration (Ready)

The project includes Capacitor configuration but does **not** require it for
desktop builds. It's an optional mobile build target.

### Required packages (optional, for mobile builds only)

| Package              | Version | Purpose              |
| -------------------- | ------- | -------------------- |
| `@capacitor/core`    | 7.x     | Core runtime         |
| `@capacitor/cli`     | 7.x     | Build tooling        |
| `@capacitor/clipboard` | 7.x   | Clipboard fallback   |
| `@capacitor/preferences` | 7.x | Storage fallback     |

### capacitor.config.ts (scaffold)

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.score68.app',
  appName: 'score68',
  webDir: 'out/renderer',
  server: {
    androidScheme: 'https',
  },
};

export default config;
```

Mobile builds are triggered separately (`npx cap sync && npx cap open ios`),
not part of the default `npm run build` workflow.
