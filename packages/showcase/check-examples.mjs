import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "../..")
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"))
const uiNames = registry.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => item.name)
  .sort()

const examplesDir = join(root, "packages/showcase/src/examples")
let files = []
try {
  files = readdirSync(examplesDir)
    .filter((name) => name.endsWith(".tsx"))
    .map((name) => name.slice(0, -4))
    .sort()
} catch {
  files = []
}

const uiNameSet = new Set(uiNames)
const fileSet = new Set(files)
const missing = uiNames.filter((name) => !fileSet.has(name))
const extra = files.filter((name) => !uiNameSet.has(name))
const nameMismatches = []

for (const name of files) {
  if (!uiNameSet.has(name)) continue
  const source = readFileSync(join(examplesDir, `${name}.tsx`), "utf8")
  if (!source.includes(`name: "${name}"`)) {
    nameMismatches.push(name)
  }
}

if (missing.length || extra.length || nameMismatches.length) {
  if (missing.length) {
    console.error(`Missing examples (${missing.length}): ${missing.join(", ")}`)
  }
  if (extra.length) {
    console.error(`Examples with no registry:ui item: ${extra.join(", ")}`)
  }
  if (nameMismatches.length) {
    console.error(
      `meta.name does not match the file name: ${nameMismatches.join(", ")}`
    )
  }
  process.exit(1)
}

console.log(`Showcase examples cover ${uiNames.length} components.`)
