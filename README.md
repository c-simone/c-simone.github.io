# Simone Conia — personal website

A static editorial portfolio built with semantic HTML, CSS, and JavaScript ES modules. Warm ivory paper, original watercolor artwork, and cropped stone relief frame the existing research and professional content.

## Project guides

- [Visual design language](VISUAL_DESIGN.md): composition, artwork balance, typography, and motion, including the refinements agreed during design review.
- [Agent instructions](AGENTS.md): concise repository guidance and validation commands.
- [Artwork inventory and prompts](assets/artwork/README.md): current assets and generation provenance.

## Local preview

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open http://localhost:8080. There is no build step or runtime framework. The existing GitHub Pages workflow remains unchanged; pushing to main publishes the site.

## Files and content

- `index.html`: all biography, publications, experience, contacts, SEO metadata, and accessible citation fallback content.
- `css/styles.css`: typography, responsive layouts, color tokens, artwork composition, and motion.
- `js/config.js`: citation statistics. Mirror updates in the HTML chart and summary so visitors without JavaScript see the same data.
- `js/components.js`: mobile navigation and active section tracking.
- `js/app.js`: progressive enhancement initialization.
- `js/citation-chart.js`: citation bar chart rendering; mirror its output in the HTML fallback when updating data.
- `assets/artwork/`: current optimized WebP artwork, SVG masks, and generation prompts in its README.
- `assets/profile_pic.jpeg`: unchanged original photograph.

The palette is defined in `:root`: paper, ink, stone, blue-gray, sage, and terracotta. Headings use Cormorant Garamond; prose uses Source Serif 4, with Inter for navigation, compact labels, and metadata. Google Fonts is the only third-party presentation dependency; Georgia and Arial provide local fallbacks. The website uses a single light paper theme and does not read stored theme preferences.

## Interaction and accessibility

Watercolor artwork and interface accents are static for now. Hover and keyboard focus states appear immediately, with no entrance animations, click blooms, or scroll-triggered reveals. Hover effects are limited to fine pointers, and `prefers-reduced-motion` disables transitions and smooth scrolling.

The mobile menu supports Escape, accurate expanded state, and normal keyboard navigation. Without JavaScript the navigation remains visible and the citation chart retains its HTML fallback. Native anchors preserve URL hashes and browser navigation. Decorative images have empty alternative text, and decorations cannot intercept input.

## Validation

Review at 1440, 1024, 768, 390, and 320px. Check keyboard focus, mobile menu resizing and Escape, citation labels and values, reduced motion, no-JavaScript behavior, missing-image/font fallback, and existing external link targets. Check for horizontal overflow and console/network errors.

`bash build.sh check` checks required files and JavaScript syntax. HTML validation runs when an HTML5-compatible Tidy is installed; older system Tidy versions are skipped. Browser validation checks visual and interaction behavior.

No deployment is necessary for local review.

## SEO maintenance

The live site is served as static files: edit metadata and JSON-LD directly in `index.html`. `_config.yml` mirrors the title, description, and card type for Jekyll compatibility, but the deployment workflow does not render Jekyll templates.

Keep the canonical URL, Open Graph URL, profile structured data, `sitemap.xml`, and the sitemap directive in `robots.txt` consistent when changing domains. The sitemap lists the single HTML page; section anchors are not separate pages. It deliberately omits `lastmod` so a manually maintained date cannot become stale. Add it only when it can accurately track significant page updates.

Keep the `ProfilePage` / `Person` data aligned with the visible biography, especially employment and social profiles. Social previews use the original 696 × 696 JPEG and a square Twitter summary card; update image dimensions if that asset changes.

After publishing, validate the live URL with [Google's Rich Results Test](https://search.google.com/test/rich-results), then submit `https://c-simone.github.io/sitemap.xml` and request indexing through [Google Search Console](https://search.google.com/search-console). These steps require access to the verified site property. Monitor indexing and search performance there; metadata and structured data do not guarantee rankings or enhanced results.
