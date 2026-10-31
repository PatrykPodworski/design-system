# design-system

[![CI](https://github.com/PatrykPodworski/design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/PatrykPodworski/design-system/actions/workflows/ci.yml)

A shared theme and component set for React projects built with Vite, Next.js or Astro.

The theme and components live in `packages/ui`. Three reference apps render the same
component showcase, and a shadcn registry (`registry.json`) lets other projects copy the
theme and components in. `apps/site` is the public site for that registry: every
component, the theme, the design rules and a getting-started page.

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

2. Add the theme (colors, radius, the Inter and Cutive fonts) and the components you
   need:

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

### Fonts

The theme installs two font items:

- `font-inter`: Inter (`@fontsource-variable/inter`) as `--font-sans`, the default for
  all text.
- `font-cutive`: Cutive (`@fontsource/cutive`) as `--font-serif`, for display text
  through the `font-serif` utility. It does not change the default font.

[DESIGN.md](DESIGN.md) says where each font goes.

### Rules and docs

The design rules ship as registry items too, so a project needs no copy or submodule of
this repository:

| Item           | Installs                         | What it is                                                                  |
| -------------- | -------------------------------- | --------------------------------------------------------------------------- |
| `design-doc`   | `DESIGN.md`                      | The rules for building UI with this system ([DESIGN.md](DESIGN.md))         |
| `design-rules` | `.claude/rules/design-system.md` | A Claude Code rule that tells agents to read `DESIGN.md`; adds `design-doc` |
| `starter`      | `theme` + `design-rules`         | Everything except components, in one command                                |

```bash
pnpm dlx shadcn@latest add --yes PatrykPodworski/design-system/starter
```

Claude Code loads every file in `.claude/rules/` at the start of a session, so the
rule needs no line in `CLAUDE.md`. For other agents, add one line to `AGENTS.md`:
"Before any UI work, read `DESIGN.md` and follow it."

The CLI does not replace an existing file that differs: it asks, and without a terminal
it keeps your file and exits with code 0. Pass `--overwrite` to update the files to a new
release.

### Adopt the design system in an existing project

For a Vite or Next.js app with Tailwind 4, such as one that has hand-rolled components:

1. Pick the release tag, for example `v1.2.0`, from
   [tags](https://github.com/PatrykPodworski/design-system/tags). Use it in every
   command below and write it in the project's `CLAUDE.md` or `AGENTS.md`, for example
   "Design system: `PatrykPodworski/design-system`, tag `v1.2.0`".
2. Set up shadcn: `pnpm dlx shadcn@latest init --preset b6Fmg2gT4 --pointer`. It writes
   `components.json`, `lib/utils.ts` and the theme into the main CSS file. Commit, then
   check the CSS diff against your own tokens.
3. Add the theme and the rules:

   ```bash
   pnpm dlx shadcn@latest add --yes PatrykPodworski/design-system/starter#v1.2.0
   ```

4. Remove any older pointer to the design rules from `CLAUDE.md` or `AGENTS.md` (a path
   on someone's machine, a submodule).
5. Add the components the app needs, replacing one hand-rolled component at a time:

   ```bash
   pnpm dlx shadcn@latest add --yes PatrykPodworski/design-system/button#v1.2.0 PatrykPodworski/design-system/dialog#v1.2.0
   ```

6. To upgrade, run the same `add` commands with the new tag and `--overwrite`, review the
   diff, and update the tag in `CLAUDE.md` or `AGENTS.md`.

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
registry.json             # registry items, generated from packages/ui and the docs
DESIGN.md                 # design rules, shipped as the design-doc item
registry/rules/           # agent rules, shipped as the design-rules item
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
  site/                   # public showcase (Astro), deployed as a static site
```

Apps import components as `@workspace/ui/components/<name>` and the theme as
`@workspace/ui/globals.css`. Inside `packages/ui`, files import each other with `#/...`
package imports (`#/components/ui/button`). The shadcn CLI rewrites those to the
consumer's aliases on install, which `@workspace/ui/...` imports would not get.

## Develop

Requirements: Node.js 22.23 or later, pnpm 10.

```bash
pnpm install
pnpm dev          # all four apps
pnpm build        # build all four apps
pnpm lint
pnpm typecheck
```

Run one app:

| App   | Command                       | URL                   |
| ----- | ----------------------------- | --------------------- |
| Vite  | `pnpm --filter vite-app dev`  | http://localhost:5173 |
| Next  | `pnpm --filter next-app dev`  | http://localhost:3000 |
| Astro | `pnpm --filter astro-app dev` | http://localhost:4321 |
| Site  | `pnpm --filter site dev`      | http://localhost:4322 |

Press `d` in any app to toggle dark mode. The site also has a light/dark button.

The install commands on the site use the tag in `apps/site/src/release-tag.ts`.
Update that file when you cut a release, then redeploy.

## Deploy the showcase

`apps/site` builds a static site (`pnpm --filter site build` writes `apps/site/dist`).
`apps/site/wrangler.jsonc` points Cloudflare Workers static assets at that folder.
This repository does not deploy it and does not create a Cloudflare project.

1. Build: `pnpm --filter site build`
2. From `apps/site`, log in on your machine: `pnpm dlx wrangler@latest login`
3. Deploy with one of these. The first run creates the Cloudflare project, so check
   the name before you confirm it.
   - Workers: `pnpm dlx wrangler@latest deploy`
   - Pages: `pnpm dlx wrangler@latest pages deploy dist --project-name design-system-site`

Preview the build locally with `pnpm --filter site preview` at
http://127.0.0.1:4322.

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

`DESIGN.md` and `registry/rules/design-system.md` are edited directly. `registry.json`
only names their paths, so a text change needs no regeneration; the next release ships it.

`pnpm registry:check` fails when `registry.json` does not match `packages/ui` and the
document items.
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
