export const releaseTag = "v0.3.0"

export function installCommand(item: string) {
  return `pnpm dlx shadcn@latest add PatrykPodworski/design-system/${item}#${releaseTag}`
}
