# design-system

[![CI](https://github.com/PatrykPodworski/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/PatrykPodworski/design-system/actions/workflows/ci.yml)

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

   In an empty folder, the CLI creates a new project. Pick the framework with
   `--template`, and pass `--name` and `--no-monorepo` to skip the prompts for the project
   name and the monorepo choice:

   ```bash
   pnpm dlx shadcn@latest init --preset b6Fmg2gT4 --pointer --template vite --name my-app --no-monorepo
   ```

   This repository tests the theme and components with `vite`, `next` and `astro`.

2. Add the theme (colors, radius, Inter font) and the components you need:

   ```bash
   pnpm dlx shadcn@latest add --yes PatrykPodworski/design-system/theme
   pnpm dlx shadcn@latest add --yes PatrykPodworski/design-system/button PatrykPodworski/design-system/dialog
   ```

   `--yes` answers the CLI's "install a new theme?" prompt. Without a terminal (in a
   script or an agent) the CLI answers no, installs nothing and still exits with code 0.

   Components that depend on other components (for example `dialog` on `button`) install
   those too, from this registry.

List every item:

```bash
pnpm dlx shadcn@latest list PatrykPodworski/design-system
```

### Pin a version

Add a release tag to the address to install that version:

```bash
pnpm dlx shadcn@latest add --yes PatrykPodworski/design-system/sidebar#v1.2.0
```

The item and every registry dependency it pulls in (for `sidebar`: `button`, `sheet`,
`use-mobile` and the rest) come from the same tag. Releases are listed under
[tags](https://github.com/PatrykPodworski/design-system/tags).

Only release tags pin dependencies. With a branch or a commit SHA
(`sidebar#<sha>`), the CLI installs the named item at that ref but its dependencies from
`main`. Without a ref, everything comes from `main`.

## Repository layout

```
registry.json             # registry items, generated from packages/ui
scripts/
  generate-registry.mjs   # writes registry.json; --check fails when it is stale
  release.mjs             # tags a release with dependencies pinned to the tag
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

### Cut a release

On `main`, `registry.json` lists dependencies without a ref. A release tag points to a
commit on top of `main` that pins them to the tag; a commit cannot contain its own SHA,
so the tag is the ref.

```bash
pnpm release v1.2.0          # tags origin/main; pass a second argument to tag another commit
git push origin v1.2.0
```

`pnpm release` fetches `origin`, regenerates `registry.json` with `--ref v1.2.0` in a
temporary worktree, commits it and creates the annotated tag locally. It does not touch
your checkout or push anything. The release commit is on no branch; the tag keeps it.

CI runs on every pushed `v*` tag and checks that the tag's `registry.json` pins its
dependencies to that tag (`pnpm registry:check --ref <tag>`), then lints, type-checks and
builds. To undo a release before anyone uses it, delete the tag:
`git push origin :refs/tags/v1.2.0 && git tag -d v1.2.0`.

## Credits

Built on [shadcn/ui](https://ui.shadcn.com) by shadcn, used under the MIT License.

## License

[MIT](LICENSE)
