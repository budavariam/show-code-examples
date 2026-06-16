# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.6] - Unreleased

### Added
- `selectOnCmdA` option in `initialize()`: when enabled, the modal auto-focuses on open and `Cmd/Ctrl+A` selects only the code content instead of the whole page.
- `opacity` option in `initialize()`: configures modal opacity as a percentage integer (e.g. `99` → `0.99`). Default is `98`, matching the previous hardcoded value.

### Changed
- Modal opacity is now driven by an inline style from the `opacity` option instead of a hardcoded CSS rule, making it overridable without a specificity hack.

## [0.0.5] - 2026-06-16

### Added
- Optional copy-to-clipboard button (`copyButton` option in `initialize()`). Shows Copy → Copying → Copied with a 2.5 s reset. Uses the Clipboard API with an `execCommand` fallback for older browsers.
- `initialize(id, options)` now accepts an options object (second argument).

### Fixed
- Mobile scroll: code `pre` element now scrolls internally within the modal instead of overflowing the viewport, eliminating the left-side text cut-off on narrow screens.
- Close bar bottom text now reads "Tap HERE to close" on touch devices and "Double-click anywhere or click HERE to close" on pointer devices, using `@media (pointer: coarse)`.
- Responsive code font size — changed from a fixed `xx-large` (~32 px) to `clamp(0.875rem, 2vw, 1.5rem)` so code remains readable on small screens.
- Top bar now uses flexbox: URL truncates with an ellipsis on narrow screens and no longer overlaps the Copy button.
- `touch-action: manipulation` on buttons and language boxes removes the 300 ms tap delay on mobile browsers.
- Comfortable minimum tap target (`2.5rem`) on the close bar.
- `overflow: scroll` on `main` changed to `overflow: auto` (removes permanent scrollbars on some platforms).
- Fixed `widtH` CSS typo in `.language-box` to `width`.
- Language boxes now use `width: 100%` and `box-sizing: border-box` so they fill the grid cell correctly on all screen sizes.
- Added horizontal padding on `main` so content does not touch the viewport edges on mobile.
- Demo page (`docs/index.html`) now loads the locally built bundle from `docs/dist/` and has the Copy button enabled.

## [0.0.4] - 2021-05-24

### Added
- Show latest published version on the example page.

### Changed
- GitHub corner logo now rendered as a cutout silhouette.

### Fixed
- Improved mobile layout: grid and overflow handling.
- Style consistency issues.

## [0.0.3] - 2021-05-24

### Added
- Fork-me-on-GitHub corner SVG.
- Close modal with a single click on the bottom bar (in addition to double-click anywhere).
- Modal now always fills the full viewport on mobile.

## [0.0.2] - 2021-03-28

### Added
- Published to npm; CDN usage instructions added to the demo page.
- Theme selector dropdown (all highlight.js themes) on the example page.
- Language auto-detection by file extension.
- Custom container location for the modal (embedded mode).
- Syntax-highlighted code examples (Bash, Java, JavaScript, Go).
- GitHub Pages demo site.
- Smaller initial bundle via code splitting (highlight.js languages loaded lazily).
- Overscroll prevention on the body while the modal is open.

### Changed
- Separated production and development webpack builds.
- Code rewritten as a React component (`ReactDOM.render`).

## [0.0.1] - 2021-03-27

### Added
- Initial implementation with a vanilla JS proof-of-concept.
- Wrapper module exposing `codeExamples.open(event, domNode)` and `codeExamples.initialize(id)`.

[Unreleased]: https://github.com/budavariam/show-code-examples/compare/v0.0.6...HEAD
[0.0.6]: https://github.com/budavariam/show-code-examples/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/budavariam/show-code-examples/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/budavariam/show-code-examples/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/budavariam/show-code-examples/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/budavariam/show-code-examples/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/budavariam/show-code-examples/releases/tag/v0.0.1
