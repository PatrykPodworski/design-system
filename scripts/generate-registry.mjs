// Generates registry.json from packages/ui so the registry always matches the source.
// Usage: node scripts/generate-registry.mjs [--check] [--ref <ref>]
//   --check      exit 1 when registry.json is out of date instead of writing it.
//   --ref <ref>  pin every registryDependency to <ref> (a release tag). The shadcn CLI
//                resolves a dependency without a ref from the default branch, even when
//                the item that depends on it was installed at a ref.

import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { basename, extname, join } from "node:path"

const REPO = "PatrykPodworski/design-system"
const UI = "packages/ui"
const SRC = `${UI}/src`
const OUTPUT = "registry.json"

const uiPackage = JSON.parse(readFileSync(`${UI}/package.json`, "utf8"))
const versions = { ...uiPackage.dependencies, ...uiPackage.devDependencies }

// Provided by every React project; never listed as item dependencies.
const IMPLICIT_PACKAGES = new Set(["react", "react-dom"])

// lib/utils is written by `shadcn init` in every consumer project.
const SKIPPED_FILES = new Set(["lib/utils.ts"])

// `target` placeholders resolve to the consumer's components.json aliases.
const FOLDERS = [
  { dir: "components/ui", type: "registry:ui", target: "@ui" },
  { dir: "hooks", type: "registry:hook", target: "@hooks" },
  { dir: "lib", type: "registry:lib", target: "@lib" },
]

const refIndex = process.argv.indexOf("--ref")
const ref = refIndex === -1 ? undefined : process.argv[refIndex + 1]
if (refIndex !== -1 && !/^[\w.][\w./-]*$/.test(ref ?? "")) {
  console.error(`Invalid --ref "${ref ?? ""}". Pass a tag such as v1.2.0.`)
  process.exit(1)
}

const address = (name) => `${REPO}/${name}${ref ? `#${ref}` : ""}`

function packageName(specifier) {
  const parts = specifier.split("/")
  return specifier.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0]
}

function readImports(source) {
  const pattern = /(?:from\s+|import\s*\(\s*|import\s+)"([^"]+)"/g
  return [...source.matchAll(pattern)].map((match) => match[1])
}

function buildItem(dir, file, type, target) {
  const path = `${SRC}/${dir}/${file}`
  const name = basename(file, extname(file))
  const dependencies = new Set()
  const registryDependencies = new Set()

  for (const specifier of readImports(readFileSync(path, "utf8"))) {
    // `#/...` imports are rewritten by the shadcn CLI to the consumer's aliases.
    if (specifier.startsWith("#/")) {
      if (specifier !== "#/lib/utils") {
        registryDependencies.add(address(specifier.split("/").pop()))
      }
      continue
    }
    if (specifier.startsWith(".") || specifier.startsWith("@workspace/")) {
      throw new Error(
        `${path}: "${specifier}" is not rewritten on install; import it with "#/..."`
      )
    }
    const pkg = packageName(specifier)
    if (IMPLICIT_PACKAGES.has(pkg)) continue
    const version = versions[pkg]
    if (!version) {
      throw new Error(`${path}: "${pkg}" is missing from ${UI}/package.json`)
    }
    // Pin only exact versions; ranges are left to the consumer's lockfile.
    dependencies.add(/^\d/.test(version) ? `${pkg}@${version}` : pkg)
  }

  return {
    name,
    type,
    ...(dependencies.size && { dependencies: [...dependencies].sort() }),
    ...(registryDependencies.size && {
      registryDependencies: [...registryDependencies].sort(),
    }),
    files: [{ path, type, target: `${target}/${file}` }],
  }
}

// Reads the custom properties declared inside `selector { ... }` in globals.css.
function readBlock(css, selector) {
  const start = css.indexOf(`${selector} {`)
  if (start === -1)
    throw new Error(`globals.css: "${selector}" block not found`)
  const body = css.slice(start, css.indexOf("}", start))
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [
      m[1],
      m[2].trim(),
    ])
  )
}

function buildTheme() {
  const css = readFileSync(`${SRC}/styles/globals.css`, "utf8")
  const themeVars = readBlock(css, "@theme inline")
  // Color mappings come from `shadcn init`, the font variables from the font items.
  const fontVariables = fonts.map(({ font }) => font.variable.slice(2))
  const theme = Object.fromEntries(
    Object.entries(themeVars).filter(
      ([key]) => !key.startsWith("color-") && !fontVariables.includes(key)
    )
  )

  return {
    name: "theme",
    type: "registry:theme",
    title: "Theme",
    description: "Color, radius and font tokens of the design system.",
    registryDependencies: fonts.map(({ name }) => address(name)),
    cssVars: {
      theme,
      light: readBlock(css, ":root"),
      dark: readBlock(css, ".dark"),
    },
    css: {
      "@layer base": {
        'button:not(:disabled), [role="button"]:not(:disabled)': {
          cursor: "pointer",
        },
      },
    },
  }
}

// Every font variable the theme defines comes from one of these items.
const fonts = [
  {
    name: "font-inter",
    type: "registry:font",
    title: "Inter",
    description: "Inter as the sans-serif font.",
    font: {
      family: "'Inter Variable', sans-serif",
      provider: "google",
      import: "Inter",
      variable: "--font-sans",
      subsets: ["latin"],
      dependency: "@fontsource-variable/inter",
    },
  },
  {
    name: "font-cutive",
    type: "registry:font",
    title: "Cutive",
    description: "Cutive as the serif font for display text.",
    font: {
      family: "'Cutive', serif",
      provider: "google",
      import: "Cutive",
      variable: "--font-serif",
      weight: ["400"],
      subsets: ["latin"],
      dependency: "@fontsource/cutive",
      // Without a selector the CLI rewrites the consumer's `html { @apply font-sans }`
      // to the font installed last. An empty selector adds no base rule, so Inter stays
      // the default and Cutive applies only through `font-serif`.
      selector: "",
    },
  },
]

// Documents copied into the consumer's project. `~/` is the consumer's project root.
function buildFile({ name, title, description, path, target, dependsOn = [] }) {
  if (!existsSync(path)) throw new Error(`${name}: "${path}" does not exist`)
  return {
    name,
    type: "registry:file",
    title,
    description,
    ...(dependsOn.length && { registryDependencies: dependsOn.map(address) }),
    files: [{ path, type: "registry:file", target }],
  }
}

const documents = [
  buildFile({
    name: "design-doc",
    title: "Design rules",
    description:
      "DESIGN.md: the rules for building UI with this design system.",
    path: "DESIGN.md",
    target: "~/DESIGN.md",
  }),
  buildFile({
    name: "design-rules",
    title: "Agent rules",
    description:
      "A Claude Code rule (.claude/rules/design-system.md) that points agents to DESIGN.md, which it installs too.",
    path: "registry/rules/design-system.md",
    target: "~/.claude/rules/design-system.md",
    dependsOn: ["design-doc"],
  }),
]

const starter = {
  name: "starter",
  type: "registry:item",
  title: "Starter",
  description:
    "The theme, DESIGN.md and the agent rule in one install. Add components separately.",
  registryDependencies: ["theme", "design-rules"].map(address),
}

const items = [buildTheme(), ...fonts, ...documents, starter]
for (const { dir, type, target } of FOLDERS) {
  const files = readdirSync(join(SRC, dir))
    .filter((file) => /\.tsx?$/.test(file))
    .filter((file) => !SKIPPED_FILES.has(`${dir}/${file}`))
    .sort()
  for (const file of files) items.push(buildItem(dir, file, type, target))
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "design-system",
  homepage: `https://github.com/${REPO}`,
  items,
}

const output = JSON.stringify(registry, null, 2) + "\n"

if (process.argv.includes("--check")) {
  let current = ""
  try {
    current = readFileSync(OUTPUT, "utf8")
  } catch {}
  if (current !== output) {
    console.error(`${OUTPUT} is out of date. Run: pnpm registry:generate`)
    process.exit(1)
  }
  console.log(`${OUTPUT} is up to date (${items.length} items).`)
} else {
  writeFileSync(OUTPUT, output)
  console.log(`Wrote ${OUTPUT} (${items.length} items).`)
}
