# Decisions, the ledger re-costume (2026-09-08)

One line of reason per major decision (impeccable build-ledger § 6). A technique with no line here
is absent from the build on purpose.

- **Colour:** one hue (ledger green, OKLCH h≈155) at varied lightness; the ground is barely-green
  ruled paper because accounting ledger paper is green, and a single hue keeps every accent in one
  family. Navy was rejected as the reflex finance colour; warm paper + oxblood as the AR-70 default.
- **Nav:** N1b, wordmark left, the six section shortcuts in the middle (Eric asked for shortcuts at
  the top), résumé and theme right; under 64rem the shortcuts open a sheet. The current section is
  the one accent in the bar.
- **Layout:** editorial long-form as a ruled statement; every hairline carries a row of data, so
  the reader parses the page the way they parse a set of accounts.
- **Typography:** Libre Caslon Display for display (the face of 18th-century financial and legal
  printing) and Public Sans for body (Franklin lineage, institutional, tabular figures); two
  families, two self-hosted files, metric-matched fallbacks measured against the real woff2.
- **Spacing:** 4-pt scale; section beats at `clamp(4.5rem, 6vw + 2rem, 8rem)`; row padding 12 px so
  ledgers stay dense and sections stay separate.
- **Cards:** none; the previous glass cards were the AI tell, and rows with rules carry the same
  information with less chrome.
- **Icons and illustration:** lucide only where an action needs a glyph (theme toggle, lightbox
  controls, the CTA arrow); the portrait and the dashboard captures are the imagery; a hand-built
  two-ring seal is the wordmark.
- **Motion:** M2; one transform-only hero rise (the LCP never sits at opacity 0), reveal-once on
  section entry, no parallax, cursor-follow, tilt or count-ups (Caslon's digits are proportional,
  so counting would jitter). Framer Motion and GSAP were removed: CSS transitions plus one
  IntersectionObserver hook cover the whole dial. The reveal fires the moment a section's top
  edge enters (threshold 0): a ratio scaled the wait with the section's height, so tall sections
  sat blank until a slice of them had scrolled in.
- **Scrolling:** the browser's own. Lenis wheel smoothing was removed on 2026-09-08: its
  main-thread loop made smoothness device-dependent and left a 0.9 s drift after the wheel
  stopped (KNOWLEDGE-124), and this page has no scroll choreography that would need synced
  position. Anchors glide through `scroll-behavior: smooth` (off under reduced motion) and land
  under the fixed nav through `scroll-padding-top`.
- **Theme:** system, light by default in effect (a printed report read in daylight); dark is the
  same ledger in ink and is contrast-checked separately.
- **Prerender:** the home route is rendered to HTML at build time and hydrated, because an empty
  SPA root cannot paint before its bundle on slow 4G (Lighthouse mobile 89 before, see the gate
  after). Lazy section chunks and `content-visibility` were dropped with it: the document height is
  stable from first paint and the WebKit ResizeObserver churn disappears.
- **Load order:** the one stylesheet is inlined into the HTML (6 KB gzipped, the only
  render-blocking request) and the bundle is appended on the `load` event, so the portrait and the
  two faces own the connection until the first screen is drawn. Anchors, the résumé link and every
  word work before hydration; the theme toggle, the Sections sheet and the lightbox activate a
  moment later on slow links. The reveal gate is armed by the bundle itself (`main.tsx`), never
  from the head, because until the bundle runs nothing can un-hide a section: armed early, a
  reader who scrolled ahead of it on slow 4G saw blank sections for two seconds.
- **Portrait resolution:** the only source is the 305 px paste, cropped to 264 px. On 2x screens
  the browser upscales it; Lighthouse flags this under best practices. A 600 px original from Eric
  fixes it with no code change (re-run `scripts/build-og-image.mjs` after replacing the files).
- **Shadows, gradients, glass, glow, badges, feature cards:** absent.
- **Logo-swap test:** swap the seal and the name and the page still reads as this person's
  ledger; the ruled grammar, the sourced figures and the portrait carry it.
