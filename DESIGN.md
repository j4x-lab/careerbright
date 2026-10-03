# Design System: Career SuperBright

Authoritative visual contract for `apps/web`. The tokens below are the ones
actually implemented in `src/app/globals.css` — this document describes the
system as built, not as originally planned. When code and this file disagree,
the code wins and this file is the thing that gets corrected.

## 1. Visual Theme & Atmosphere

A working instrument, not a brochure. The product sells proof of skill, so the
interface has to look like it was built by people who have done the job:
quiet paper surfaces, cobalt used like ink on a stamp, hairline rules instead
of stacked cards, and numbers that are allowed to be specific.

- **Density 4** (daily-app balanced) — dashboards may go to 6, marketing stays at 3–4.
- **Variance 8** (offset asymmetric) — split heroes, ledgers, bento. No centered bands, no symmetric 3-up.
- **Motion 6** (fluid CSS) — spring easing on interaction, short reveals on scroll, nothing that loops for decoration.

The mood is a well-lit studio at 9am: paper-white, sharp, unhurried, faintly
technical. Mono type carries metadata so the eye can tell data from prose at a
glance.

## 2. Color Palette & Roles

One accent: cobalt. Amber is a **state** colour, not a second brand accent — it
is reserved for highest-intent action and warnings, never body text.

| Token | Hex | Role |
| --- | --- | --- |
| **Paper** | `#F6F7F9` | Page canvas. Every route sits on this. |
| **Card White** | `#ffffff` | Raised surface: cards, table bodies, inputs. |
| **Cream** | `#e9edf2` | Recessed wells, chips, scrollbar track. |
| **Navy Ink** | `#0a1128` | Body text. Navy-tinted, never pure black, so text carries the brand hue. |
| **Slate Soft** | `#344054` | Secondary prose, descriptions. |
| **Muted Steel** | `#5b6b82` | Metadata, labels, timestamps. |
| **Faint** | `#5f6f86` | Least-important text, legal line. |
| **Hairline** | `rgba(10,17,40,0.10)` | 1px structural lines. The primary separator. |
| **Cobalt 700** | `#1D4ED8` | **The accent.** Primary CTA, links, active nav, focus ring. |
| **Cobalt 800** | `#172554` | Primary hover. |
| **Cobalt 900** | `#1E3A8A` | Deep hover/focus. |
| **Cobalt 600** | `#2563EB` | Borders, focus rings. |
| **Cobalt 100 / 50** | `#DBEAFE` / `#EFF6FF` | Tints, row hover, info backgrounds. |
| **Signal Amber** | `#f59e0b` | Highest-intent CTA fill only. |
| **Signal Amber Strong** | `#b45309` | Amber *text* on light — the AA-compliant text shade. |
| **Signal Soft** | `#fffbeb` | Amber warning tint. |
| **Ok Green** | `#047857` / bg `#ecfdf5` | Verified, valid, passed. |
| **Danger Red** | `#dc2626` / bg `#fef2f2` | Errors, destructive confirmation. |

Surfaces never invert: paper → card → paper-inset. The cobalt panel in the final
CTA is the one deliberate exception, and it inverts only to white-on-cobalt.

## 3. Typography Rules

- **Display — Space Grotesk Variable** (`--font-nova`, self-hosted). Headlines and
  stat figures only. Track-tight (`-0.02em` to `-0.035em`), weight 700. Scale is
  `clamp()`-driven, never a fixed jump: display `clamp(2.25rem, 5vw, 4rem)`,
  section heads `32px → 40px`.
- **Body — Plus Jakarta Sans** (400–800, self-hosted). Relaxed leading 1.6–1.7,
  measure capped at **65ch**. Hierarchy comes from weight and colour before size.
- **Mono — Roboto Mono Variable**. Every number that represents a value gets it:
  `.tnum` for tabular figures, uppercase `letter-spacing: 0.18–0.22em` for labels
  and eyebrows, credential codes, slugs, timestamps.
- **Banned:** `Inter`. Banned in this product: serif of any kind, including
  distinctive ones — this is a tool, not an editorial, and the dashboard
  constraint forbids serifs outright.

## 4. Component Stylings

* **Buttons** — Flat fills, no outer glow. Shape lock: 14px radius. Primary is
  cobalt-700; the single highest-intent action on a page may be amber. Ghost is
  a 1px hairline. Active state is a real tactile push: `scale(0.98) translateY(1px)`.
  Icon affordances live in a 32px "island" chip that nudges 2px on hover.
  Minimum target 44px (52px for hero CTAs).
* **Cards** — 24px radius, white on paper, one whisper shadow
  (`0 24px 64px -32px rgba(10,17,40,0.22)`) tinted to the background hue. Cards
  signal elevation and hierarchy only. Where content is a list, use a border-top
  rule or nothing at all — **never a card per row.**
* **Chips** — Full pill, hairline border, 13px. Capability tags, not badges.
* **Inputs** — Label above in 14px semibold, helper text optional, error below
  and announced. 12px radius. Focus: cobalt border + a 3px cobalt-600 halo at
  15%. No floating labels.
* **Tables / ledgers** — Hairline row separators, no zebra. Numbers mono and
  right-aligned. A ledger row is `number · title · body` on a 12-column grid
  (`2 / 4 / 6`) — this replaces card grids throughout.
* **Empty states** — A composed inline SVG that shows the *shape* of what belongs
  in the slot (`components/empty-state.tsx`), plus one line on what to do next.
  Never a bare "No data" and never a dashed box with centred text.
* **Loaders** — Skeletal shimmer matching final layout dimensions.
* **Photos** — Always through `.photo-cine` (bottom scrim) with a `.photo-cap`
  caption bar naming the subject and the source. Never text on a bare image.
  Indonesian-specific subjects, real workplaces, people-first, faces visible.

## 5. Layout Principles

- CSS Grid for all structure. No flexbox percentage math, no `calc()` hacks.
- Containment `max-w-7xl` (1280px) for content, `max-w-6xl` for the floating nav.
- **Asymmetry is the default.** Split heroes (5/7), ledgers, 7/5 bento with one
  dominant figure. The banned patterns: centred hero above the fold, and the
  generic "three equal cards in a row" feature block.
- Nothing overlaps. No absolutely-positioned content stacked over other content;
  an absolutely-positioned element may only decorate an isolated box. This is why
  the hero photo sits in its own inline block rather than behind the headline.
- Section gaps `py-20 md:py-32`; sticky-header clearance is uniformly
  `scroll-mt-32` on every anchor target.
- Full-height surfaces use `min-h-[100dvh]`, never `h-screen`.
- Dashboard shells: fixed left rail ≥1024px, single column below.

## 6. Motion & Interaction

- **Spring easing** `cubic-bezier(0.32, 0.72, 0, 1)` on every interactive
  transition; `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) for entrances.
  Nothing uses `linear`.
- **Staggered orchestration.** Lists never mount at once: `Reveal` takes a `delay`,
  the hero cascades `--enter-1…5`, the mobile menu items cascade off `--i`.
- **Fail-safe motion.** Entrance animations use `backwards` fill and never zero
  the element's own opacity, so if an animation is suppressed the content is
  still readable. Content must never depend on motion to become visible.
- **Perpetual loops only where they carry meaning:** the live dot on an active
  session, the role marquee, progress bars growing to their value. Nothing loops
  for decoration.
- Animate `transform` and `opacity` only. Never `top`, `left`, `width`, `height`.
- `will-change` only while an element is actually animating, never at rest.
- Auto-playing motion over 5s must be pausable (WCAG 2.2.2): the marquee pauses
  on hover and focus.
- `prefers-reduced-motion` collapses each animation onto its **authored rest
  frame** — not to zero duration. Progress bars must still read full value; the
  marquee must still show its content.

## 7. Anti-Patterns (Banned)

- No emojis anywhere.
- No `Inter`. No serif. No generic system font as a deliberate choice.
- No pure black `#000000`. Ink is `#0a1128`.
- No neon or outer-glow shadows, no purple/blue neon gradients, no gradient text
  on large headers.
- No oversaturated accents. One accent (cobalt) plus amber as a state colour.
- No centred hero for a project at this variance.
- No 3-equal-card feature rows, no card-per-row lists.
- No overlapping elements.
- No custom mouse cursors.
- No AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen".
  Indonesian copy must be concrete — real roles, real SKKNI codes, real figures.
- No filler UI text: "Scroll to explore", "Swipe down", scroll arrows, bouncing
  chevrons.
- No fake round numbers (`99.99%`, `50%`). Every statistic carries its source and
  vintage (Kemnaker 2025, Jobstreet 2026, SNBT 2026, NACE Winter 2026).
- No dangling footnotes or roadmap phases leaking to end users.
- No generic placeholder names ("John Doe", "Acme"). No fabricated testimonials.
- No broken remote images. Self-host under `public/images`; if a remote source is
  unavoidable, the ID must be verified before it is referenced.
- No English role names or capability chips leaking onto the Indonesian pages —
  every user-visible string is bilingual by dictionary, not hardcoded.
- No developer-facing text in the UI: no route patterns, no env var names, no
  internal phase numbers, no raw enum values.