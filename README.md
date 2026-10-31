# design-system

A shared theme and component set for React projects built with Vite, Next.js or Astro.

The theme and components live in `packages/ui`. Three reference apps render the same
component showcase, and a shadcn registry (`registry.json`) lets other projects copy the
theme and components in.

## Use it in another project

The repository is a [shadcn GitHub registry](https://ui.shadcn.com/docs/registry/github).
Nothing is published to npm: the CLI copies the source files into your project.

1. Set up shadcn in the project with the same preset:

   ```bash
   pnpm dlx shadcn@latest init --preset b6Fmg2gT4 --pointer
   ```

2. Add the theme (colors, radius, Inter font) and the components you need:

   ```bash
   pnpm dlx shadcn@latest add PatrykPodworski/design-system/theme
   pnpm dlx shadcn@latest add PatrykPodworski/design-system/button PatrykPodworski/design-system/dialog
   ```

   Components that depend on other components (for example `dialog` on `button`) install
   those too, from this registry.

List every item:

```bash
pnpm dlx shadcn@latest list PatrykPodworski/design-system
```

Pin a version with `#<tag or commit SHA>`, for example
`PatrykPodworski/design-system/button#<sha>`.

## Repository layout

```
registry.json             # registry items, generated from packages/ui
scripts/
  generate-registry.mjs   # writes registry.json; --check fails when it is stale
packages/
  ui/                     # @workspace/ui: the design system
    src/styles/globals.css    # the one theme, imported by every app
    src/components/ui/        # shadcn components
    src/hooks/, src/lib/
  showcase/               # @workspace/showcase: the component page every app renders
apps/
  vite/                   # React + Vite
  next/                   # Next.js App Router
  astro/                  # Astro + @astrojs/react
```

Apps import components as `@workspace/ui/components/<name>` and the theme as
`@workspace/ui/globals.css`. Inside `packages/ui`, files import each other with `#/...`
package imports (`#/components/ui/button`). The shadcn CLI rewrites those to the
consumer's aliases on install, which `@workspace/ui/...` imports would not get.

## Develop

Requirements: Node.js 22.23 or later, pnpm 10.

```bash
pnpm install
pnpm dev          # all three apps
pnpm build        # build all three apps
pnpm lint
pnpm typecheck
```

Run one app:

| App   | Command                       | URL                   |
| ----- | ----------------------------- | --------------------- |
| Vite  | `pnpm --filter vite-app dev`  | http://localhost:5173 |
| Next  | `pnpm --filter next-app dev`  | http://localhost:3000 |
| Astro | `pnpm --filter astro-app dev` | http://localhost:4321 |

Press `d` in any app to toggle dark mode.

### Add or update a component

Run the CLI from `packages/ui`, then regenerate the registry:

```bash
cd packages/ui
pnpm exec shadcn add <component>
cd ../..
pnpm registry:generate
```

Run it from `packages/ui`, not from an app: the CLI applies the `rsc` setting of the
folder it runs in, and from the Vite or Astro app it strips `"use client"` from the
shared files, which the Next app and Next consumers need.

`pnpm registry:check` fails when `registry.json` does not match `packages/ui`.
`pnpm registry:build` writes the item JSON files to `public/r/` (not committed) for
testing the registry from a local URL.

## Credits

Built on [shadcn/ui](https://ui.shadcn.com) by shadcn, used under the MIT License.

## License

[MIT](LICENSE)
