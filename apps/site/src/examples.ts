import type { ComponentType } from "react"

export type ExampleMeta = {
  name: string
  title: string
  description: string
  variants: readonly string[]
}

export type ExampleModule = {
  meta: ExampleMeta
  Example: ComponentType
}

const modules = import.meta.glob(
  "../../../packages/showcase/src/examples/*.tsx",
  { eager: true }
) as Record<string, ExampleModule>

export function exampleFor(name: string) {
  const entry = Object.entries(modules).find(([path]) =>
    path.endsWith(`/${name}.tsx`)
  )
  return entry?.[1]
}

export const exampleList = Object.values(modules)
  .map((mod) => mod.meta)
  .sort((left, right) => left.name.localeCompare(right.name))
