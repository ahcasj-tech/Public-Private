# Design QA — FIELD NOTES

final result: passed

## Visual truth and evidence

- Source: `C:/Users/97539/.codex/generated_images/01a0c511-1a1f-7280-8012-390ca6321731/exec-6d5a8f2b-106d-4337-abdb-850c71a284e6.png`
- Implementation: `C:/Users/97539/Documents/Codex/2026-09-22/wo/work/qa/desktop-v2.png`
- Full comparison: `C:/Users/97539/Documents/Codex/2026-09-22/wo/work/qa/comparison-v2.png`
- Focused typography comparison: `C:/Users/97539/Documents/Codex/2026-09-22/wo/work/qa/heading-comparison.png`
- Mobile evidence: `C:/Users/97539/Documents/Codex/2026-09-22/wo/work/qa/mobile-v1.jpg` and `mobile-detail.jpg`.
- Desktop viewport and both image sizes: 1487 × 1058. Canvas layout: 1440 × 1024, proportionally scaled to viewport. Reference and rendered capture were composed side by side without density resampling. Browser screenshot data is JPEG despite the desktop file extension; the comparison was saved as PNG. Browser capture compression softens small text, so rendered DOM and focused evidence were also checked.
- State: light palette, map mode, no active filter, default pan/zoom, no dialog.

## Comparison history

1. Desktop v1: [P2] Display title was too narrow. Applied horizontal scaling to preserve its height while matching the source title width. [P2] Photo caption abutted its image; reduced its label title to fit the original gutter.
2. Desktop v2: source and implementation composed into the same comparison image, plus separate paired header crops. The typography proportions, artwork positions and sizes, open whitespace, theme nodes, footer, palette and content hierarchy now match the selected direction. No actionable P0/P1/P2 visual differences remain.
3. Interaction pass: [P2] Dialog closing did not consistently return keyboard focus to its opener under React StrictMode. Store the initial opener and close the native dialog before restoring focus. Re-tested: closing About returns focus to About.

## Required fidelity surfaces

- Typography: bundled Anton, condensed heavyweight blue headline, small sans-serif labels, Chinese fallback fonts. Title proportions corrected; no clipped headings. Exact generated glyphs are approximated by a real distributable font.
- Layout: five artworks use the source's asymmetric positions and varying proportions. Canvas graph connections are live data visualization, not substitute artwork. All navigation and footer controls remain accessible.
- Colors: pale lavender #f0f0ff, ultramarine #0924c7, yellow #f1ff16 and muted gray captions preserve the reference hierarchy.
- Images: five individually generated raster assets match the source subjects and medium. Checked all images complete with positive natural dimensions. Expected variation: exact ceramic silhouette, poster geometry, city figure and particle wave structure differ from the generated concept. These preserve the selected direction and will be replaced with real owner artwork.
- Content: Chinese titles and themes follow the concept. Detail and About views explicitly disclose sample content. No fabricated identity, awards, clients or contact details. Contact shows an honest empty state until an email is supplied.

## Browser verification

- Desktop: image details open; Work / Creative approach switches text; related work opens a new record and resets the tab; About and Contact open and close; Escape closes dialogs.
- Shape filter: two relevant artworks, three dimmed; directory preserves filter and lists two rows; All restores five rows.
- Drag tested using pointer movement; transform changed to translate(58.1036px,38.7357px). Zoom reaches 115%; reset restores the origin and 100%.
- Keyboard: ArrowRight changes pan to -40px; Home resets. Focus returns to the opening control on modal close.
- Mobile 390 × 844: vertical artwork layout, persistent bottom view switch, theme filter, directory and scrollable work detail. Order filter shows two works. All restores five directory rows.
- Mobile 320 × 740: no horizontal document overflow; viewport and scroll width both 320px.
- Browser console: no warning or error entries during tested flows.
- Reduced-motion CSS disables entry and hover transition animation when requested by the OS.

## Remaining scope

- The owner must supply their real name, biography, works and contact information for personalization. Current content is labeled sample content.
- Email launch/copy cannot be tested against a real address because none was provided. There is no form that falsely claims to send messages.
- No public deployment requested or performed in this design-selection flow.
- P3: exact font glyph shapes and very small decorative English text can be tuned after real content is in place. Tablet/browser combinations beyond the tested viewport sizes remain unverified.

## Implementation checklist

- [x] Correct desktop composition.
- [x] Verify primary interactions and keyboard return focus.
- [x] Check phone layout and image loading.
- [x] Inspect combined reference/implementation evidence.
- [x] Preserve source assets and editable content.
