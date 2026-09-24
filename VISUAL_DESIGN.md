# Visual design language

## Direction

Editorial minimalism, contemporary Japanese watercolor, and abstract Roman bas-relief form one coherent visual language. The site should feel quiet, cultured, tactile, intelligent, timeless, and slightly poetic: a contemporary art book that happens to be a research portfolio. Generous negative space and precise typography provide the structure; pigment and carved fragments provide atmosphere.

The supplied landing-page mockup is a styling reference only. Simone Conia’s actual biography, research, publications, experience, and contact information remain the content source. Do not introduce the mockup’s identity, copy, projects, or claims.

## Paper, color, and type

Use a single warm ivory theme with a barely perceptible paper texture. Depth comes from translucent pigment and shallow carved detail. Keep the palette desaturated and allow untouched paper to dominate.

| Color | Value | Role |
| --- | --- | --- |
| Ivory | `#F5F2EB` | Paper and negative space |
| Charcoal | `#282C2B` | Primary text and filled capsules |
| Stone | `#D8D2C7` | Fine rules and relief tones |
| Blue-gray | `#657B82` | Watercolor and restrained data accents |
| Sage | `#818A79` | Botanical marks and subtle highlights |
| Terracotta | `#AD8068` | Small decorative touches |

Pale accents are decorative, not default text colors. Use darker variants where necessary for WCAG AA text contrast. The implementation tokens live in `css/styles.css`.

Pair Cormorant Garamond headings with Source Serif 4 body text for a quiet, book-like reading texture. Keep Inter for navigation, compact labels, and metadata. Large serif headings use tight leading and deliberate line breaks; small uppercase labels use generous tracking. Keep paragraphs comfortably readable, with clear hierarchy between titles, authors, dates, and descriptions. Avoid ornate Roman display fonts.

## Composition

Use a generous, approximately 1200px desktop grid, large margins, open horizontal sections, and hairline separators. Asymmetry belongs in the composition and artwork; core text remains precisely aligned. Publications and experience are editorial rows rather than cards. Buttons are charcoal or outlined capsules with small arrows.

The hero fills at least the first viewport, with text on the left and a modest portrait near the center of the right half. Mirrored distant architecture reaches inward from the left while abstract relief frames the right edge. The portrait keeps its pale imperfect circle and watercolor gestures, now with a soft radial fade. Keep the portrait separate from decorative layers so its identity and readability survive artwork changes. On short screens, allow the hero to grow beyond the viewport rather than compressing its content. On mobile, text precedes the portrait; ornament gets smaller and quieter.

## Artwork: the approved refinements

**Fine detail matters.** Favor intricate carved lines, fine pigment granulation, botanical hairlines, translucent overlaps, dry-brush fibers, and feathery capillary blooms. Detail should reward a closer look while the overall silhouette stays calm. Avoid coarse swathes or large undifferentiated stone surfaces.

**Architecture is abstracted.** Use interrupted arch moldings, slender fluting, cropped capitals, acanthus networks, rosettes, and geometric wall fragments. Break, overlap, and crop them so they suggest material and rhythm rather than an intact historical building. Distant structures should feel indistinct and atmospheric.

**Stone and pigment interpenetrate.** Watercolor runs through carved lines, erodes their edges, and lets them dissolve into paper. Botanical gestures can emerge from relief. Avoid a hard boundary between a stone photograph and a separate painted decoration.

The balance deliberately changes by context:

- **Portrait backdrop:** predominantly Japanese watercolor, approximately 85–90% in emphasis, with 10–15% faint Roman echoes. These are art-direction proportions, not opacity values. Fine botanical brushwork and pigment carry the composition; pale arches, fluting, and rosette traces appear through the washes. Keep the face area quiet and concentrate detail around the perimeter.
- **Section backgrounds:** Roman carving is more prominent, softened by Japanese watercolor at the edges. Preserve ivory-on-ivory depth and fine detail without heavy shadows. The approved family varies the object and viewing distance: a pillar capital beside About, an intricate wall beside Publications, and distant architecture at Contact. The original refined relief frames the hero and supplies the small medallions.

Vary scale, crop, placement, and opacity rather than repeating one ornament everywhere. Let fragments extend outside section edges. Blend raster boundaries into the paper with feathered masks and restrained opacity; no visible image rectangles or seams. Keep decoration clear of important text and controls. Mobile uses quieter crops, not the full desktop composition squeezed smaller.

## Navigation

Treat navigation as a book’s running header: a small typographic “sc.” signature, serif identity, and numbered section links. Keep the ivory surface seamless at page load, with a hairline separator appearing after scrolling. Use fine sage rules for the current section. On mobile, an Index control reveals a two-column table of contents with visible section numbers; preserve Escape, keyboard focus, and the visible no-JavaScript fallback. Avoid capsule navigation, heavy header borders, or an additional call-to-action competing with the hero.

## Watercolor interactions

Watercolor motion is disabled for now. Keep artwork, section accents, and biography highlights static and visible immediately. Unmasked underlines, capsule fills, and row accents may change instantly on hover or keyboard focus, without animated spreading, click blooms, or entrance reveals. Preserve visible focus and reduced-motion support. Effects must never intercept input.

## Guardrails for future revisions

Avoid saturated colors, glassmorphism, visible digital gradients, heavy shadows, dense card grids, literal ruins everywhere, and a collage of unrelated cultural symbols. Transparency masks may feather image edges; they should not read as decorative gradients.

Keep text in HTML and decorations separate, with empty alternative text and no pointer interaction. Use optimized responsive artwork, preserve portrait alpha, reserve image dimensions, and lazy-load lower-page images. Keep only artwork used by the site; document retained assets and generation prompts in [the artwork inventory](assets/artwork/README.md).

Review visual changes at desktop, tablet, and mobile sizes. A successful revision keeps the portrait and research content primary, reveals fine material detail on closer inspection, and feels like one continuous paper surface.
