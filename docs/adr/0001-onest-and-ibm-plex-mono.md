# Onest and IBM Plex Mono replace Inter and the system mono

Inter is the most used UI font (about 50 M monthly npm downloads of `@fontsource-variable/inter` in November 2026), and guides for generated UIs name it as a sign of generic AI output. We want the design system to contain no slop patterns (see GLOSSARY.md), so we chose the sans font in a blind knockout of eight free fonts set in our own components. Onest won and beat Inter in the final. We chose the mono font the same way. IBM Plex Mono won and beat the platform's system mono stack in the final. Both are OFL fonts on Fontsource with Polish diacritics.

## Considered options

- **Sans:** Inter, IBM Plex Sans, Atkinson Hyperlegible Next, Schibsted Grotesk, Onest, Source Sans 3, Instrument Sans, Mona Sans. Geist was left out because it is the default of `create-next-app` and the shadcn Next.js template, so it is as generic as Inter.
- **Mono:** the system stack, IBM Plex Mono, Atkinson Hyperlegible Mono, Source Code Pro, Red Hat Mono, Fira Code, Martian Mono, Spline Sans Mono. Geist Mono and Roboto Mono were left out as starter defaults, JetBrains Mono as the mono of the Slopstrap satire framework, Commit Mono for its missing Polish subset, and DM Mono for its missing 600 weight.

## Consequences

- Onest has no italic. For italic text the browser slants the upright letters.
- Onest is slightly smaller and narrower than Inter (x-height 0.527 vs 0.546 of the em), so line breaks in apps can change.
- IBM Plex Mono ships on Fontsource as static weights only. The theme loads 400, 500 and 600.
- Rendering at 12–14px on Windows and Linux was not tested.
