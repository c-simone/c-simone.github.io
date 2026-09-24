# Repository guidance

Static personal research portfolio: semantic HTML, CSS, and vanilla JavaScript ES modules. No package manager or build step is required. Keep this architecture unless the task calls for a change.

## Task-specific references

- For visual or artwork changes, use [VISUAL_DESIGN.md](VISUAL_DESIGN.md). Preserve the watercolor-dominant portrait backdrop and the more Roman section ornaments.
- For artwork replacement or cleanup, use [the asset inventory](assets/artwork/README.md). Check HTML `src`, `srcset`, preloads, and CSS URLs before deleting assets; retain only used variants and update the inventory.
- For local setup and file responsibilities, see [README.md](README.md).

## Important invariants

- Preserve factual content, publication links, section IDs, metadata, and the original `assets/profile_pic.jpeg` unless the task explicitly changes them. Reference mockups supply style, not copy or identities.
- Citation data lives in `js/config.js`; mirror data changes in the no-JavaScript chart, summary, and accessible label in `index.html`.
- Keep content readable without JavaScript. Preserve keyboard navigation, visible focus, reduced-motion support, and decorative images with empty alt text and no pointer interception.
- Pushing to `main` publishes through GitHub Pages. Local edits and previews do not require deployment.

## Commands and verification

- Preview: `python3 -m http.server 8080 --bind 127.0.0.1`.
- Basic checks: `bash build.sh check` and `git diff --check`. HTML validation is skipped when HTML5-compatible Tidy is unavailable; these checks do not replace browser inspection.
- For layout or artwork changes, inspect affected sections at 1440, 1024, 768, 390, and 320px; check overflow, text contrast, and image loading. Scroll to lazy-loaded artwork before treating an unloaded image as broken.
- For interaction changes, check keyboard/mobile navigation, Escape, anchors, reduced motion, and no-JavaScript fallbacks. Report checks actually performed and any limitations.
