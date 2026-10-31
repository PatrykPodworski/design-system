// Tags a release whose registry.json pins every registryDependency to the tag itself.
// Usage: pnpm release <version> [<base>]
//   <version>  tag name, for example v1.2.0
//   <base>     commit to release, origin/main by default
//
// A commit cannot name its own hash, so the tag points to a commit on top of <base> that
// only regenerates registry.json with `--ref <version>`. The commit is not on any branch.
// The work happens in a temporary worktree; the current checkout and its index are untouched.

import { execFileSync } from "node:child_process"
import { mkdirSync } from "node:fs"
import { resolve } from "node:path"

const [version, base = "origin/main"] = process.argv.slice(2)

if (!/^v\d+\.\d+\.\d+(-[\w.]+)?$/.test(version ?? "")) {
  console.error(
    "Usage: pnpm release <version> [<base>], for example: pnpm release v1.2.0"
  )
  process.exit(1)
}

const git = (args, cwd) =>
  execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  }).trim()

git(["fetch", "--quiet", "--tags", "origin"])
if (git(["tag", "--list", version])) {
  console.error(`Tag ${version} already exists.`)
  process.exit(1)
}

mkdirSync("temp", { recursive: true })
const worktree = resolve("temp", `release-${version}`)
git(["worktree", "add", "--quiet", "--detach", worktree, base])
try {
  execFileSync("node", ["scripts/generate-registry.mjs", "--ref", version], {
    cwd: worktree,
    stdio: "inherit",
  })
  git(
    [
      "commit",
      "--quiet",
      "--no-verify",
      "-m",
      `chore(release): ${version}`,
      "--",
      "registry.json",
    ],
    worktree
  )
  git(["tag", "--annotate", version, "-m", version], worktree)
} finally {
  git(["worktree", "remove", "--force", worktree])
}

console.log(
  `Tagged ${version} at ${git(["rev-parse", "--short", `${version}^{commit}`])} (base ${base}).`
)
console.log(`Publish it: git push origin ${version}`)
