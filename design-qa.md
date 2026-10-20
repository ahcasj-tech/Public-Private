# Design QA — 2026-10-20

final result: passed

## Scope and visual evidence

Reviewed the owner's two supplied JPEG references against the implementation in a single comparison image: `D:/文件/作品集/output/website-redesign/reference-comparison.jpg`.

Reference files are `496886df4ad021ebf4522c3c5027a95a.jpg` and `7aa4c07075ffe7f83a82d9c040ddb4dc.jpg`, supplied in the conversation. Adaptation preserves their white background, generous whitespace, centered black hero, tilted image fan and pale rounded horizontal cards. Real portfolio artwork replaces the reference books and city icons. This is a visual-direction adaptation, not a pixel-identical clone of unrelated content.

Screenshots in `D:/文件/作品集/output/website-redesign/`:
- `desktop-hero.png`, `desktop-works.png`, `desktop-gallery.png`: 1440 × 1000.
- `mobile-hero.png`, `mobile-works.png`, `mobile-gallery.png`: 390 × 844.
- `tablet-gallery.png`, `tablet-contact.png`: 768 × 1024.

Images remain contained and legible; galleries do not crop poster lettering. The mobile hero intentionally clips peripheral fan cards, while every series remains accessible in the collection. No document-level horizontal overflow was found in the inspected mobile views. Tablet detail columns remain readable; phone details stack and scroll.

## Functional verification

- Hero CTA and header anchors navigate to sections.
- Horizontal collection arrow advances the rail and updates disabled states.
- Photography filter returns one series; graphic design returns two; ceramics returns one.
- Photography detail lists all 25 thumbnails; selecting the final photo shows 25/25 and disables next.
- Left arrow keyboard navigation changes photo 25 to 24. Escape closes the dialog and returns focus to the opening card.
- Work / process tabs update descriptions. Large-image links reference the selected original WebP.
- Mobile graphic poster detail retains the complete artwork and exposes image controls.
- Email copy shows the success state.
- No browser console warnings/errors observed in the preview.
- Vite GitHub Pages production build succeeded.

## Motion verification boundary

Entrance, fan unfolding, gentle floating, hover feedback, dialog appearance and section reveal are implemented in CSS/React. The available browser reports `prefers-reduced-motion: reduce`; computed animation styles correctly resolve to `none`, and the layout remains complete. Static screenshots and reduced-motion behavior were directly checked. Normal-motion timing was reviewed in source; it was not visually exercised under a different device preference. The device preference was not changed.
