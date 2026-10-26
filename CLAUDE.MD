# Slidev Presentation — Good Things Come to Those Who @defer

## Project
Slidev deck for the talk "Good Things Come to Those Who @defer" by Giorgio Galassi.
Migrated from Canva (design `DAGfjZIBW5I`) on 2026-10-26; one slide per Canva page, same order, except where a code sequence is merged into one
Shiki Magic Move slide (Canva pages 8–13).

## Stack
- Slidev, Vue 3, UnoCSS, Shiki

## Conventions
- All slide content lives in `slides.md`; do not split across files unless asked
- Speaker notes go in `<!-- -->` blocks at the bottom of each slide (Italian, verbatim from Canva)
- Pixel-art scenes are full-slide images in `public/` (`layout: image`, referenced as `/name.png`;
  `public/` is served as-is, so the paths survive `slidev build`); they carry the original
  LinkedIn handle, so those slides set `footer: false`
- A code sequence that grows block by block is one slide with a ````md magic-move```` fence (one step
  per click); speaker notes for each step follow a `[click]` marker
- Code-only slides use `layout: center`, which sizes code for the room (`styles/index.css`)

## Colour and contrast
- Colours come from CSS variables in `styles/index.css` (`--accent`, `--muted-text`), tuned to WCAG AA.
  Never hard-code a hex colour for text; use the variables.
- Code themes are set in `setup/shiki.ts`. Slidev follows the system colour scheme, so both themes must stay readable.

## Rules
- Never modify slide text or speaker notes unless explicitly asked
- Always preserve the `---` slide separators exactly
- If a layout change breaks a slide visually, report it before applying

## Commands
- `npm run dev` · `npm run build` · `npm run export` · `npm run export-dark`
