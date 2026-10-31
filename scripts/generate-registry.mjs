// Generates registry.json from packages/ui so the registry always matches the source.
// Usage: node scripts/generate-registry.mjs [--check]
//   --check  exit 1 when registry.json is out of date instead of writing it.

import { readFileSync, readdirSync, writeFileSync } from "node:fs"
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

const address = (name) => `${REPO}/${name}`

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
  // Color mappings and --font-sans come from `shadcn init` and the font item.
  const theme = Object.fromEntries(
    Object.entries(themeVars).filter(
      ([key]) => !key.startsWith("color-") && key !== "font-sans"
    )
  )

  return {
    name: "theme",
    type: "registry:theme",
    title: "Theme",
    description: "Color, radius and font tokens of the design system.",
    registryDependencies: [address("font-inter")],
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

const font = {
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
}

const items = [buildTheme(), font]
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
